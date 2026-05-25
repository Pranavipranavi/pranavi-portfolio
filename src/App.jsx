import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDownToLine,
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
  Zap,
} from 'lucide-react';
import {
  contactEmail,
  navItems,
  profileImage,
  projects,
  resumeFileName,
  resumeUrl,
  roles,
  skillGroups,
  timeline,
} from './data/portfolio';

const skillIcons = {
  Frontend: Code2,
  Backend: Cpu,
  'AI & Automation': BrainCircuit,
  Tools: BriefcaseBusiness,
};

function useTyping(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const doneTyping = displayed === current;
    const doneDeleting = displayed === '';
    const delay = doneTyping ? 1300 : deleting ? 36 : 68;

    const timeout = window.setTimeout(() => {
      if (!deleting && doneTyping) {
        setDeleting(true);
        return;
      }

      if (deleting && doneDeleting) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }

      setDisplayed((value) =>
        deleting ? current.slice(0, Math.max(0, value.length - 1)) : current.slice(0, value.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, displayed, wordIndex, words]);

  return displayed;
}

function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return active;
}

function MagneticButton({
  children,
  className = '',
  href,
  variant = 'primary',
  icon: Icon,
  download,
  disabled = false,
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16 });
  const springY = useSpring(y, { stiffness: 220, damping: 16 });
  const Component = href ? motion.a : motion.button;
  const variantClass =
    variant === 'secondary'
      ? 'border-white/14 bg-white/7 text-white hover:border-sky/50'
      : 'border-neon/50 bg-neon text-black shadow-glow hover:bg-white';

  const onMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * 0.24);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.24);
  };

  return (
    <Component
      ref={ref}
      href={href}
      download={download}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${className}`}
    >
      <span className="absolute inset-0 translate-y-full bg-white/30 blur-xl transition duration-500 group-hover:translate-y-0" />
      {Icon ? <Icon className="relative h-4 w-4" aria-hidden="true" /> : null}
      <span className="relative">{children}</span>
    </Component>
  );
}

function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {title ? (
          <Reveal className="mx-auto mb-14 max-w-4xl text-center">
            <p className="mb-4 text-xs font-bold uppercase text-neon">{eyebrow}</p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h2>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-carbon"
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          className="absolute h-40 w-40 rounded-full border border-neon/30"
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ rotate: { duration: 5, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
        />
        <motion.div
          className="grid h-24 w-24 place-items-center rounded-3xl border border-white/10 bg-white/8 shadow-glow backdrop-blur-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-9 w-9 text-neon" aria-hidden="true" />
        </motion.div>
        <div className="text-center">
          <p className="font-display text-lg font-semibold text-white">P Sai Pranavi</p>
          <p className="mt-1 text-sm text-white/55">Initializing intelligent portfolio</p>
        </div>
      </div>
    </motion.div>
  );
}

function AmbientBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${(index * 29) % 100}%`,
        top: `${(index * 47) % 100}%`,
        size: 2 + (index % 4),
        delay: (index % 9) * 0.35,
        duration: 7 + (index % 6),
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-carbon" />
      <motion.div
        className="absolute -left-44 top-10 h-[34rem] w-[34rem] rounded-full bg-neon/18 blur-[110px]"
        animate={{ x: [0, 80, 30, 0], y: [0, 40, 110, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-36 top-1/3 h-[31rem] w-[31rem] rounded-full bg-sky/14 blur-[105px]"
        animate={{ x: [0, -70, -20, 0], y: [0, 90, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 futuristic-grid opacity-55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.72)_70%)]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-neon shadow-[0_0_18px_rgba(0,217,255,0.8)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [-18, 24, -18], opacity: [0.18, 0.85, 0.18] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 120, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 210);
      y.set(event.clientY - 210);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return <motion.div className="cursor-glow" style={{ x: smoothX, y: smoothY }} aria-hidden="true" />;
}

function Navbar({ active, theme, setTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/45 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <a href="#home" className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-neon">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-neon/40 bg-neon/10 font-display text-sm font-bold text-neon shadow-glow">
            PS
          </span>
          <span className="hidden font-display text-xs font-bold uppercase text-white sm:block">P Sai Pranavi</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active === item.id ? 'bg-white text-black' : 'text-white/65 hover:bg-white/8 hover:text-white'
              }`}
            >
              {item.label.toLowerCase()}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/7 text-white transition hover:border-neon/50 hover:text-neon"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/7 text-white lg:hidden"
            aria-label="Open navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl border border-white/10 bg-black/70 p-3 backdrop-blur-2xl lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  active === item.id ? 'bg-white text-black' : 'text-white/70 hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const typed = useTyping(roles);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.28], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.28]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-neon/12 blur-[100px]" />
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-sm font-semibold text-sky-100 shadow-glow"
          >
            <Zap className="h-4 w-4 text-neon" aria-hidden="true" />
            3rd-year CSE Student | AI-powered Full Stack Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            P Sai <span className="text-neon">Pranavi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18 }}
            className="mt-6 max-w-2xl text-xl leading-8 text-white/72 sm:text-2xl"
          >
            Turning Ideas Into Intelligent Digital Products
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.26 }}
            className="mt-7 flex min-h-10 items-center gap-3 font-display text-lg font-semibold text-white/78 sm:text-2xl"
            aria-label={`Current role: ${typed}`}
          >
            <span>I build as</span>
            <span className="text-neon">{typed}</span>
            <span className="h-7 w-px animate-pulse bg-neon" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton href="#projects" icon={ArrowRight}>
              View Projects
            </MagneticButton>
            <MagneticButton href={resumeUrl || '#resume'} variant="secondary" icon={ArrowDownToLine} download={resumeUrl ? resumeFileName : undefined}>
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary" icon={Mail}>
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 14 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hero-visual relative mx-auto w-full max-w-[25rem] sm:max-w-[29rem]"
        >
          <motion.div
            className="absolute -inset-8 rounded-[3rem] bg-neon/10 blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.72, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 overflow-hidden rounded-[2rem] border border-white/12 bg-white/7 p-3 shadow-glow-strong backdrop-blur-xl"
          >
            <img
              src={profileImage}
              alt="P Sai Pranavi profile"
              className="aspect-[4/5] w-full rounded-[1.55rem] bg-white/5 object-cover object-center"
            />
            <div className="absolute inset-x-8 bottom-8 rounded-3xl border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase text-neon">AI Builder</p>
              <p className="mt-1 font-display text-xl font-semibold text-white">Next-gen Web Systems</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="Practical engineering with a future-facing edge.">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="text-lg leading-9 text-white/72">
          P Sai Pranavi is a Computer Science Engineering student passionate about Full Stack Development,
          AI-powered applications, automation tools, and futuristic digital experiences. She enjoys building
          practical real-world applications using modern technologies and AI-assisted development tools.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          ['Focus', 'AI-powered apps, full stack systems, and automation workflows.'],
          ['Mindset', 'Build fast, learn deeply, and turn rough ideas into working products.'],
          ['Direction', 'Creating premium digital experiences that feel intelligent and useful.'],
        ].map(([label, detail], index) => (
          <Reveal key={label} delay={index * 0.06}>
            <motion.article whileHover={{ y: -8 }} className="glass-panel min-h-48 p-7 sm:p-8">
              <p className="text-xs font-bold uppercase text-neon">{label}</p>
              <p className="mt-6 text-lg font-semibold leading-8 text-white/78">{detail}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="A modern stack for intelligent products.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, index) => {
          const Icon = skillIcons[group.title] || Sparkles;
          return (
            <Reveal key={group.title} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="tilt-card glass-panel h-full p-6"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-neon/25 bg-neon/10 text-neon">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_18px_#00D9FF]" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/7 px-3 py-2 text-xs text-white/72">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function ProjectPreview({ project }) {
  if (project.screenshot) {
    return (
      <motion.div
        className="project-visual relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/45 p-3 shadow-2xl"
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <img
          src={project.screenshot}
          alt={`${project.name} preview`}
          className="relative aspect-[16/9] w-full rounded-[1.35rem] border border-white/12 object-cover shadow-2xl"
        />
      </motion.div>
    );
  }

  return null;
}

function Projects() {
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" eyebrow="Projects" title="Cinematic builds with real-world intent.">
      <Reveal>
        <motion.article
          whileHover={{ y: -8 }}
          className="glass-panel grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <ProjectPreview project={featured} />
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-neon/30 bg-neon/10 px-3 py-2 text-xs font-bold uppercase text-neon">
                {featured.category || 'Featured Hero Project'}
              </span>
              <span className="rounded-full border border-white/12 bg-white/7 px-3 py-2 text-xs font-bold uppercase text-white/65">
                {featured.status === 'live' ? 'Live' : featured.status === 'in-development' ? 'In Development' : 'Coming Soon'}
              </span>
            </div>
            <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">{featured.name}</h3>
            <p className="mt-4 text-base leading-7 text-white/68">{featured.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {featured.stack.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-xs text-white/65">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {featured.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-white/68">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_12px_#00D9FF]" />
                  {feature}
                </div>
              ))}
            </div>
            <ProjectActions project={featured} />
          </div>
        </motion.article>
      </Reveal>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.05}>
            <motion.article whileHover={{ y: -10, rotateX: 3 }} className="tilt-card glass-panel h-full overflow-hidden p-6 sm:p-7">
              <div className="mb-5">
                <ProjectPreview project={project} />
              </div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-neon/25 bg-neon/10 px-3 py-1.5 text-xs font-bold uppercase text-neon">
                  {project.category || 'Project'}
                </span>
                <span className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-xs font-bold uppercase text-white/55">
                  {project.status === 'live' ? 'Live' : project.status === 'in-development' ? 'In Development' : 'Coming Soon'}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{project.name}</h3>
                <p className="mt-4 min-h-24 text-sm leading-6 text-white/62">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-xs text-white/65">
                      {item}
                    </span>
                  ))}
                </div>
                <ProjectActions project={project} compact />
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectActions({ project, compact = false }) {
  const statusLabel =
    project.status === 'in-development' ? 'In Development' : project.status === 'coming-soon' ? 'Coming Soon' : 'Coming Soon';

  return (
    <div className={`mt-6 flex flex-wrap gap-3 ${compact ? 'text-xs' : ''}`}>
      <ProjectButton href={project.liveUrl} icon={ExternalLink} primary label="Live Preview" fallback={statusLabel} />
      <ProjectButton href={project.githubUrl} icon={Github} label="GitHub" fallback={project.githubUrl ? 'GitHub' : statusLabel} />
    </div>
  );
}

function ProjectButton({ href, icon: Icon, label, fallback, primary = false }) {
  const enabled = Boolean(href);
  const baseClass = primary
    ? 'border-neon/35 bg-neon/10 font-semibold text-neon hover:bg-neon hover:text-black'
    : 'border-white/12 bg-white/7 font-semibold text-white/78 hover:border-white/30 hover:text-white';
  const disabledClass = primary
    ? 'border-neon/18 bg-neon/5 text-neon/55'
    : 'border-white/10 bg-white/5 text-white/45';
  const className = `inline-flex items-center gap-2 rounded-full border px-4 py-2.5 transition ${
    enabled ? baseClass : `${disabledClass} cursor-not-allowed`
  }`;

  if (!enabled) {
    return (
      <span className={className} aria-disabled="true">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {fallback}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Momentum built through projects, collaboration, and AI.">
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-neon via-sky to-transparent sm:block" />
        {timeline.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <div className="relative mb-6 pl-0 sm:pl-16">
              <span className="absolute left-[0.64rem] top-8 hidden h-5 w-5 rounded-full border border-neon bg-carbon shadow-[0_0_24px_#00D9FF] sm:block" />
              <motion.article whileHover={{ x: 8 }} className="glass-panel p-7 sm:p-8">
                <p className="mb-3 text-sm font-semibold text-neon">0{index + 1}</p>
                <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/62">{item.detail}</p>
              </motion.article>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Resume() {
  return (
    <Section id="resume" eyebrow="Resume" title="Download the signal. Review the trajectory.">
      <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <p className="max-w-xl text-lg leading-8 text-white/66">
            A concise overview of Pranavi's education, skills, projects, and AI-assisted development experience.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="resume-frame mx-auto max-w-xl rounded-[2rem] border border-neon/25 bg-white/[0.06] p-4 shadow-glow backdrop-blur-xl"
          >
            <div className="grid gap-5 rounded-[1.4rem] border border-white/10 bg-black/40 p-6 text-white backdrop-blur-xl sm:grid-cols-[0.8fr_1.2fr]">
              <a
                href={resumeUrl || '#resume'}
                target="_blank"
                rel="noreferrer"
                className="grid min-h-64 place-items-center rounded-[1.4rem] bg-white text-black shadow-glow"
              >
                <span className="rounded-full border border-black/10 bg-black/80 px-6 py-4 font-display font-semibold text-white">
                  Preview Resume
                </span>
              </a>
              <div className="flex flex-col justify-center">
                <div>
                  <p className="text-xs font-bold uppercase text-neon">Resume</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">AI-powered Full Stack Developer</h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    Full stack development, AI tools, automation workflows, and project experience in one clean PDF.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={resumeUrl || '#resume'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-5 py-3 text-sm font-semibold text-white transition hover:border-neon/40 hover:text-neon"
                  >
                    Preview
                  </a>
                  <MagneticButton href={resumeUrl || '#resume'} icon={ArrowDownToLine} download={resumeUrl ? resumeFileName : undefined}>
                    Download Resume
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}

function Contact() {
  const [formState, setFormState] = useState({ status: 'idle', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      setFormState({ status: 'error', message: 'Please fill in your name, email, and message.' });
      return;
    }

    setFormState({ status: 'loading', message: 'Sending your message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send message.');
      }

      form.reset();
      setFormState({ status: 'success', message: 'Message sent successfully and saved. Thank you for reaching out.' });
    } catch (error) {
      setFormState({
        status: 'error',
        message: error.message || 'Something went wrong. Please try again or email directly.',
      });
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something intelligent.">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="glass-panel p-7 sm:p-9">
          <h3 className="font-display text-2xl font-semibold text-white">Connect</h3>
          <p className="mt-4 leading-7 text-white/64">
            Available for collaboration, project discussions, AI product ideas, and full stack development opportunities.
          </p>
          <div className="mt-8 grid gap-3">
            <ContactLink icon={Github} href="https://github.com/Pranavipranavi" label="GitHub" value="Pranavipranavi" />
            <ContactLink icon={Linkedin} href="https://www.linkedin.com/in/saipranavi15" label="LinkedIn" value="saipranavi15" />
            <ContactLink icon={Mail} href={`mailto:${contactEmail}`} label="Email" value={contactEmail} />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="glass-panel p-5 sm:p-7" onSubmit={handleSubmit}>
            <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-white/70">
                Name
                <input className="form-field" type="text" name="name" placeholder="Your name" autoComplete="name" required />
              </label>
              <label className="grid gap-2 text-sm font-medium text-white/70">
                Email
                <input className="form-field" type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-medium text-white/70">
              Message
              <textarea className="form-field min-h-40 resize-none" name="message" placeholder="Tell me about your idea" required />
            </label>
            {formState.message ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                  formState.status === 'success'
                    ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100'
                    : formState.status === 'error'
                      ? 'border-red-300/30 bg-red-300/10 text-red-100'
                      : 'border-neon/30 bg-neon/10 text-neon'
                }`}
                role={formState.status === 'error' ? 'alert' : 'status'}
              >
                {formState.message}
              </motion.p>
            ) : null}
            <div className="mt-6">
              <MagneticButton className="w-full sm:w-auto" icon={Send} type="submit" disabled={formState.status === 'loading'}>
                {formState.status === 'loading' ? 'Sending...' : 'Send Message'}
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactLink({ icon: Icon, href, label, value }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 p-4 transition hover:border-neon/40 hover:bg-neon/10"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-neon/10 text-neon">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase text-white/42">{label}</span>
        <span className="block break-words text-sm font-semibold text-white group-hover:text-neon">{value}</span>
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-10 text-center text-sm text-white/42">
      <p>Designed and built for P Sai Pranavi.</p>
    </footer>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState('dark');
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 1400);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <AnimatePresence>{!loaded ? <LoadingScreen /> : null}</AnimatePresence>
      <motion.div className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-neon to-sky" style={{ scaleX }} />
      <AmbientBackground />
      <CursorGlow />
      <div className="relative z-10 min-h-screen text-white">
        <Navbar active={active} theme={theme} setTheme={setTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
