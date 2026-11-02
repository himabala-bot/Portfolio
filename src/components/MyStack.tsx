import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stackChapters } from '@/data/content';

// ─── Constants ───────────────────────────────────────────────────────────────
const FOLDER_W = 112;
const FOLDER_H = 94;

// ─── Spread positions (relative to folder centre, desktop only) ──────────────
const SPREADS: Record<number, { x: number; y: number }[]> = {
  3: [
    { x: 0, y: -108 },
    { x: -148, y: 18 },
    { x: 148, y: 18 },
  ],
  4: [
    { x: -72, y: -108 },
    { x: 72, y: -108 },
    { x: -150, y: 24 },
    { x: 150, y: 24 },
  ],
  5: [
    { x: 0, y: -110 },
    { x: -152, y: -32 },
    { x: 152, y: -32 },
    { x: -112, y: 108 },
    { x: 112, y: 108 },
  ],
  6: [
    { x: -76, y: -110 },
    { x: 76, y: -110 },
    { x: -156, y: 6 },
    { x: 156, y: 6 },
    { x: -90, y: 110 },
    { x: 90, y: 110 },
  ],
  7: [
    { x: 0, y: -110 },
    { x: -148, y: -50 },
    { x: 148, y: -50 },
    { x: -156, y: 44 },
    { x: 156, y: 44 },
    { x: -88, y: 112 },
    { x: 88, y: 112 },
  ],
};

function getSpread(count: number) {
  return SPREADS[count] ?? SPREADS[7]!.slice(0, count);
}

// ─── Responsive hook ─────────────────────────────────────────────────────────
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

