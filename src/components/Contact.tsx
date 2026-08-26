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
      className="relative overflow-hidden bg-ink px-4 py-32 text-bg md:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">

        <motion.h2
          style={{ y: titleY }}
          className="font-display text-[16vw] font-black leading-[0.82] tracking-[-0.05em] md:text-[11vw]"
        >
          Let's make
          <br />
          <span className="font-serif-italic font-normal text-accent-pink">
            something.
          </span>
        </motion.h2>

        <p className="mt-10 max-w-md font-display text-lg leading-[1.6] text-bg/60">
          Got an idea, opportunity, or just want to say hi?
        </p>

        {/* Four large magnetic icons */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
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
      className="group relative flex flex-col items-center gap-4 py-8"
      data-cursor="hover"
    >
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-bg/20 transition-colors duration-500 group-hover:border-bg/60 md:h-24 md:w-24">
        <Icon
          className="h-7 w-7 text-bg/70 transition-all duration-500 group-hover:text-bg group-hover:scale-110 md:h-8 md:w-8"
          strokeWidth={1.5}
        />
        <span className="absolute -right-1 -top-1 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-accent-pink" strokeWidth={2} />
        </span>
      </div>
      <span
        ref={labelRef}
        className="font-display text-[11px] font-medium uppercase tracking-[0.25em] text-bg/40 transition-colors duration-500 group-hover:text-bg"
      >
        {link.label}
      </span>
    </a>
  );
}
