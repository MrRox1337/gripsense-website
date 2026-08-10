/* ============================================================================
   CONTENT ENGINE
   Reads every .txt file in ../Progress and turns the raw text into structured,
   render-ready blog posts (weeks) and meeting log entries.

   HOW TO ADD MORE CONTENT (weeks 4–12, more meetings):
     • Drop  Week_4.txt … Week_12.txt  (or Meeting_3.txt …) into  ../Progress/
     • Drop matching images into  ../Progress/images/
     • Re-run the dev server / rebuild.  New cards, articles, figures and
       timeline entries appear automatically — no code edits required.

   Curated metadata below (titles, tags, figure captions) is OPTIONAL polish.
   Any file without an entry here still renders with a sensible auto-generated
   title, tags and one figure placeholder.
   ============================================================================ */

// Raw text of every progress file, inlined at build time.
const txtModules = import.meta.glob('../../Progress/*.txt', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Every image the student has dropped into ../Progress/images (may be empty).
const imageModules = import.meta.glob(
  '../../Progress/images/*.{png,jpg,jpeg,webp,gif,svg,avif}',
  { query: '?url', import: 'default', eager: true },
)

// basename("../../Progress/Week_1.txt") -> "Week_1.txt"
const basename = (p) => p.split('/').pop()

// Map of lowercased image filename -> resolved URL, for figure resolution.
const imageMap = {}
for (const [path, url] of Object.entries(imageModules)) {
  imageMap[basename(path).toLowerCase()] = url
}

/** Resolve a suggested figure filename to a real URL, or null if not present. */
export function resolveImage(filename) {
  if (!filename) return null
  return imageMap[filename.toLowerCase()] || null
}

/* ---------------------------------------------------------------------------
   Curated polish — human titles, tags and figure placeholders per entry.
   Keys are the generated post id: "week-1", "meeting-2", …
   --------------------------------------------------------------------------- */
const CURATED = {
  'week-1': {
    title: 'Surveying the Gripper Landscape',
    tags: ['Literature', 'End-effectors', 'Selection'],
    figures: [
      {
        after: 1,
        file: 'week-1-grippers.jpg',
        caption:
          'Vacuum and capillary-force grippers meeting the irregular topology of microelectronic modules.',
      },
      {
        after: 4,
        file: 'week-1-taxonomy.jpg',
        caption:
          'Taxonomy of electric end-effectors — narrowing the field to parallel and wide grippers.',
      },
    ],
  },
  'week-2': {
    title: 'Choosing Actuators That Can Feel',
    tags: ['Actuators', 'Sensors', 'TMC2209'],
    figures: [
      {
        after: 1,
        file: 'week-2-servos.jpg',
        caption:
          'Hobby servo actuators (MG996R, MG90S, SG90) driven over PWM — limited native feedback.',
      },
      {
        after: 4,
        file: 'week-2-pd-stepper.jpg',
        caption:
          'SparkFun PD Stepper (ROB-30118): a TMC2209 driver paired with a magnetic encoder for reliable in-hand sensing.',
      },
    ],
  },
  'week-3': {
    title: 'A Design Brief Takes Shape',
    tags: ['Design Brief', 'Requirements'],
    figures: [
      {
        after: 1,
        file: 'week-3-brief.jpg',
        caption:
          'The emerging brief — a light, fast-acting gripper with genuine object-in-hand sensitivity.',
      },
    ],
  },
  'meeting-1': {
    title: 'Framing the Problem',
    tags: ['Scope', 'PCB handling', 'Real-world deployment'],
  },
  'meeting-2': {
    title: 'From Driver to Design',
    tags: ['PD Stepper', 'NEMA17', 'Backdrivability'],
  },
  'week-4': {
    title: 'Modelling the Wide Servo Gripper',
    tags: ['Onshape CAD', 'Dynamixel', 'Interference analysis'],
    figures: [
      {
        after: 1,
        file: 'week-4-dynamixel-onshape.jpg',
        caption:
          'Dynamixel XM430-W210-T STEP model imported into Onshape, with mates redefined to extract reference dimensions.',
      },
      {
        after: 2,
        file: 'week-4-wide-gripper.jpg',
        caption:
          'The wide servo gripper assembly — interference analysis exposes a maximum grip width of only ~30 mm.',
      },
    ],
  },
  'week-5': {
    title: 'Pivoting to the Parallel Gripper',
    tags: ['Parallel gripper', 'Rack & pinion', '3D printing'],
    figures: [
      {
        after: 3,
        file: 'week-5-parallel-gripper.jpg',
        caption:
          'Parallel gripper built on a rack-and-pinion with custom anti-derail rails and ribbed fingers — backdrivability retained for in-hand sensing.',
      },
      {
        after: 4,
        file: 'week-5-first-print.jpg',
        caption: 'The first iteration of the parallel gripper going onto the 3D printer.',
      },
    ],
  },
  'meeting-3': {
    title: 'Settling on Smart Servos',
    tags: ['Dynamixel XM430', 'U2D2', 'Actuation'],
  },
  'meeting-4': {
    title: 'The Moving Tool-Centre-Point',
    tags: ['Variable TCP', 'Grip width', 'Kinematics'],
  },
  'meeting-5': {
    title: 'Finding the Thesis Focus',
    tags: ['Design trade-offs', 'Documentation', 'Lit review'],
  },
  'meeting-6': {
    title: 'Measuring the Grip',
    tags: ['Enclosure design', 'Grip evaluation', 'Sensor selection'],
  },
  'week-6': {
    title: 'A Kitchen Scale for Grip Strength',
    tags: ['Enclosure v2', 'Strain gauge', 'Dynamixel Wizard'],
    figures: [
      {
        after: 1,
        file: 'week-6-enclosure-v2.jpg',
        caption:
          'Version 2 of the rack-and-pinion enclosure, modelled around the XM430-W210-T actuator.',
      },
      {
        after: 3,
        file: 'week-6-strain-gauge.jpg',
        caption:
          'A kitchen weight scale — a ready-made strain gauge — repurposed as the grip-strength evaluation rig.',
      },
    ],
  },
  'week-7': {
    title: 'Testing GripSense to Failure',
    tags: ['U2D2 testing', 'Grip strength', 'Filament trials'],
    figures: [
      {
        after: 2,
        file: 'week-7-grip-test.jpg',
        caption:
          'Current-limited grip-strength testing on the scale — up to ~1.5 kg before a PETG finger snapped.',
      },
      {
        after: 4,
        file: 'week-7-material-fingers.jpg',
        caption: 'Fingers printed in PETG, PLA, ABS and TPU for a material-robustness comparison.',
      },
    ],
  },
  'week-8': {
    title: 'Mounting GripSense to the VT6',
    tags: ['Enclosure v3', 'Epson VT6', 'EoAT mounting'],
    figures: [
      {
        after: 2,
        file: 'week-8-vt6-mounted.jpg',
        caption:
          'The third and final enclosure, printed in PLA and mounted on the Epson VT6-A901S — ready for data collection.',
      },
    ],
  },
  'meeting-7': {
    title: 'A Metric Under Scrutiny',
    tags: ['Evaluation metric', 'Custom script', 'End-of-arm tooling'],
  },
  'meeting-8': {
    title: 'Stop Designing, Start Collecting',
    tags: ['Data collection', 'Reliability', 'Focus'],
  },
  'week-9': {
    title: 'Automating the Grip-and-Slip Benchmark',
    tags: ['Dynamixel SDK', 'Benchmark GUI', 'Slip detection', 'Calibration'],
    figures: [
      {
        after: 5,
        file: 'week-9-control-gui.jpg',
        caption:
          'The manual control GUI — position, goal-current and profile-velocity sliders that prime the gripper to maximum open before the first torque command.',
      },
      {
        after: 10,
        file: 'week-9-benchmark-gui.jpg',
        caption:
          'The benchmark GUI presents the trials as a 4×4 grid that locks out completed material×padding combinations and reports overall progress.',
      },
      {
        after: 22,
        file: 'week-9-architecture.jpg',
        caption:
          'The software architecture, documented with Mermaid diagrams: control flow, data flow, the run-time threading model, the calibration sequence and the slip-decision rule.',
      },
    ],
  },
  'meeting-9': {
    title: 'Force Closure Before Padding',
    tags: ['Preliminary results', 'Force closure', 'Material ranking'],
  },
}

/* ---------------------------------------------------------------------------
   Inline formatting — escapes HTML and prettifies BibTeX-style citation keys
   (e.g. "WadaKentaro2017Pvhr" -> "Wada Kentaro (2017)") into subtle <cite> chips.
   Safe by design: the regexes only match distinctive citation-key shapes, so
   ordinary prose and hardware part numbers (ESP32, TMC2209, MG996R) are left
   untouched.
   --------------------------------------------------------------------------- */
function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function formatInline(text) {
  let s = escapeHtml(text)

  // Author-year keys: WadaKentaro2017Pvhr, ItoTakatoshi2022Vfcc
  s = s.replace(
    /\b((?:[A-Z][a-z]+){2,})(\d{4})[A-Za-z]*\b/g,
    (_all, name, year) => {
      const pretty = name.replace(/([a-z])([A-Z])/g, '$1 $2')
      return `<cite class="cite">${pretty} <span class="cite-year">(${year})</span></cite>`
    },
  )

  // Misc / anonymous keys: _2020_types, _2025_6
  s = s.replace(
    /\b_(\d{4})_([A-Za-z0-9]+)\b/g,
    (_all, year, tag) =>
      `<cite class="cite">ref. <span class="cite-year">${year}</span> · ${tag}</cite>`,
  )

  return s
}

/* ---------------------------------------------------------------------------
   Core parser: raw text -> structured blocks.
   --------------------------------------------------------------------------- */
const pad2 = (n) => String(n).padStart(2, '0')

/* ---------------------------------------------------------------------------
   Dates — derived from the schedule, not hand-entered.
   Week 1 begins Monday 8 June 2026; every week is a Mon–Sun span and every
   supervision meeting happens on that week's Thursday. Change WEEK1_MONDAY
   below if the timetable ever shifts, and all dates recompute.
   --------------------------------------------------------------------------- */
const WEEK1_MONDAY = Date.UTC(2026, 5, 8) // months are 0-indexed: 5 = June
const DAY_MS = 24 * 60 * 60 * 1000
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const isoOf = (d) => d.toISOString().slice(0, 10)

// Monday (start) of week N.
function weekStart(n) {
  return new Date(WEEK1_MONDAY + (n - 1) * 7 * DAY_MS)
}

// A week's Mon–Sun span, e.g. "8–14 Jun 2026" or "29 Jun – 5 Jul 2026".
function weekSpanLabel(n) {
  const start = weekStart(n)
  const end = new Date(start.getTime() + 6 * DAY_MS)
  const y = end.getUTCFullYear()
  if (start.getUTCMonth() === end.getUTCMonth()) {
    return `${start.getUTCDate()}–${end.getUTCDate()} ${MONTHS[start.getUTCMonth()]} ${y}`
  }
  return (
    `${start.getUTCDate()} ${MONTHS[start.getUTCMonth()]} – ` +
    `${end.getUTCDate()} ${MONTHS[end.getUTCMonth()]} ${y}`
  )
}

// The Thursday of week N (meeting day), e.g. "Thu 11 Jun 2026".
function meetingDay(n) {
  return new Date(weekStart(n).getTime() + 3 * DAY_MS)
}
function meetingDayLabel(n) {
  const d = meetingDay(n)
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function parseBlocks(text) {
  const blocks = []
  const rawBlocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)

  const isBullet = (l) => /^[-*•]\s+/.test(l)
  const stripBullet = (l) => l.replace(/^[-*•]\s+/, '')

  for (const b of rawBlocks) {
    const lines = b
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)

    const firstBullet = lines.findIndex(isBullet)

    // No bullets at all -> a single re-flowed paragraph.
    if (firstBullet === -1) {
      blocks.push({ kind: 'para', text: lines.join(' ') })
      continue
    }

    // Any lines before the first bullet form a lead-in paragraph
    // (e.g. "Key topics:" ahead of the list).
    const lead = lines.slice(0, firstBullet).join(' ').trim()
    if (lead) blocks.push({ kind: 'para', text: lead })

    // Build list items, folding hard-wrapped continuation lines into the
    // preceding bullet so multi-line bullets stay intact.
    const items = []
    for (const line of lines.slice(firstBullet)) {
      if (isBullet(line)) {
        items.push(stripBullet(line))
      } else if (items.length) {
        items[items.length - 1] += ' ' + line
      }
    }
    blocks.push({ kind: 'list', items })
  }
  return blocks
}

