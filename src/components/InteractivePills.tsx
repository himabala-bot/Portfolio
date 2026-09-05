import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface PillData {
  id: string;
  text: string;
  color: string;
  textColor?: string;
  initialRotate: number;
  offsetX?: number;
  offsetY?: number;
  zIndex?: number;
}

const PILLS: PillData[] = [
  {
    id: 'sleep',
    text: '404: Sleep Not Found',
    color: '#FBCFE8', 
    textColor: '#18181B',
    initialRotate: -5,
    zIndex: 10,
  },
  {
    id: 'ctrl-z',
    text: 'Ctrl + Z Everything',
    color: '#FB923C', 
    textColor: '#09090B',
    initialRotate: 8,
    offsetY: -6,
    zIndex: 25,
  },
  {
    id: 'meaning',
    text: 'Mess Into Meaning',
    color: '#BEF264', 
    textColor: '#14532D',
    initialRotate: -4,
    zIndex: 15,
  },
  {
    id: 'git-commit',
    text: 'git commit -m "trust me"',
    color: '#93C5FD', 
    textColor: '#1E3A8A',
    initialRotate: -6,
    zIndex: 20,
  },
  {
    id: 'who-approved',
    text: 'Who Approved This?',
    color: '#FDE047', 
    textColor: '#713F12',
    initialRotate: 6,
    offsetY: -4,
    zIndex: 30,
  },
  {
    id: 'dont-inspect',
    text: 'Please dont inspect',
    color: '#5EEAD4', 
    textColor: '#134E4A',
    initialRotate: -3,
    zIndex: 12,
  },
];

function PhysicsPill({
  pill,
  mousePos,
  index,
}: {
  pill: PillData;
  mousePos: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
  index: number;
}) {
  const pillRef = useRef<HTMLDivElement>(null);

  
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRot = useMotionValue(pill.initialRotate);

  
  const springConfig = { damping: 18, stiffness: 180, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springRot = useSpring(rawRot, { damping: 20, stiffness: 160 });

  useEffect(() => {
    let animFrame: number;
    let time = index * 1.5;

    const updatePhysics = () => {
      time += 0.02;
      const floatY = Math.sin(time) * 3;
      const floatRot = Math.cos(time * 0.8) * 1.5;

      if (pillRef.current) {
        const rect = pillRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (mousePos.current.active) {
          const dx = centerX - mousePos.current.x;
          const dy = centerY - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = 220; 

          if (dist < threshold && dist > 0) {
            const force = Math.pow((threshold - dist) / threshold, 1.3);
            const repelDistance = 70; 
            const angle = Math.atan2(dy, dx);

            const pushX = Math.cos(angle) * force * repelDistance;
            const pushY = Math.sin(angle) * force * repelDistance;
            const extraRot = (dx > 0 ? 1 : -1) * force * 15;

            rawX.set(pushX + (pill.offsetX || 0));
            rawY.set(pushY + (pill.offsetY || 0) + floatY);
            rawRot.set(pill.initialRotate + extraRot + floatRot);
          } else {
            rawX.set(pill.offsetX || 0);
            rawY.set((pill.offsetY || 0) + floatY);
            rawRot.set(pill.initialRotate + floatRot);
          }
        } else {
          rawX.set(pill.offsetX || 0);
          rawY.set((pill.offsetY || 0) + floatY);
          rawRot.set(pill.initialRotate + floatRot);
        }
      }

      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, [mousePos, pill, index]);

  return (
    <motion.div
      ref={pillRef}
      drag
      dragConstraints={{ left: -100, right: 100, top: -70, bottom: 70 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      whileDrag={{ scale: 1.14, zIndex: 70 }}
      style={{
        x: springX,
        y: springY,
        rotate: springRot,
        backgroundColor: pill.color,
        color: pill.textColor || '#050505',
        zIndex: pill.zIndex || 10,
      }}
      className="inline-flex cursor-grab select-none items-center justify-center rounded-full border border-ink/10 px-6 py-3 text-sm font-semibold tracking-tight shadow-[0_6px_20px_rgba(5,5,5,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(5,5,5,0.18)] active:cursor-grabbing md:px-7 md:py-3.5 md:text-base lg:text-[17px]"
    >
      <span className="font-mono font-medium tracking-tight">
        {pill.text}
      </span>
    </motion.div>
  );
}

export default function InteractivePills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-4 flex w-full max-w-5xl flex-wrap items-center justify-center gap-3 px-4 py-3 md:mt-6 md:gap-4 lg:gap-5 md:py-4"
    >
      {PILLS.map((pill, i) => (
        <PhysicsPill key={pill.id} pill={pill} mousePos={mousePos} index={i} />
      ))}
    </div>
  );
}
