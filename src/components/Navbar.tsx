import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'MY STACK', href: '/#stack' },
  { label: 'EXPERIENCE', href: '/#experience' },
  { label: 'PROJECTS', href: '/#projects' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (v) => setShrunk(v > 60));

  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-3 sm:px-4"
        initial={false}
        animate={{
          paddingTop: shrunk ? 10 : 20,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.nav
          className="flex w-full max-w-6xl items-center justify-between rounded-full px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-500"
          animate={{
            backgroundColor: shrunk ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.55)',
            backdropFilter: shrunk ? 'blur(16px)' : 'blur(8px)',
            boxShadow: shrunk
              ? '0 4px 24px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.06)'
              : '0 1px 12px rgba(0,0,0,0.03), inset 0 0 0 1px rgba(0,0,0,0.04)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          
          <Link
            to="/"
            className="font-display text-[13px] sm:text-[14px] font-bold tracking-tight text-ink py-1"
            aria-label="HIMABALA home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-pink" />
              H·B
            </span>
          </Link>

          
          <ul className="hidden items-center gap-6 lg:gap-8 md:flex">
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

          
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/#contact"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-ink px-3.5 sm:px-4 py-1.5 sm:py-2 font-display text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-bg transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">Let's Talk</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-bg/80 text-ink md:hidden transition-colors hover:bg-ink/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-[99] mx-3 rounded-2xl border border-ink/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-ink/5 py-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink/80 transition-colors hover:text-accent-pink"
                >
                  <span>{item.label}</span>
                  <span className="font-outfit text-xs text-ink/30">0{idx + 1}</span>
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink py-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-white"
              >
                Let's Talk ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
