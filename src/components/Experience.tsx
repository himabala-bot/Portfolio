import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences } from '@/data/content';
import BrowserMockup from './BrowserMockup';

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 font-outfit text-xs uppercase tracking-widest text-ink/40 md:text-sm">
            <span className="font-semibold">[ 03 ]</span>
            <span>Career Path & Roles</span>
          </div>
          <h2 className="mt-2 font-display text-[12vw] font-black leading-[0.85] tracking-[-0.04em] text-ink md:text-[7vw]">
            Experience<span className="font-serif-italic font-normal text-accent-pink">.</span>
          </h2>
        </motion.div>

        <div className="space-y-8 sm:space-y-10 md:space-y-14">
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
  const y = useTransform(scrollYProgress, [0, 1], [35, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1, 1]);

  const isFreelance = exp.type === 'FREELANCE';

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative rounded-2xl md:rounded-3xl border border-ink/10 bg-bg p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_6px_28px_rgba(5,5,5,0.04)] transition-all duration-500 hover:shadow-[0_18px_45px_rgba(5,5,5,0.07)]"
    >
      
      <div className="mb-7 flex flex-col justify-between gap-5 border-b border-ink/10 pb-6 sm:mb-9 sm:pb-7 sm:flex-row sm:items-start">
        <div className="flex items-start gap-4 sm:gap-6 md:gap-7">
          
          <span className="select-none font-outfit text-5xl font-black leading-none text-ink/20 sm:text-6xl md:text-7xl lg:text-8xl">
            {exp.number}
          </span>

          <div className="flex flex-col gap-1.5 pt-0.5 sm:pt-1">
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-5xl">
                {exp.company}
                {exp.sub && ` ${exp.sub}`}
              </h3>

              
              {isFreelance ? (
                <span className="inline-flex items-center rounded-full border border-[#54D68A]/40 bg-[#54D68A]/20 px-3 py-1 font-outfit text-xs font-bold uppercase tracking-wider text-[#0e441c] shadow-sm sm:px-3.5 sm:py-1.5 sm:text-xs md:text-sm">
                  {exp.type}
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-accent-blue/35 bg-accent-blue/15 px-3 py-1 font-outfit text-xs font-bold uppercase tracking-wider text-accent-blue shadow-sm sm:px-3.5 sm:py-1.5 sm:text-xs md:text-sm">
                  {exp.type}
                </span>
              )}
            </div>

            
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink/60 sm:text-sm md:text-base">
              {exp.role}
            </p>
          </div>
        </div>

        
        <div className="flex items-center gap-2.5 sm:flex-col sm:items-end">
          <span
            className="font-display text-sm font-bold uppercase tracking-[0.15em] sm:text-base md:text-xl"
            style={{ color: exp.accent }}
          >
            {exp.year}
          </span>
          {exp.location && (
            <span className="font-display text-xs uppercase tracking-[0.2em] text-ink/40 sm:text-xs">
              {exp.location}
            </span>
          )}
        </div>
      </div>

      {isFreelance ? (
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14 items-center">
          
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <BrowserMockup
              url="authentic-ayurveda.vercel.app"
              accent={exp.accent}
              imageSrc="/images/authentic-ayurveda.png"
              aspectClassName="aspect-[16/9]"
            />
            <div>
              <a
                href={exp.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-bg shadow-md transition-all duration-300 hover:bg-[#54D68A] hover:text-[#0a3314] hover:shadow-lg md:text-base"
              >
                <span>View Live Site</span>
                <span className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            
            <div>
              <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-ink/50 md:text-sm">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {exp.scope?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink/15 bg-ink/[0.04] px-3.5 py-1.5 font-outfit text-xs sm:text-sm font-semibold text-ink transition-colors hover:border-ink/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            
            <div>
              <h4 className="mb-2 font-display text-xs font-bold uppercase tracking-[0.25em] text-ink/50 md:text-sm">
                Implementation
              </h4>
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                {exp.implementation?.map((t, idx) => (
                  <span
                    key={t}
                    className="font-display text-sm font-medium text-ink/80 sm:text-base"
                  >
                    {t}
                    {idx < (exp.implementation?.length || 0) - 1 && (
                      <span className="ml-3 text-ink/30">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            
            <div>
              <p className="font-display text-base font-normal leading-[1.75] text-ink/80 sm:text-lg">
                {exp.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-7">
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            {exp.scopeWords?.map((w, j) => (
              <span
                key={w}
                className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black uppercase leading-tight tracking-[-0.02em] text-ink/85"
                style={{ color: j % 2 === 0 ? exp.accent : undefined }}
              >
                {w}
              </span>
            ))}
          </div>

          <div className="max-w-4xl space-y-6 pt-1">
            {exp.bullets && exp.bullets.length > 0 ? (
              <ul className="space-y-3.5 sm:space-y-4">
                {exp.bullets.map((b, idx) => {
                  const colonIndex = b.indexOf(': ');
                  const hasLabel = colonIndex !== -1;
                  const label = hasLabel ? b.slice(0, colonIndex + 1) : '';
                  const body = hasLabel ? b.slice(colonIndex + 2) : b;

                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 font-display text-base font-normal leading-[1.7] text-ink/85 sm:text-lg lg:text-[18.5px]"
                    >
                      <span
                        className="mt-2.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: exp.accent }}
                      />
                      <span>
                        {hasLabel ? (
                          <>
                            <strong className="font-bold text-ink">{label}</strong>{' '}
                            {body}
                          </>
                        ) : (
                          b
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="font-display text-base font-normal leading-[1.75] text-ink/80 sm:text-lg lg:text-[19px]">
                {exp.description}
              </p>
            )}

            <p className="pt-3 sm:pt-4">
              <span className="font-serif-italic text-2xl font-normal text-accent-pink sm:text-3xl md:text-4xl">
                basically a creative experience designer.
              </span>
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
