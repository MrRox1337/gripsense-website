/* ============================================================================
   SITE CONFIG  —  edit everything user-facing from this one file.
   Names, bio, resource links and contact handles all live here so you never
   have to dig through components.  Replace the "#" placeholders with real URLs.
   ============================================================================ */

export const site = {
  title: "Smart Object-in-Hand Aware Universal Gripper",
  tagline:
    "A universal robotic gripper that knows when an object is in its grasp — designed, built and documented as a Master’s dissertation.",
  courseCode: "PDE4445",
  degree: "MSc Robotics — Master’s Dissertation",
};

export const author = {
  name: "Aman Mishra",
  studentId: "M00983641",
  role: "MSc Robotics Candidate",
  university: "Middlesex University Dubai",
  // Portrait: drop this file into ../Progress/images/ to replace the placeholder.
  photo: "about-aman.jpg",
  bio: [
    "Aman is a full-time university lecturer and laboratory assistant and an MSc Robotics student based in Dubai, bringing a global perspective shaped by eight years of living and studying in countries with varying cultural backgrounds. He is passionate about bridging the gap between theoretical electronics and practical, autonomous robotic systems, both in the lab and in the classroom.",
    "Currently, Aman assists with microelectronics and IoT modules and labs, guiding the next generation of engineers while actively shaping his university’s research ecosystem. He recently spearheaded the redevelopment of his facility, the STARS Lab (Space Telecommunications, Automation, Robotics, and Systems), and frequently facilitates strategic industry-academic partnerships.",
    "Aman’s primary research and technical development focus is on mobile and industrial robotics with spatial awareness. For his Master’s thesis, Aman is developing a smart end effector with object-in-hand verification for democratizing tactile end effectors.",
    "Aman also has a strong interest in digital design optimization, 3D printing, and laser engraving.",
  ],
  focus: ["Mechatronic design", "Embedded sensing", "Robotic manipulation", "Control systems"],
};

export const supervisor = {
  name: "Dr. Judhi Prasetyo",
  role: "Dissertation Supervisor",
  title: "Senior Lecturer · Head & Founder, STARS Lab",
  university: "Middlesex University Dubai",
  // Portrait: drop this file into ../Progress/images/ to replace the placeholder.
  photo: "about-supervisor.jpg",
  bio: [
    "Dr. Judhi Prasetyo, Senior Lecturer, Head & Founder of the STARS Lab at Middlesex University Dubai is a Dubai-based lecturer, researcher and information and communication technology entrepreneur. For the past three decades, Judhi has been providing professional services to various verticals including government entities and law enforcement agencies in more than 15 countries.",
    "He holds Engineering Degree in Electronics and Electrical Engineering from National Institute of Technology of Bandung Indonesia, Master of Science in Engineering Management with major in Supply Chain Management from Middlesex University, and PhD in Computer Science with major in Robotics from Universite de Namur, Belgium.",
    "His special interest is in using technology for socially responsible activities to improve the quality of life. Judhi conducts lectures, workshops and mentoring of computer electronics focusing on IoT and robotics for university students and general public. He also involved in various industry activities.",
  ],
};

/* Project plan (Gantt chart) — drop this file into ../Progress/images/. */
export const projectPlan = {
  image: "project-gantt-chart.jpg",
  caption: "Project Gantt chart — planned schedule of dissertation work packages and milestones.",
};

/* Resource links — swap the "#" for your real URLs when ready. */
export const files = [
  {
    key: "github",
    title: "Project GitHub Repository",
    desc: "Source code, firmware and hardware notes.",
    url: "https://github.com/MrRox1337/GripSense",
    accent: "ink",
  },
  {
    key: "stl",
    title: "STL Files",
    desc: "Printable gripper parts on Printables.",
    url: "https://www.printables.com/model/1802484-dynamixel-parallel-gripper",
    accent: "red",
  },
  {
    key: "onshape",
    title: "Onshape CAD Document",
    desc: "The live, parametric CAD assembly.",
    url: "https://cad.onshape.com/documents/26ae62bdc068d3a1a757a32c/w/bd8636f8197cb10e6369b7c2/e/f4e1c3cdb038002bfac7fccf",
    accent: "blue",
  },
  {
    key: "report",
    title: "Dissertation Report",
    desc: "Written report repository (LaTeX).",
    url: "https://www.overleaf.com/read/fqxmxhshbhdr#3005a3",
    accent: "yellow",
  },
  {
    key: "video",
    title: "Demonstration Video",
    desc: "The gripper in action.",
    url: "#",
    accent: "ink",
  },
];

/* Contact / footer links.  Email is pre-filled — change if needed. */
export const contact = [
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/aman-arun-mishra/" },
  { key: "grabcad", label: "GrabCAD", url: "https://grabcad.com/aman.mishra-27" },
  { key: "printables", label: "Printables", url: "https://www.printables.com/@MrRox1337_1955143" },
  { key: "mdx", label: "Professional Profile", url: "https://www.mdx.ac.ae/staff-detail/aman-mishra" },
  { key: "email", label: "Email", url: "mailto:amanrox97@gmail.com" },
];

/* Top-navigation anchor map. */
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "plan", label: "Plan" },
  { id: "blog", label: "Research Log" },
  { id: "meetings", label: "Meetings" },
  { id: "files", label: "Files" },
  { id: "contact", label: "Contact" },
];
