import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { stackChapters } from '@/data/content';

export default function MyStack() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const chapterCount = stackChapters.length;
  const segment = 1 / chapterCount;

  return (
    <section ref={ref} id="stack" className="relative bg-ink text-bg">
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Progress line on left */}
        <div className="absolute left-8 top-1/2 z-20 hidden h-[60vh] -translate-y-1/2 md:block">
          <div className="relative h-full w-px bg-bg/15">
            <motion.div
              className="absolute left-0 top-0 w-px bg-bg"
              style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
            />
          </div>
        </div>

        {/* Chapters */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-4 md:px-20">
          {stackChapters.map((chapter, i) => {
            const start = i * segment;
            const end = (i + 1) * segment;
            return (
              <Chapter
                key={chapter.key}
                chapter={chapter}
                progress={scrollYProgress}
                start={start}
                end={end}
                index={i}
                total={chapterCount}
                segment={segment}
              />
            );
          })}
        </div>
      </div>

      {/* Spacer to create scroll length */}
      <div style={{ height: `${chapterCount * 100}vh` }} />
    </section>
  );
}

function Chapter({
  chapter,
  progress,
  start,
  end,
  index,
  total,
  segment,
}: {
  chapter: (typeof stackChapters)[number];
  progress: any;
  start: number;
  end: number;
  index: number;
  total: number;
  segment: number;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Seamless, precise crossfade breakpoints
  const fadeLead = segment * 0.25;

  let opacityInput: number[];
  let opacityOutput: number[];
  let yInput: number[];
  let yOutput: number[];

  if (isFirst) {
    opacityInput = [0, end - fadeLead, end];
    opacityOutput = [1, 1, 0];
    yInput = [0, end - fadeLead, end];
    yOutput = [0, 0, -60];
  } else if (isLast) {
    opacityInput = [start - fadeLead, start + fadeLead, 1];
    opacityOutput = [0, 1, 1];
    yInput = [start - fadeLead, start + fadeLead, 1];
    yOutput = [60, 0, 0];
  } else {
    opacityInput = [
      Math.max(0, start - fadeLead),
      start + fadeLead,
      end - fadeLead,
      Math.min(1, end),
    ];
    opacityOutput = [0, 1, 1, 0];
    yInput = [
      Math.max(0, start - fadeLead),
      start + fadeLead,
      end - fadeLead,
      Math.min(1, end),
    ];
    yOutput = [60, 0, 0, -60];
  }

  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const y = useTransform(progress, yInput, yOutput);
  const scale = useTransform(
    opacity,
    [0, 1],
    [0.94, 1]
  );

  const pointerEvents = useTransform(opacity, (o: number) => (o > 0.05 ? 'auto' : 'none'));
  const visibility = useTransform(opacity, (o: number) => (o > 0.01 ? 'visible' : 'hidden'));

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-4"
      style={{
        opacity,
        y,
        scale,
        pointerEvents: pointerEvents as any,
        visibility: visibility as any,
      }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        {/* Chapter pill / category */}
        <span className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-bg/60 md:text-base">
          0{index + 1} — {chapter.caption}
        </span>

        {/* Centered large chapter label */}
        <h3
          className="font-display text-[15vw] font-black uppercase leading-[0.85] tracking-[-0.04em] text-center md:text-[10vw] lg:text-[8.5vw]"
          style={{ color: chapter.accent }}
        >
          {chapter.label}
        </h3>

        {/* Stack items */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 max-w-2xl mx-auto md:mt-10">
          {chapter.items.map((item, j) => (
            <span
              key={item}
              className="font-display text-base font-light text-bg/80 md:text-2xl"
            >
              {item}
              {j < chapter.items.length - 1 && (
                <span className="ml-5 text-bg/20">·</span>
              )}
            </span>
          ))}
        </div>

        {isLast && (
          <p className="mt-10 font-serif-italic text-2xl text-bg/60 md:text-3xl">
            shipped.
          </p>
        )}
      </div>
    </motion.div>
  );
}
