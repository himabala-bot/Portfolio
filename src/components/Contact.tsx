import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { contactLinks } from '@/data/content';
import { useMagnetic } from '@/hooks/useInteractions';

const iconMap = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-ink px-4 py-20 sm:py-24 md:px-8 md:py-32 text-bg"
    >
      <div className="mx-auto w-full max-w-6xl">

        <motion.h2
          style={{ y: titleY }}
          className="font-display text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] font-black leading-[0.84] tracking-[-0.04em]"
        >
          Let's make
          <br />
          <span className="font-serif-italic font-normal text-accent-pink">
            something.
          </span>
        </motion.h2>

        <p className="mt-6 sm:mt-8 max-w-md font-display text-base sm:text-lg leading-[1.6] text-bg/60">
          Got an idea, opportunity, or just want to say hi?
        </p>

        {/* Four magnetic icons */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
          {contactLinks.map((link) => (
            <ContactIcon key={link.type} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactIcon({
  link,
}: {
  link: (typeof contactLinks)[number];
}) {
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.4);
  const Icon = iconMap[link.type];
  const labelRef = useRef<HTMLSpanElement>(null);

  return (
    <a
      ref={magneticRef}
      href={link.href}
      target={link.type === 'email' || link.type === 'phone' ? undefined : '_blank'}
      rel="noreferrer"
      className="group relative flex flex-col items-center gap-3 sm:gap-4 py-4 sm:py-6 md:py-8"
      data-cursor="hover"
    >
      <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-bg/20 transition-colors duration-500 group-hover:border-bg/60 md:h-24 md:w-24">
        <Icon
          className="h-6 w-6 sm:h-7 sm:w-7 text-bg/70 transition-all duration-500 group-hover:text-bg group-hover:scale-110 md:h-8 md:w-8"
          strokeWidth={1.5}
        />
        <span className="absolute -right-1 -top-1 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-pink" strokeWidth={2} />
        </span>
      </div>
      <span
        ref={labelRef}
        className="font-display text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-bg/40 transition-colors duration-500 group-hover:text-bg"
      >
        {link.label}
      </span>
    </a>
  );
}
