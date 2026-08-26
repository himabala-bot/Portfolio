import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink px-4 py-12 text-bg md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-bg/10 pt-8 md:flex-row">
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-tight"
          >
            HIMA BALA<span className="text-accent-pink">.</span>
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/himabala-bandaru-176508281/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="font-display text-[11px] font-medium uppercase tracking-[0.2em] text-bg/50 transition-colors hover:text-bg"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/himabala-bot"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="font-display text-[11px] font-medium uppercase tracking-[0.2em] text-bg/50 transition-colors hover:text-bg"
            >
              GitHub
            </a>
            <a
              href="mailto:himabalabandaru@gmail.com"
              aria-label="Email"
              className="font-display text-[11px] font-medium uppercase tracking-[0.2em] text-bg/50 transition-colors hover:text-bg"
            >
              Email
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/himabala-bandaru-176508281/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-bg/40 transition-colors hover:text-bg"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href="https://github.com/himabala-bot"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-bg/40 transition-colors hover:text-bg"
            >
              <Github className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href="mailto:himabalabandaru@gmail.com"
              aria-label="Email"
              className="text-bg/40 transition-colors hover:text-bg"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 md:flex-row">
          <p className="font-display text-[10px] uppercase tracking-[0.2em] text-bg/30">
            © 2026 Hima Bala. From Pixels to Products.
          </p>
          <p className="font-display text-[10px] uppercase tracking-[0.2em] text-bg/30">
            Designed & Built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
