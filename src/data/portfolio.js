import fallbackAvatar from '../assets/pranavi-avatar.svg';
import aiAssistantDemo from '../assets/projects/ai-assistant-demo.svg';
import automationDemo from '../assets/projects/automation-demo.svg';
import hospitalDemo from '../assets/projects/hospital-demo.svg';
import smartAssistantDemo from '../assets/projects/smart-assistant-demo.svg';
import studentQueryDemo from '../assets/projects/student-query-demo.svg';
import swiftRecoveryDemo from '../assets/projects/swift-recovery-demo.svg';

const resumeFiles = import.meta.glob('../../Pranavi_Resume_.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const profileImage = '/pranavi-profile.jpeg';
export const resumeUrl = Object.values(resumeFiles)[0] || '';
export const resumeFileName = 'Pranavi_Resume_.pdf';

export const contactEmail = 'saipranavi879@gmail.com';

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const roles = [
  'Full Stack Developer',
  'AI Builder',
  'MERN Stack Learner',
  'Automation Enthusiast',
  'Creative Problem Solver',
];

export const skillGroups = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'PHP'],
  },
  {
    title: 'AI & Automation',
    skills: ['Python Automation', 'AI Agents', 'OpenAI APIs', 'Voice Assistants', 'AI Tools'],
  },
  {
    title: 'Tools',
    skills: ['GitHub', 'VS Code', 'Postman', 'Vercel', 'Cursor AI', 'Lovable', 'Bolt AI', 'GitHub Copilot'],
  },
];

export const projects = [
  {
    featured: true,
    category: 'Featured Hero Project',
    status: 'in-development',
    name: 'Smart AI Assistant APK App',
    description:
      'A mobile-based AI assistant application designed to perform productivity and automation tasks using voice and text commands.',
    features: [
      'Voice and text interaction',
      'AI-powered responses',
      'Task reminders',
      'WhatsApp integration',
      'Weather information',
      'Productivity automation',
      'Modern mobile UI',
    ],
    stack: ['AI', 'Mobile UI', 'Automation', 'Voice UX'],
    visual: 'assistant-app',
    accent: 'from-cyan-300 to-blue-500',
    liveUrl: '',
    githubUrl: '',
    screenshot: smartAssistantDemo,
  },
  {
    category: 'AI Automation',
    status: 'in-development',
    name: 'Personal AI Assistant "Tom"',
    description: 'AI-powered assistant with smart conversational features and productivity support.',
    stack: ['AI Tools', 'JavaScript', 'Automation'],
    visual: 'chat-assistant',
    accent: 'from-sky-300 to-cyan-500',
    liveUrl: '',
    githubUrl: '',
    screenshot: aiAssistantDemo,
  },
  {
    category: 'Full Stack',
    status: 'live',
    name: 'Hospital Appointment Booking System',
    description: 'A full-stack web application for efficient patient appointment scheduling and management.',
    stack: ['React', 'PHP', 'REST APIs'],
    visual: 'hospital-dashboard',
    accent: 'from-blue-300 to-cyan-500',
    liveUrl: 'https://hospital-appointment-one-phi.vercel.app/',
    githubUrl: '',
    screenshot: hospitalDemo,
  },
  {
    category: 'Logistics System',
    status: 'live',
    name: 'Swift Recovery - FedEx',
    description: 'A logistics-focused recovery and tracking solution inspired by real-world delivery workflows.',
    stack: ['Web App', 'Tracking', 'Dashboard'],
    visual: 'logistics-map',
    accent: 'from-cyan-200 to-slate-200',
    liveUrl: 'https://fedex-dca-system.vercel.app/',
    githubUrl: '',
    screenshot: swiftRecoveryDemo,
  },
  {
    category: 'Student Platform',
    status: 'in-development',
    name: 'Student Query System',
    description: 'A platform designed to streamline student queries and communication processes.',
    stack: ['Full Stack', 'Forms', 'Admin UI'],
    visual: 'student-query',
    accent: 'from-sky-200 to-blue-400',
    liveUrl: '',
    githubUrl: '',
    screenshot: studentQueryDemo,
  },
  {
    category: 'Python Automation',
    status: 'in-development',
    name: 'Automation Tools using Python',
    description: 'Python-based automation utilities for productivity and workflow optimization.',
    stack: ['Python', 'Scripts', 'Productivity'],
    visual: 'automation-code',
    accent: 'from-cyan-300 to-emerald-300',
    liveUrl: '',
    githubUrl: '',
    screenshot: automationDemo,
  },
];

export const timeline = [
  {
    title: 'Full Stack Development Project Experience',
    detail: 'Building responsive web applications with practical flows, reusable components, and modern UI systems.',
  },
  {
    title: 'Hackathon Participation',
    detail: 'Collaborating under time pressure to ideate, prototype, present, and refine technical solutions.',
  },
  {
    title: 'AI-assisted Development Experience',
    detail: 'Using AI tools, prompt engineering, and automation workflows to accelerate product development.',
  },
  {
    title: 'Team Collaboration Experience',
    detail: 'Working across planning, implementation, feedback, and delivery with clear ownership and communication.',
  },
];
