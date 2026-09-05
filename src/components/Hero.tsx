import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { MouseFollowingEyes } from '@/components/ui/mouse-following-eyes';

const letters = ['H', 'I', 'M', 'A', 'B', 'A', 'L', 'A'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000, active: false });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0.65, 0.98], [1, 0]);

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
    <motion.section
      ref={ref}
      style={{ y, scale, opacity }}
      className="grain relative flex min-h-[92svh] md:min-h-screen w-full flex-col justify-between overflow-hidden bg-bg px-4 pt-20 pb-8 sm:px-8 sm:pt-26 sm:pb-10 md:px-12 md:pt-30 md:pb-12 lg:px-16 lg:pt-34 lg:pb-14 xl:px-20"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col justify-between">
        
        <div className="my-auto flex flex-col items-start w-full py-4 sm:py-6 md:py-8 text-left">
          
          <div className="flex w-full flex-nowrap items-baseline justify-between select-none overflow-visible leading-[0.76]">
            {letters.map((l, i) => (
              <LetterItem
                key={i}
                letter={l}
                index={i}
                mousePos={mousePos}
              />
            ))}
          </div>

          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-3 sm:mt-5 flex items-center gap-1.5 sm:gap-3.5 pl-1.5 sm:pl-2.5 md:pl-3.5 lg:pl-4 font-display text-[2.8vw] sm:text-[2.1vw] md:text-[1.4vw] lg:text-[1.18rem] xl:text-[1.32rem] font-bold uppercase tracking-[0.08em] sm:tracking-[0.14em] text-ink/85"
          >
            <span className="whitespace-nowrap">Product Designer</span>
            <span className="text-accent-pink font-normal mx-0.5 sm:mx-1">×</span>
            <span className="whitespace-nowrap">Full-Stack Developer</span>
          </motion.div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center pt-6 sm:pt-8 md:pt-10 w-full">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="md:col-span-7 lg:col-span-8 flex flex-col items-start text-left font-display pl-1.5 sm:pl-2.5 md:pl-3.5 lg:pl-4"
          >
            <p className="font-medium text-[6vw] text-ink sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2.5rem] xl:text-[2.9rem] leading-[1.12] tracking-[-0.02em] lowercase">
              from pixels to products
            </p>
            <p className="font-medium text-[6vw] text-ink sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2.5rem] xl:text-[2.9rem] leading-[1.12] tracking-[-0.02em] lowercase">
              with an{' '}
              <span className="font-serif-italic font-normal text-accent-pink text-[1.24em] tracking-normal px-0.5 inline-block">
                eye
              </span>{' '}
              for detail.
            </p>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 lg:col-span-4 flex items-center justify-start md:justify-end"
          >
            <MouseFollowingEyes
              blinkInterval={6000}
              eyelidClassName="bg-accent-pink"
              eyeClassName="w-11 h-16 sm:w-13 sm:h-20 md:w-[3.8rem] md:h-[5.8rem] lg:w-[4.4rem] lg:h-[6.6rem] xl:w-[4.9rem] xl:h-[7.4rem] shadow-[0_12px_28px_-6px_rgba(5,5,5,0.12)] border border-ink/5"
              pupilClassName="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-7 xl:w-7"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function LetterItem({
  letter,
  index,
  mousePos,
}: {
  letter: string;
  index: number;
  mousePos: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
}) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotate = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const springConfig = { damping: 18, stiffness: 200, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springRotate = useSpring(rawRotate, { damping: 20, stiffness: 180 });
  const springScale = useSpring(rawScale, springConfig);

  useEffect(() => {
    let animFrame: number;
    const updatePhysics = () => {
      if (letterRef.current) {
        const rect = letterRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (mousePos.current.active) {
          const dx = centerX - mousePos.current.x;
          const dy = centerY - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 140;

          if (dist < radius && dist > 0) {
            const force = Math.pow((radius - dist) / radius, 1.3);
            const repelDistance = 38;
            const angle = Math.atan2(dy, dx);

            const pushX = Math.cos(angle) * force * repelDistance;
            const pushY = Math.sin(angle) * force * repelDistance;
            const rot = (dx > 0 ? 1 : -1) * force * 10;
            const scaleVal = 1 + force * 0.06;

            rawX.set(pushX);
            rawY.set(pushY);
            rawRotate.set(rot);
            rawScale.set(scaleVal);
          } else {
            rawX.set(0);
            rawY.set(0);
            rawRotate.set(0);
            rawScale.set(1);
          }
        } else {
          rawX.set(0);
          rawY.set(0);
          rawRotate.set(0);
          rawScale.set(1);
        }
      }
      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, [mousePos]);

  return (
    <span className="inline-block overflow-visible mr-[0.015em] sm:mr-[0.03em] md:mr-[0.04em] lg:mr-[0.05em] last:mr-0">
      <motion.span
        ref={letterRef}
        className="inline-block font-display text-[12.6vw] sm:text-[13.5vw] md:text-[13.5vw] lg:text-[13vw] xl:text-[13.5vw] font-black leading-[0.76] tracking-[-0.05em] text-ink select-none cursor-default"
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.15 + index * 0.04,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          x: springX,
          y: springY,
          rotate: springRotate,
          scale: springScale,
        }}
      >
        {letter}
      </motion.span>
    </span>
  );
}
