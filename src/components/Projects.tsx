import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/content';

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPos((prev) => {
        if (prev.x === 0 && prev.y === 0) {
          return { x: mousePos.x, y: mousePos.y };
        }
        return {
          x: lerp(prev.x, mousePos.x, 0.22),
          y: lerp(prev.y, mousePos.y, 0.22),
        };
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleRowMouseMove = (index: number, e: React.MouseEvent) => {
    if (hoveredIndex !== index) {
      setHoveredIndex(index);
    }
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
    if (!isVisible) {
      setIsVisible(true);
    }
  };

  const handleRowMouseEnter = (index: number, e: React.MouseEvent) => {
    setHoveredIndex(index);
    const x = e.clientX;
    const y = e.clientY;
    setMousePos({ x, y });
    setSmoothPos({ x, y });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  
  const PREVIEW_WIDTH = 460;
  const PREVIEW_HEIGHT = 270;
  const padding = 20;

  const getClampedPos = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    
    const posX = smoothPos.x || mousePos.x;
    const posY = smoothPos.y || mousePos.y;

    
    let targetX = posX + 25;
    
    if (targetX + PREVIEW_WIDTH > window.innerWidth - padding) {
      targetX = posX - PREVIEW_WIDTH - 25;
    }
    
    targetX = Math.max(padding, Math.min(targetX, window.innerWidth - PREVIEW_WIDTH - padding));

    
    let targetY = posY - PREVIEW_HEIGHT / 2;
    targetY = Math.max(padding, Math.min(targetY, window.innerHeight - PREVIEW_HEIGHT - padding));

    return { x: targetX, y: targetY };
  };

  const clamped = getClampedPos();

  return (
    <section
      ref={ref}
      id="projects"
      className="relative px-4 py-24 md:px-8 md:py-32"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="mx-auto w-full max-w-5xl"
      >
        
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 font-outfit text-xs uppercase tracking-widest text-ink/40 md:text-sm">
            <span className="font-outfit font-semibold">[ 04 ]</span>
            <span>stuff i built</span>
          </div>
          <h2 className="mt-2 font-display text-[10vw] font-black leading-[0.88] tracking-[-0.04em] text-ink md:text-[6vw]">
            Things I've{' '}
            <span className="font-serif-italic font-normal text-accent-pink">
              built.
            </span>
          </h2>
        </motion.div>

        {/* Floating Mouse-following Project Preview Window (Desktop) */}
        <div
          className="pointer-events-none fixed z-50 hidden md:block overflow-hidden rounded-2xl border border-ink/15 bg-[#0e0e11] shadow-[0_25px_60px_-12px_rgba(5,5,5,0.4)]"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${clamped.x}px, ${clamped.y}px, 0) scale(${isVisible && hoveredIndex !== null ? 1 : 0.94})`,
            opacity: isVisible && hoveredIndex !== null ? 1 : 0,
            transition: 'opacity 0.15s ease-out, transform 0.06s ease-out',
            width: `${PREVIEW_WIDTH}px`,
            height: `${PREVIEW_HEIGHT}px`,
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-150 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                zIndex: hoveredIndex === index ? 2 : 1,
                pointerEvents: 'none',
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-contain rounded-xl transition-transform duration-200 ease-out"
                style={{
                  transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.97)',
                }}
              />
            </div>
          ))}
          {/* Subtle top glare / inner border */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </div>

        {/* Project Showcase List */}
        <div className="space-y-0" onMouseLeave={handleMouseLeave}>
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              className="group block relative"
              onMouseEnter={(e) => handleRowMouseEnter(index, e)}
              onMouseMove={(e) => handleRowMouseMove(index, e)}
              onPointerEnter={(e) => handleRowMouseEnter(index, e)}
              onPointerMove={(e) => handleRowMouseMove(index, e)}
            >
              <div className="relative py-7 md:py-9 border-t border-ink/10 transition-all duration-300 ease-out">
                {/* Background highlight on hover - warm themed ink tint */}
                <div
                  className={`pointer-events-none absolute inset-0 -mx-4 px-4 bg-ink/[0.04] border border-ink/8 rounded-2xl transition-all duration-300 ease-out ${
                    hoveredIndex === index
                      ? 'opacity-100 scale-100 shadow-[0_8px_24px_-8px_rgba(5,5,5,0.04)]'
                      : 'opacity-0 scale-98'
                  }`}
                />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                  {/* Left Side: Number, Name & 1-Liner Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="font-outfit text-xs font-bold uppercase tracking-[0.2em]"
                        style={{ color: project.accent }}
                      >
                        [ {project.number} ]
                      </span>
                    </div>

                    {/* Title with animated underline */}
                    <div className="inline-flex items-center gap-3">
                      <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-[-0.02em] text-ink transition-transform duration-300 group-hover:translate-x-1">
                        <span className="relative">
                          {project.name}
                          {/* Animated underline */}
                          <span
                            className={`absolute left-0 -bottom-1 h-0.5 bg-ink transition-all duration-300 ease-out ${
                              hoveredIndex === index ? 'w-full' : 'w-0'
                            }`}
                          />
                        </span>
                      </h3>
                    </div>

                    {/* 1-Liner Positioning / Description */}
                    <p className="mt-2 font-serif-italic text-base sm:text-lg md:text-xl text-ink/75 transition-colors duration-300 group-hover:text-ink">
                      {project.tagline}
                    </p>

                    {/* Clean Tech Stack Tags Strip */}
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-ink/[0.04] border border-ink/8 px-2.5 sm:px-3 py-1 font-outfit text-xs sm:text-[13px] font-medium text-ink/70 transition-colors group-hover:bg-ink/[0.08] group-hover:text-ink"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: "View More" CTA with animated arrow button */}
                  <div className="shrink-0 flex items-center gap-2.5 pt-2 md:pt-0">
                    <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-ink/65 transition-colors duration-300 group-hover:text-ink">
                      View More
                    </span>
                    <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-ink/20 bg-bg shadow-sm transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bg group-hover:scale-105">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Bottom border for last item */}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}


