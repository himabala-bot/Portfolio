import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/content';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const timer = setTimeout(() => {
      html.style.scrollBehavior = prevBehavior;
    }, 50);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg">
        <p className="font-display text-xl text-ink/60">Project not found.</p>
        <Link
          to="/#projects"
          className="font-display text-sm uppercase tracking-[0.15em] text-accent-blue"
        >
          ← Back to Work
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-bg"
    >
      
      <header className="relative px-4 pt-24 pb-6 sm:px-8 sm:pt-30 sm:pb-8 md:pt-36 md:pb-12">
        <div className="mx-auto w-full max-w-5xl">
          
          <div className="mb-6">
            <button
              onClick={() => navigate('/#projects')}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.04] px-3.5 sm:px-4 py-1.5 sm:py-2 font-display text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-ink/75 transition-all duration-300 hover:border-ink/40 hover:bg-ink hover:text-bg shadow-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Work
            </button>
          </div>

          
          <div className="flex items-end justify-between gap-3 sm:gap-4 w-full">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[11vw] sm:text-[9vw] lg:text-[7vw] font-black uppercase leading-[0.86] tracking-[-0.04em] text-ink break-words"
            >
              {project.name}
            </motion.h1>

            <div className="relative z-20 flex flex-col items-end shrink-0">
              
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.liveUrl) {
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
                className="relative z-30 group mb-1 sm:mb-2 inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-bg/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm transition-all duration-300 hover:border-ink hover:bg-ink hover:text-bg hover:shadow-md cursor-pointer select-none"
              >
                <span>Open Website</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

              <motion.span
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-outfit text-[11vw] sm:text-[9vw] lg:text-[7vw] font-black leading-[0.86] tracking-[-0.04em] text-accent-pink select-none shrink-0"
              >
                {project.number}
              </motion.span>
            </div>
          </div>

          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 flex flex-wrap gap-1.5 sm:gap-2"
          >
            {project.techStack.map((t) => (
              <span
                key={t}
                className="rounded-lg bg-ink/[0.04] border border-ink/10 px-2.5 sm:px-3 py-1 font-outfit text-xs sm:text-[13px] font-medium text-ink/70"
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-5 max-w-3xl font-serif-italic text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug text-ink/80"
          >
            {project.tagline}
          </motion.p>
        </div>
      </header>

      
      <section id="case-problem" className="px-4 py-6 sm:py-8 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4">
            <span
              className="font-display text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em]"
              style={{ color: project.accent }}
            >
              01 — The Problem
            </span>
            <span className="h-px flex-1 bg-ink/15" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-4 sm:space-y-5"
          >
            {project.problem.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className="font-display text-base sm:text-lg md:text-xl leading-[1.75] md:leading-[1.7] text-ink/80"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      
      <section className="px-4 py-6 sm:py-8 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4">
            <span
              className="font-display text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em]"
              style={{ color: project.accent }}
            >
              02 — The Solution
            </span>
            <span className="h-px flex-1 bg-ink/15" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-4 sm:space-y-5"
          >
            {project.solution.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className="font-display text-base sm:text-lg md:text-xl leading-[1.75] md:leading-[1.7] text-ink/80"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      
      <section className="px-4 py-12 sm:py-16 md:px-8 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-5xl"
        >
          <p
            className="mb-3 sm:mb-4 font-display text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.25em]"
            style={{ color: project.accent }}
          >
            See it in action
          </p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            onClick={(e) => {
              if (project.liveUrl) {
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            className="group inline-flex items-center gap-2 sm:gap-3 font-display text-[8vw] sm:text-[6.5vw] md:text-[5vw] font-black uppercase leading-none tracking-[-0.03em] text-ink transition-colors hover:text-ink/70 cursor-pointer"
          >
            The Live Product
            <span className="inline-flex h-10 w-10 sm:h-14 sm:w-14 md:h-18 md:w-18 items-center justify-center rounded-full border border-ink/40 sm:border-2 sm:border-ink transition-all duration-500 group-hover:scale-110 group-hover:border-ink/70 shrink-0">
              <ArrowUpRight
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </span>
          </a>
        </motion.div>
      </section>

      
      <section className="border-t border-ink/10 px-4 py-8 sm:py-12 md:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <button
            onClick={() => navigate('/#projects')}
            className="group inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink py-2"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Work
          </button>
          {(() => {
            const idx = projects.findIndex((p) => p.slug === project.slug);
            const next = projects[(idx + 1) % projects.length];
            return (
              <Link
                to={`/work/${next.slug}`}
                className="group inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink py-2"
              >
                Next: {next.name}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            );
          })()}
        </div>
      </section>
    </motion.article>
  );
}

