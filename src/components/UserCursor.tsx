import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export interface UserCursorProps {
  name?: string;
  sections?: string[];
  color?: string;
  tagColor?: string;
  showDot?: boolean;
}

export const UserCursor: React.FC<UserCursorProps> = ({
  name = 'hima',
  sections = ['#about', '#stack'],
  color,
  tagColor,
  showDot = true,
}) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const lastMousePos = useRef({ x: -100, y: -100 });

  const springConfig = { damping: 24, stiffness: 350, mass: 0.45 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isActive, setIsActive] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const checkElementAtCursor = (x: number, y: number) => {
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
        setIsActive(false);
        setCurrentSection(null);
        return;
      }

      const el = document.elementFromPoint(x, y);
      if (el) {
        const matchingSection = sections.find((selector) => Boolean(el.closest(selector)));
        if (matchingSection) {
          setIsActive(true);
          setCurrentSection(matchingSection);
        } else {
          setIsActive(false);
          setCurrentSection(null);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      checkElementAtCursor(e.clientX, e.clientY);
    };

    const handleScrollOrWheel = () => {
      const { x, y } = lastMousePos.current;
      checkElementAtCursor(x, y);
    };

    const handleMouseLeave = () => {
      lastMousePos.current = { x: -100, y: -100 };
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScrollOrWheel, { passive: true });
    window.addEventListener('wheel', handleScrollOrWheel, { passive: true });
    window.addEventListener('resize', handleScrollOrWheel, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScrollOrWheel);
      window.removeEventListener('wheel', handleScrollOrWheel);
      window.removeEventListener('resize', handleScrollOrWheel);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, sections]);

  
  const isDarkSection = currentSection === '#stack';
  const effectiveCursorColor = color || (isDarkSection ? '#54D68A' : '#F04BC4');
  const effectiveTagBg = tagColor || (isDarkSection ? '#181818' : '#050505');
  const effectiveTextColor = '#ffffff';

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10000] select-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.6,
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      aria-hidden="true"
    >
      <div className="relative -left-1 -top-1 flex items-start">
        
        <svg
          className="h-6 w-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3L10.5 21L14 13.5L21.5 10L3 3Z"
            fill={effectiveCursorColor}
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>

        
        <motion.div
          initial={{ x: -4, opacity: 0 }}
          animate={{ x: 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2.5 mt-2.5 flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
          style={{
            backgroundColor: effectiveTagBg,
            color: effectiveTextColor,
          }}
        >
          {showDot && (
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: effectiveCursorColor }}
            />
          )}
          <span>{name}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserCursor;
