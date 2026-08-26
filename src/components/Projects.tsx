import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/content';
import BrowserMockup from './BrowserMockup';

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <section ref={ref} id="projects" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-6xl">

        <motion.h2
          style={{ y: titleY }}
          className="mb-14 font-display text-[10vw] font-black leading-[0.88] tracking-[-0.04em] text-ink md:text-[6vw]"
        >
          Things I've{' '}
          <span className="font-serif-italic font-normal text-accent-pink">built.</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:gap-10 items-stretch">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      className="flex h-full"
    >
      <Link
        to={`/work/${project.slug}`}
        data-cursor="peek"
        data-cursor-label="Peek Inside"
        className="group relative flex flex-col justify-between w-full h-full rounded-2xl border border-ink/10 bg-white/50 p-6 md:p-7 backdrop-blur-sm transition-all duration-500 hover:border-ink/25 hover:bg-white hover:shadow-[0_24px_50px_-20px_rgba(5,5,5,0.12)] hover:-translate-y-1.5"
      >
        <div>
          {/* Number header */}
          <div className="mb-3 flex items-center justify-between">
            <span
              className="font-display text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: project.accent }}
            >
              {project.number}
            </span>
          </div>

          <h3 className="mb-4 font-display text-3xl font-black uppercase tracking-[-0.02em] text-ink transition-transform duration-300 group-hover:translate-x-0.5 md:text-4xl">
            {project.name}
          </h3>

          {/* Browser mockup */}
          <div className="relative mb-5 overflow-hidden rounded-xl pointer-events-none">
            <BrowserMockup
              url={project.liveUrl.replace('https://', '')}
              accent={project.accent}
            />
            {/* Accent border glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                boxShadow: `inset 0 0 0 2px ${project.accent}`,
              }}
            />
          </div>

          {/* Tagline */}
          <p className="font-serif-italic text-lg text-ink/80 md:text-xl">
            {project.tagline}
          </p>

          {/* Description */}
          <p className="mt-2.5 font-display text-sm leading-[1.65] text-ink/65 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-ink/5">
          {project.techStack.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-md bg-ink/[0.04] px-2.5 py-1 font-display text-[11px] font-medium uppercase tracking-[0.08em] text-ink/60 transition-colors group-hover:bg-ink/[0.07] group-hover:text-ink/80"
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
