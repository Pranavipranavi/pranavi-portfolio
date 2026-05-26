import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Code2, Cpu, BrainCircuit, BriefcaseBusiness } from 'lucide-react';

const skillIcons = {
  Frontend: Code2,
  Backend: Cpu,
  'AI & Automation': BrainCircuit,
  Tools: BriefcaseBusiness,
};

export default function ResumeDisplay({ skillGroups, projects, timeline, contactEmail }) {
  const printResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-carbon via-carbon to-black/40">
      {/* Print Button */}
      <div className="sticky top-0 z-40 flex justify-center bg-carbon/95 px-4 py-4 backdrop-blur">
        <button
          onClick={printResume}
          className="rounded-full border border-neon/50 bg-neon px-6 py-3 text-sm font-semibold text-black shadow-glow transition hover:bg-white"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* Resume Content */}
      <div className="print:bg-white mx-auto max-w-4xl px-4 py-8 print:px-0 print:py-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/7 p-8 print:border-0 print:bg-white print:text-black"
        >
          <h1 className="font-display text-5xl font-bold text-white print:text-black">P Sai Pranavi</h1>
          <p className="mt-2 text-xl text-neon print:text-blue-600">AI-powered Full Stack Developer</p>
          <p className="mt-1 text-base text-white/60 print:text-gray-700">3rd-year Computer Science Engineering Student</p>

          {/* Contact Info */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2 text-white/70 print:text-black print:underline hover:text-neon"
            >
              <Mail className="h-4 w-4" />
              {contactEmail}
            </a>
            <a
              href="https://github.com/Pranavipranavi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/70 print:text-black print:underline hover:text-neon"
            >
              <Github className="h-4 w-4" />
              github.com/Pranavipranavi
            </a>
            <a
              href="https://www.linkedin.com/in/saipranavi15"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/70 print:text-black print:underline hover:text-neon"
            >
              <Linkedin className="h-4 w-4" />
              saipranavi15
            </a>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/7 p-8 print:border-0 print:bg-white print:text-black"
        >
          <h2 className="font-display text-2xl font-bold text-neon print:text-blue-600">Professional Summary</h2>
          <p className="mt-4 leading-7 text-white/70 print:text-gray-800">
            Passionate Computer Science Engineering student with expertise in Full Stack Development, AI-powered applications, 
            and automation workflows. Skilled in building responsive web applications using modern technologies (React, Next.js, 
            Node.js), AI tools, and automation solutions. Driven by curiosity to create intelligent digital products that solve 
            real-world problems with practical and innovative approaches.
          </p>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/7 p-8 print:border-0 print:bg-white print:text-black"
        >
          <h2 className="font-display text-2xl font-bold text-neon print:text-blue-600">Technical Skills</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-semibold text-white print:text-black">{group.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 print:border-gray-300 print:bg-gray-100 print:text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/7 p-8 print:border-0 print:bg-white print:text-black"
        >
          <h2 className="font-display text-2xl font-bold text-neon print:text-blue-600">Featured Projects</h2>
          <div className="mt-6 space-y-6">
            {projects.slice(0, 3).map((project) => (
              <div key={project.name} className="border-b border-white/10 pb-6 last:border-0 print:border-gray-300">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white print:text-black">{project.name}</h3>
                    <p className="mt-1 text-sm text-white/60 print:text-gray-700">{project.description}</p>
                  </div>
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                      project.status === 'live'
                        ? 'border-neon/30 bg-neon/10 text-neon print:bg-green-100 print:text-green-800'
                        : 'border-white/10 bg-white/5 text-white/60 print:bg-gray-100 print:text-gray-800'
                    }`}
                  >
                    {project.status === 'live' ? 'Live' : project.status === 'in-development' ? 'In Development' : 'Coming Soon'}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60 print:border-gray-300 print:bg-gray-100 print:text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.features && project.features.length > 0 && (
                  <ul className="mt-3 space-y-1 pl-4 text-sm text-white/60 print:text-gray-700">
                    {project.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="list-disc">
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/7 p-8 print:border-0 print:bg-white print:text-black"
        >
          <h2 className="font-display text-2xl font-bold text-neon print:text-blue-600">Experience & Learning</h2>
          <div className="mt-6 space-y-5">
            {timeline.map((item, index) => (
              <div key={item.title} className="border-l-2 border-neon pl-4 print:border-blue-600">
                <p className="text-xs font-bold uppercase text-neon print:text-blue-600">0{index + 1}</p>
                <h3 className="mt-2 font-semibold text-white print:text-black">{item.title}</h3>
                <p className="mt-2 leading-6 text-white/60 print:text-gray-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/7 p-8 print:border-0 print:bg-white print:text-black"
        >
          <h2 className="font-display text-2xl font-bold text-neon print:text-blue-600">Education</h2>
          <div className="mt-6">
            <div className="border-l-2 border-neon pl-4 print:border-blue-600">
              <h3 className="font-semibold text-white print:text-black">Bachelor of Technology in Computer Science Engineering</h3>
              <p className="mt-2 text-sm text-white/60 print:text-gray-700">3rd Year Student | Current Focus: Full Stack Development & AI</p>
              <p className="mt-1 text-sm text-white/60 print:text-gray-700">Core Competencies: Web Development, Data Structures, Algorithms, Database Management, AI/ML Fundamentals</p>
            </div>
          </div>
        </motion.section>

        {/* Key Strengths */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/7 p-8 print:border-0 print:bg-white print:text-black"
        >
          <h2 className="font-display text-2xl font-bold text-neon print:text-blue-600">Key Strengths</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              'Full Stack Development (MERN)',
              'AI & Automation Tools',
              'Responsive Web Design',
              'Problem-Solving & Debugging',
              'AI-assisted Development',
              'Team Collaboration',
              'Quick Learning & Adaptation',
              'Building Production-Ready Systems',
            ].map((strength) => (
              <li key={strength} className="flex items-start gap-3 text-white/70 print:text-gray-800">
                <span className="mt-1 h-2 w-2 rounded-full bg-neon print:bg-blue-600 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center text-sm text-white/40 print:text-gray-500"
        >
          <p>Resume last updated: May 2026</p>
          <p className="mt-1">For the latest project updates, visit: saipranavi-portfolio.vercel.app</p>
        </motion.div>
      </div>

      <style>{`
        @media print {
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .print\\:bg-white {
            background: white !important;
          }
          .print\\:text-black {
            color: black !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
          .print\\:px-0 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .sticky {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
