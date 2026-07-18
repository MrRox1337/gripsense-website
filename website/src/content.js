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

function parseBlocks(text) {
  const blocks = []
  const rawBlocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)

  for (const b of rawBlocks) {
    const lines = b
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    const isBullet = (l) => /^[-*•]\s+/.test(l)
    const bullets = lines.filter(isBullet)

    if (bullets.length && bullets.length === lines.length) {
      blocks.push({ kind: 'list', items: bullets.map((l) => l.replace(/^[-*•]\s+/, '')) })
    } else if (bullets.length) {
      // Mixed block: a lead-in line followed by bullets (e.g. "Key topics:\n- …")
      const lead = lines.filter((l) => !isBullet(l)).join(' ')
      if (lead) blocks.push({ kind: 'para', text: lead })
      blocks.push({ kind: 'list', items: bullets.map((l) => l.replace(/^[-*•]\s+/, '')) })
    } else {
      // Ordinary paragraph — re-flow the hard-wrapped source lines.
      blocks.push({ kind: 'para', text: lines.join(' ') })
    }
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

  return {
    id,
    type,
    number,
    label,
    title,
    tags,
    isDraft,
    blocks,
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
  totalWeeks: 12, // dissertation runs to Week 12
}
