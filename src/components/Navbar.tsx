import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'MY STACK', href: '#stack' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShrunk(v > 60));

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4"
      initial={false}
      animate={{
        paddingTop: shrunk ? 12 : 28,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className="flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500"
        animate={{
          backgroundColor: shrunk ? 'rgba(245,241,232,0.7)' : 'rgba(245,241,232,0)',
          backdropFilter: shrunk ? 'blur(16px)' : 'blur(0px)',
          boxShadow: shrunk
            ? '0 1px 24px rgba(5,5,5,0.06), inset 0 0 0 1px rgba(5,5,5,0.06)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          to="/"
          className="font-display text-[13px] font-bold tracking-tight text-ink"
          aria-label="HIMABALA home"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-pink" />
            H·B
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative font-display text-[11px] font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-ink px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-bg transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">Let's Talk</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </motion.nav>
    </motion.header>
  );
}
