import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BrowserMockup({
  url,
  accent = '#050505',
  className = '',
  aspectClassName = 'aspect-[16/8.5]',
  imageSrc,
}: {
  url?: string;
  accent?: string;
  className?: string;
  aspectClassName?: string;
  imageSrc?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_16px_40px_-16px_rgba(5,5,5,0.15)] ${className}`}
    >
      
      <div className="flex items-center gap-2 border-b border-ink/10 bg-bg/60 px-3.5 py-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-coral/70" />
          <span className="h-2 w-2 rounded-full bg-accent-yellow/70" />
          <span className="h-2 w-2 rounded-full bg-accent-green/70" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-0.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="font-display text-[9.5px] text-ink/40">
            {url || 'preview'}
          </span>
        </div>
      </div>
      
      <div className={`relative ${aspectClassName} bg-gradient-to-br from-bg to-bg/40 overflow-hidden`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={url || 'Project preview'}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-[11px] uppercase tracking-[0.2em] text-ink/20"
            >
              Preview coming soon
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
