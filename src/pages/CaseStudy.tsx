import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/content';
import BrowserMockup from '@/components/BrowserMockup';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
      {/* 1. HERO HEADER: Back Button, Title + Pink Number, and Tagline */}
      <header className="relative px-4 pt-28 pb-8 sm:px-8 sm:pt-32 sm:pb-10 md:pt-36 md:pb-12">
        <div className="mx-auto w-full max-w-5xl">
          {/* Back to Work Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/#projects')}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.04] px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink/75 transition-all duration-300 hover:border-ink/40 hover:bg-ink hover:text-bg shadow-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Work
            </button>
          </div>

          {/* Title Row with Pink Number on the Right (Aligned to Title) */}
          <div className="flex items-baseline justify-between gap-4 w-full">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[13vw] font-black uppercase leading-[0.86] tracking-[-0.04em] text-ink sm:text-[9vw] lg:text-[7vw]"
            >
              {project.name}
            </motion.h1>

            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[13vw] font-black leading-[0.86] tracking-[-0.04em] text-accent-pink select-none sm:text-[9vw] lg:text-[7vw]"
            >
              {project.number}
            </motion.span>
          </div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-4 sm:mt-5 max-w-3xl font-serif-italic text-2xl text-ink/80 md:text-3xl lg:text-4xl leading-snug"
          >
            {project.tagline}
          </motion.p>
        </div>
      </header>

      {/* 2. THE PROBLEM (Matched to max-w-5xl) */}
      <section id="case-problem" className="px-4 py-8 sm:py-10 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-5 flex items-center gap-4">
            <span
              className="font-display text-sm sm:text-base md:text-lg font-black uppercase tracking-[0.2em]"
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
          >
            <p className="font-display text-lg leading-[1.7] text-ink/80 md:text-xl md:leading-[1.65]">
              {project.problem}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. THE SOLUTION (Matched to max-w-5xl) */}
      <section className="px-4 py-8 sm:py-10 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-5 flex items-center gap-4">
            <span
              className="font-display text-sm sm:text-base md:text-lg font-black uppercase tracking-[0.2em]"
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
          >
            <p className="font-display text-lg leading-[1.7] text-ink/80 md:text-xl md:leading-[1.65]">
              {project.solution}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. FINAL PRODUCT BROWSER MOCKUP (Matched to max-w-5xl) */}
      <section className="px-4 py-10 sm:py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-6 flex items-center gap-4">
            <span
              className="font-display text-sm sm:text-base md:text-lg font-black uppercase tracking-[0.2em]"
              style={{ color: project.accent }}
            >
              03 — Final Product
            </span>
            <span className="h-px flex-1 bg-ink/15" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-40px' }}
          >
            <BrowserMockup
              url={project.liveUrl.replace('https://', '')}
              accent={project.accent}
              className="w-full shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* 5. THE BIG CTA */}
      <section className="px-4 py-16 text-center sm:py-20 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-5xl"
        >
          <p
            className="mb-4 font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.25em]"
            style={{ color: project.accent }}
          >
            See it in action
          </p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 font-display text-[9vw] font-black uppercase leading-none tracking-[-0.03em] text-ink transition-colors hover:text-ink/70 md:text-[5vw]"
          >
            The Live Product
            <span className="inline-flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full border-2 border-ink transition-all duration-500 group-hover:scale-110 group-hover:border-ink/50">
              <ArrowUpRight
                className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={2}
              />
            </span>
          </a>
        </motion.div>
      </section>

      {/* 6. NEXT PROJECT / BACK NAVIGATION */}
      <section className="border-t border-ink/10 px-4 py-12 md:px-8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <button
            onClick={() => navigate('/#projects')}
            className="group inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
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
                className="group inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
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