// ─── Colour helpers ───────────────────────────────────────────────────────────
function adjustHex(hex: string, delta: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const clamp = (v: number) => Math.min(255, Math.max(0, v));
  const r = clamp((n >> 16) + delta);
  const g = clamp(((n >> 8) & 0xff) + delta);
  const b = clamp((n & 0xff) + delta);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// ─── macOS folder SVG ─────────────────────────────────────────────────────────
function MacFolder({ accent, id }: { accent: string; id: string }) {
  const bodyLight = adjustHex(accent, 72);
  const bodyDark = adjustHex(accent, -28);
  const tabColor = adjustHex(accent, -18);

  return (
    <svg
      viewBox="0 0 156 130"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`body-${id}`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={bodyLight} />
          <stop offset="100%" stopColor={bodyDark} />
        </linearGradient>
        <linearGradient id={`tab-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tabColor} />
          <stop offset="100%" stopColor={adjustHex(accent, -35)} />
        </linearGradient>
        <filter id={`shadow-${id}`} x="-15%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12"
            floodColor={accent} floodOpacity="0.45" />
        </filter>
      </defs>
      {/* Tab */}
      <path
        d="M 10,20 L 10,8 Q 10,2 16,2 L 62,2 Q 70,2 73,10 L 76,20 Z"
        fill={`url(#tab-${id})`}
      />
      {/* Body */}
      <path
        d="M 6,20 L 76,20 L 150,20 Q 156,20 156,26
           L 156,120 Q 156,130 146,130
           L 10,130  Q 0,130 0,120
           L 0,30    Q 0,20 6,20 Z"
        fill={`url(#body-${id})`}
        filter={`url(#shadow-${id})`}
      />
      {/* Inner edge highlight */}
      <path
        d="M 6,20 L 76,20 L 150,20 Q 156,20 156,26 L 156,24 Q 156,20 150,20
           L 76,20 L 6,20 Q 0,20 0,30 L 0,26 Q 0,20 6,20 Z"
        fill="rgba(255,255,255,0.22)"
      />
    </svg>
  );
}

// ─── Pill chip (desktop spread and mobile list) ───────────────────────────────
function ItemPill({ item, accent }: { item: string; accent: string }) {
  return (
    <div
      className="flex items-center whitespace-nowrap rounded-2xl border px-4 py-2.5"
      style={{
        background: `${accent}1a`,
        borderColor: `${accent}55`,
        boxShadow: `0 4px 18px ${accent}28, 0 0 0 1px ${accent}12`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <span
        className="font-outfit text-base font-bold leading-none tracking-wide"
        style={{ color: accent }}
      >
        {item}
      </span>
    </div>
  );
}

// ─── Desktop folder card (hover-to-spread) ────────────────────────────────────
function DesktopFolderCard({
  chapter,
  isHovered,
  onEnter,
  onLeave,
}: {
  chapter: (typeof stackChapters)[number];
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const spread = getSpread(chapter.items.length);
  const cx = FOLDER_W / 2;
  const cy = FOLDER_H / 2;

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ width: FOLDER_W, height: FOLDER_H + 32 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Spread item pills */}
      <AnimatePresence>
        {isHovered &&
          spread.map(({ x, y }, idx) => {
            const item = chapter.items[idx];
            if (!item) return null;
            return (
              <motion.div
                key={item}
                className="pointer-events-none absolute"
                style={{ left: cx, top: cy, width: 0, height: 0, zIndex: 40 }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                animate={{ x, y, opacity: 1, scale: 1 }}
                exit={{
                  x: 0, y: 0, opacity: 0, scale: 0.3,
                  transition: { duration: 0.2, ease: 'easeIn' }
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.045 }}
              >
                <div className="absolute" style={{ transform: 'translate(-50%, -50%)' }}>
                  <ItemPill item={item} accent={chapter.accent} />
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Folder SVG */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ height: FOLDER_H }}
        animate={{ scale: isHovered ? 1.12 : 1 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      >
        <MacFolder accent={chapter.accent} id={chapter.key} />
      </motion.div>

      {/* Label */}
      <div className="absolute inset-x-0 text-center" style={{ top: FOLDER_H + 6 }}>
        <span className="font-outfit text-sm font-medium tracking-wide text-white/65">
          {chapter.caption}
        </span>
      </div>
    </div>
  );
}

// ─── Mobile folder card (tap-to-expand item list) ────────────────────────────
function MobileFolderCard({ chapter }: { chapter: (typeof stackChapters)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Folder tap target */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="relative focus:outline-none"
        style={{ width: 90, height: 76 }}
        aria-expanded={open}
      >
        <motion.div
          animate={{ scale: open ? 1.08 : 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          <MacFolder accent={chapter.accent} id={`m-${chapter.key}`} />
        </motion.div>
      </button>

      {/* Category label */}
      <span className="font-outfit text-sm font-semibold tracking-wide text-white/70">
        {chapter.caption}
      </span>

      {/* Expandable pill list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {chapter.items.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  <ItemPill item={item} accent={chapter.accent} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function MyStack() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  return (
    <section
      id="stack"
      className="relative bg-ink px-4 py-20 text-bg sm:px-6 md:px-10 md:py-32 lg:px-14"
    >
      <div className="mx-auto w-full max-w-6xl">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16"
        >
          <div className="flex items-center gap-3 font-outfit text-xs uppercase tracking-widest text-bg/40 md:text-sm">
            <span className="font-semibold">[ 02 ]</span>
            <span>Skills, Tools &amp; Technologies</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="mt-2 font-display text-[12vw] font-black leading-[0.85] tracking-[-0.04em] text-bg md:text-[7vw]">
              My Stack<span className="font-serif-italic font-normal text-accent-green">.</span>
            </h2>

            {/* Hover / tap hint — italic serif, right-aligned to heading baseline */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-1 font-serif-italic font-normal text-base sm:text-lg text-bg/45 shrink-0"
            >
              {isDesktop ? '— hover over a folder to explore' : '— tap a folder to expand'}
            </motion.p>
          </div>
        </motion.div>

        {/* ── Desktop: 3+2 spread layout ── */}
        {isDesktop ? (
          <div className="flex flex-col items-center">
            {[stackChapters.slice(0, 3), stackChapters.slice(3)].map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex justify-center"
                style={{
                  gap: '100px',
                  padding: rowIdx === 0 ? '90px 60px 70px' : '0 60px 90px',
                }}
              >
                {row.map((chapter, i) => {
                  const globalIdx = rowIdx === 0 ? i : i + 3;
                  const isHovered = hoveredKey === chapter.key;
                  const anyHovered = hoveredKey !== null;

                  return (
                    <motion.div
                      key={chapter.key}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: globalIdx * 0.08 }}
                      style={{ position: 'relative' }}
                    >
                      <motion.div
                        animate={{
                          filter: anyHovered && !isHovered
                            ? 'blur(2px) brightness(0.3)'
                            : 'blur(0px) brightness(1)',
                          scale: anyHovered && !isHovered ? 0.94 : 1,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ zIndex: isHovered ? 50 : 1, position: 'relative' }}
                      >
                        <DesktopFolderCard
                          chapter={chapter}
                          isHovered={isHovered}
                          onEnter={() => setHoveredKey(chapter.key)}
                          onLeave={() => setHoveredKey(null)}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          /* ── Mobile/tablet: 2-column tap-to-expand grid ── */
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 py-8 sm:grid-cols-3 sm:gap-x-10">
            {stackChapters.map((chapter, i) => (
              <motion.div
                key={chapter.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                className="flex justify-center"
              >
                <MobileFolderCard chapter={chapter} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