/** Weave figure placeholders into a week's paragraph blocks. */
function injectFigures(blocks, id, title) {
  const curated = CURATED[id]
  let figures = curated?.figures

  // Auto-figure for uncurated weeks: one placeholder after the first paragraph.
  if (!figures) {
    const paraCount = blocks.filter((b) => b.kind === 'para').length
    figures =
      paraCount >= 2
        ? [{ after: 1, file: `${id}-fig-1.jpg`, caption: `Figure — ${title}` }]
        : []
  }

  const out = []
  let paraSeen = 0
  const remaining = [...figures]

  for (const block of blocks) {
    out.push(block)
    if (block.kind === 'para') {
      paraSeen += 1
      while (remaining.length && remaining[0].after === paraSeen) {
        const f = remaining.shift()
        out.push({ kind: 'figure', file: f.file, caption: f.caption })
      }
    }
  }
  // Any figures targeting a paragraph beyond the end still get appended.
  for (const f of remaining) out.push({ kind: 'figure', file: f.file, caption: f.caption })
  return out
}

function excerptFrom(blocks) {
  const firstPara = blocks.find((b) => b.kind === 'para')
  if (!firstPara) return ''
  const t = firstPara.text
  if (t.length <= 170) return t
  return t.slice(0, 170).replace(/\s+\S*$/, '') + '…'
}

