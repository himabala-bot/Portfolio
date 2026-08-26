import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences } from '@/data/content';
import BrowserMockup from './BrowserMockup';

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative px-4 py-32 md:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-20 font-display text-[12vw] font-black leading-[0.85] tracking-[-0.04em] text-ink md:text-[7vw]"
        >
          Experience<span className="font-serif-italic font-normal text-accent-pink">.</span>
        </motion.h2>

        <div className="space-y-16 md:space-y-24">
          {experiences.map((exp, i) => (
            <ExperienceBlock key={exp.number} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceBlock({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const isFreelance = exp.type === 'FREELANCE';

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative rounded-3xl border border-ink/10 bg-bg p-6 shadow-[0_8px_30px_rgba(5,5,5,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(5,5,5,0.08)] md:p-10 lg:p-12"
    >
      {/* Header: Number, Pill, Company & Role */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-ink/10 pb-8 sm:flex-row sm:items-start">
        <div className="flex items-start gap-5 md:gap-7">
          {/* Large Number */}
          <span className="select-none font-display text-6xl font-black leading-none text-ink/20 md:text-7xl lg:text-8xl">
            {exp.number}
          </span>

          <div className="flex flex-col gap-2.5">
            {/* Type Pill (Green for freelance, Blue for full-time) */}
            <div>
              {isFreelance ? (
                <span className="inline-flex items-center rounded-full border border-[#54D68A]/40 bg-[#54D68A]/20 px-4 py-1.5 font-mono text-sm font-bold uppercase tracking-wider text-[#0e441c] shadow-sm md:text-base">
                  {exp.type}
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-accent-blue/35 bg-accent-blue/15 px-4 py-1.5 font-mono text-sm font-bold uppercase tracking-wider text-accent-blue shadow-sm md:text-base">
                  {exp.type}
                </span>
              )}
            </div>

            {/* Company heading matching size of 01 */}
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink md:text-4xl lg:text-5xl">
                {exp.company}
              </h3>
              {exp.sub && (
                <span className="font-serif-italic text-2xl text-ink/50 md:text-3xl lg:text-4xl">
                  {exp.sub}
                </span>
              )}
            </div>

            {/* Role */}
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/60 md:text-base">
              {exp.role}
            </p>
          </div>
        </div>

        {/* Right metadata: Year & Location */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <span
            className="font-display text-base font-bold uppercase tracking-[0.15em] md:text-xl"
            style={{ color: exp.accent }}
          >
            {exp.year}
          </span>
          {exp.location && (
            <span className="font-display text-xs uppercase tracking-[0.2em] text-ink/40">
              {exp.location}
            </span>
          )}
        </div>
      </div>

      {isFreelance ? (
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Browser mockup & Prominent CTA */}
          <div className="flex flex-col justify-between gap-6">
            <BrowserMockup
              url="authentic-ayurveda.vercel.app"
              accent={exp.accent}
            />
            <div>
              <a
                href={exp.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-bg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#54D68A] hover:text-[#0a3314] hover:shadow-xl md:text-base"
              >
                <span>View Live Site</span>
                <span className="text-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Details: Tech Stack, Implementation & Description with enlarged font sizes */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Tech Stack */}
            <div>
              <h4 className="mb-3.5 font-display text-xs font-bold uppercase tracking-[0.25em] text-ink/50 md:text-sm">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {exp.scope?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink/15 bg-ink/[0.04] px-4 py-2 font-display text-xs font-semibold text-ink transition-colors hover:border-ink/30 md:text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation */}
            <div>
              <h4 className="mb-3.5 font-display text-xs font-bold uppercase tracking-[0.25em] text-ink/50 md:text-sm">
                Implementation
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {exp.implementation?.map((t, idx) => (
                  <span
                    key={t}
                    className="font-display text-sm font-medium text-ink/80 md:text-base"
                  >
                    {t}
                    {idx < (exp.implementation?.length || 0) - 1 && (
                      <span className="ml-3 text-ink/30">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="font-display text-base font-normal leading-[1.75] text-ink/80 md:text-lg lg:text-[19px]">
                {exp.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Scope through typography */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {exp.scopeWords?.map((w, j) => (
              <motion.span
                key={w}
                className="font-display text-[4.5vw] font-black uppercase leading-none tracking-[-0.02em] text-ink/85 md:text-[3vw] lg:text-[2.6vw]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: j * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                style={{ color: j % 2 === 0 ? exp.accent : undefined }}
              >
                {w}
              </motion.span>
            ))}
          </div>

          <div className="max-w-3xl pt-2">
            <p className="font-display text-base font-normal leading-[1.75] text-ink/80 md:text-lg lg:text-[19px]">
              {exp.description}{' '}
              <span className="font-serif-italic text-2xl font-normal text-accent-pink md:text-3xl">
                basically a creative experience designer.
              </span>
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
