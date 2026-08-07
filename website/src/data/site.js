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
  name: "Aman",
  studentId: "M00983641",
  role: "MSc Robotics Candidate",
  university: "Middlesex University Dubai",
  // Placeholder bio — rewrite freely.
  bio: [
    "I am a robotics postgraduate at Middlesex University Dubai working at the intersection of mechatronic design, embedded sensing and control. My dissertation extends the Picker-Bot — a pick-and-place robot that so far has only lived in simulation — toward reliable real-world deployment.",
    "The core of this work is a “smart”, object-in-hand aware universal gripper: an end-effector that can tell, from its own actuation and sensing, whether it is actually holding a component. My focus is on manipulating delicate microelectronic modules — PCBs, microcontrollers, sensors and actuators — without damaging them.",
  ],
  focus: ["Mechatronic design", "Embedded sensing", "Robotic manipulation", "Control systems"],
};

export const supervisor = {
  name: "Dr. Judhi Prasetyo",
  role: "Dissertation Supervisor",
  university: "Middlesex University Dubai",
  note: "Guiding the project on design direction, actuator selection and grip-feedback strategy through weekly supervision meetings.",
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
  { id: "blog", label: "Research Log" },
  { id: "meetings", label: "Meetings" },
  { id: "files", label: "Files" },
  { id: "contact", label: "Contact" },
];
