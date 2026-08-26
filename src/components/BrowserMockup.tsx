import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BrowserMockup({
  url,
  accent = '#050505',
  className = '',
}: {
  url?: string;
  accent?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_20px_60px_-20px_rgba(5,5,5,0.2)] ${className}`}
    >
      {/* Browser bar */}
      <div className="flex items-center gap-2 border-b border-ink/10 bg-bg/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-coral/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-yellow/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-green/70" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-full bg-ink/5 px-4 py-1">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="font-display text-[10px] text-ink/40">
            {url || 'preview'}
          </span>
        </div>
      </div>
      {/* Content area — empty for now, images to be added later */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-bg to-bg/40">
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-xs uppercase tracking-[0.2em] text-ink/20"
          >
            Preview coming soon
          </span>
        </div>
      </div>
    </motion.div>
  );
}