function readingTime(blocks) {
  const words = blocks
    .filter((b) => b.kind === 'para')
    .reduce((n, b) => n + b.text.split(/\s+/).length, 0)
  return Math.max(1, Math.round(words / 200))
}

function parseFile(path, raw) {
  const filename = basename(path)
  const m = filename.match(/^(week|meeting)[_\s-]*(\d+)/i)
  if (!m) return null

  const type = m[1].toLowerCase() // 'week' | 'meeting'
  const number = parseInt(m[2], 10)
  const id = `${type}-${number}`

  const normalized = raw.replace(/\r\n?/g, '\n')
  const isDraft = /\/\/\s*todo/i.test(normalized)
  // Strip author TODO markers from the rendered content.
  const cleaned = normalized
    .split('\n')
    .filter((l) => !/^\s*\/\/\s*todo/i.test(l))
    .join('\n')

  let blocks = parseBlocks(cleaned)
  const curated = CURATED[id] || {}
  const label = type === 'week' ? `Week ${pad2(number)}` : `Meeting ${pad2(number)}`
  const title = curated.title || label
  const tags = curated.tags || (type === 'week' ? ['Progress'] : ['Supervision'])

  if (type === 'week') blocks = injectFigures(blocks, id, title)

  // Human-readable date + machine-readable ISO for the <time> element.
  const dateLabel = type === 'week' ? weekSpanLabel(number) : meetingDayLabel(number)
  const dateISO = type === 'week' ? isoOf(weekStart(number)) : isoOf(meetingDay(number))

  return {
    id,
    type,
    number,
    label,
    title,
    tags,
    isDraft,
    blocks,
    dateLabel,
    dateISO,
    excerpt: excerptFrom(blocks),
    readingTime: readingTime(blocks),
  }
}

/* ---------------------------------------------------------------------------
   Build & export the collections.
   --------------------------------------------------------------------------- */
const allPosts = Object.entries(txtModules)
  .map(([path, raw]) => parseFile(path, raw))
  .filter(Boolean)

export const weekPosts = allPosts
  .filter((p) => p.type === 'week')
  .sort((a, b) => a.number - b.number)

export const meetings = allPosts
  .filter((p) => p.type === 'meeting')
  .sort((a, b) => a.number - b.number)

export const stats = {
  weeks: weekPosts.length,
  meetings: meetings.length,
  // Planned length is 12 weeks; grows automatically if the log ever runs longer.
  totalWeeks: Math.max(12, weekPosts.length),
}
