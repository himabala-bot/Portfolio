import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'peek';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 350, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 350, mass: 0.5 });

  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [label, setLabel] = useState('');
  const enabledRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    enabledRef.current = true;
    document.body.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect dark section / background
        const darkSection = target.closest('#stack, #contact, footer, .bg-ink, [data-theme="dark"]');
        setIsDark(Boolean(darkSection));

        const peek = target.closest('[data-cursor="peek"]');
        const hover = target.closest('[data-cursor="hover"], a, button');
        if (peek) {
          setState('peek');
          setLabel(peek.getAttribute('data-cursor-label') || 'PEEK INSIDE');
        } else if (hover) {
          setState('hover');
          setLabel('');
        } else {
          setState('default');
          setLabel('');
        }
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [cursorX, cursorY, visible]);

  if (!enabledRef.current) return null;

  const size = state === 'peek' ? 110 : state === 'hover' ? 52 : 12;

  const bgColor = isDark
    ? state === 'peek'
      ? '#f5f1e8'
      : state === 'hover'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(255, 255, 255, 0.95)'
    : state === 'peek'
    ? '#050505'
    : state === 'hover'
    ? 'rgba(5, 5, 5, 0.08)'
    : 'rgba(5, 5, 5, 0.85)';

  const borderColor = isDark
    ? state === 'peek'
      ? 'transparent'
      : state === 'hover'
      ? 'rgba(255, 255, 255, 0.85)'
      : 'rgba(255, 255, 255, 0.95)'
    : state === 'peek'
    ? 'transparent'
    : state === 'hover'
    ? 'rgba(5, 5, 5, 0.55)'
    : 'rgba(5, 5, 5, 0.85)';

  const textColor = isDark ? '#050505' : '#f5f1e8';

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center select-none"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <motion.div
        className="pointer-events-none flex items-center justify-center rounded-full"
        animate={{
          width: size,
          height: size,
          backgroundColor: bgColor,
          borderColor: borderColor,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 320 }}
        style={{
          border: '1.5px solid',
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
      >
        {state === 'peek' && (
          <span
            className="font-display text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: textColor }}
          >
            {label} ↗
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
