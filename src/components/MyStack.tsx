import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { stackChapters } from '@/data/content';

export default function MyStack() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      id="stack"
      className="relative bg-ink px-4 py-24 text-bg sm:px-6 md:px-10 md:py-32 lg:px-14"
    >
      <div className="mx-auto w-full max-w-5xl">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 font-outfit text-xs uppercase tracking-widest text-bg/40 md:text-sm">
            <span className="font-semibold">[ 02 ]</span>
            <span>Skills, Tools & Technologies</span>
          </div>
          <h2 className="mt-2 font-display text-[12vw] font-black leading-[0.85] tracking-[-0.04em] text-bg md:text-[7vw]">
            My Stack<span className="font-serif-italic font-normal text-accent-green">.</span>
          </h2>
        </motion.div>

        
        <div className="relative space-y-8 pb-32 sm:space-y-12 sm:pb-48 md:pb-64">
          {stackChapters.map((chapter, i) => (
            <StackCard
              key={chapter.key}
              chapter={chapter}
              index={i}
              total={stackChapters.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: (typeof stackChapters)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  
  const topOffset = `calc(13vh + ${index * 32}px)`;

  
  const startProgress = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(progress, [startProgress, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full"
      style={{
        top: topOffset,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
          boxShadow: `0 -12px 30px -10px ${chapter.accent}20, 0 25px 60px rgba(0, 0, 0, 0.7)`,
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-xl"
      >
        
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: chapter.accent }}
        />

        
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5 md:mb-8">
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: chapter.accent }}
            />
            <span className="font-outfit text-xs font-bold uppercase tracking-[0.25em] text-white/60 sm:text-sm">
              0{index + 1} — {chapter.caption}
            </span>
          </div>

          <span
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-outfit text-xs font-bold uppercase tracking-widest sm:text-sm"
            style={{ color: chapter.accent }}
          >
            CHAPTER 0{index + 1}
          </span>
        </div>

        
        <div className="mb-8 md:mb-10">
          <h3
            className="font-display text-4xl font-black uppercase leading-none tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ color: chapter.accent }}
          >
            {chapter.label}
          </h3>
        </div>

        
        <div>
          <h4 className="mb-3.5 font-display text-xs font-bold uppercase tracking-[0.25em] text-white/40 md:text-sm">
            Technologies & Focus Areas
          </h4>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {chapter.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-display text-sm font-medium text-white/90 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.12] sm:px-5 sm:py-2.5 sm:text-base md:text-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
