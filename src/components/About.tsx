import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Token {
  text: string;
  isPill?: boolean;
  pillColor?: 'blue' | 'pink' | 'indigo' | 'orange';
}

const tokens: Token[] = [
  // Sentence 1
  { text: 'A' },
  { text: 'Computer Science Engineer', isPill: true, pillColor: 'blue' },
  { text: 'currently' },
  { text: 'working' },
  { text: 'as' },
  { text: 'a' },
  { text: 'Product Designer,', isPill: true, pillColor: 'pink' },
  { text: 'with' },
  { text: 'skills' },
  { text: 'across' },
  { text: 'full-stack development', isPill: true, pillColor: 'indigo' },
  { text: 'and' },
  { text: 'design .', isPill: true, pillColor: 'orange' },

  // Sentence 2
  { text: 'I' },
  { text: 'enjoy' },
  { text: 'combining' },
  { text: 'technology', isPill: true, pillColor: 'pink' },
  { text: 'and' },
  { text: 'creativity', isPill: true, pillColor: 'blue' },
  { text: 'to' },
  { text: 'build' },
  { text: 'digital products', isPill: true, pillColor: 'indigo' },
  { text: 'that' },
  { text: 'are' },
  { text: 'both' },
  { text: 'useful', isPill: true, pillColor: 'orange' },
  { text: 'and' },
  { text: 'thoughtfully crafted.', isPill: true, pillColor: 'pink' },
];

const pillStyles: Record<string, string> = {
  blue: 'border-accent-blue/35 bg-accent-blue/15 text-accent-blue',
  pink: 'border-accent-pink/35 bg-accent-pink/15 text-accent-pink',
  indigo: 'border-accent-indigo/35 bg-accent-indigo/15 text-accent-indigo',
  orange: 'border-accent-orange/35 bg-accent-orange/15 text-accent-orange',
};

function ScrollToken({
  token,
  index,
  total,
  progress,
}: {
  token: Token;
  index: number;
  total: number;
  progress: any;
}) {
  const start = (index / total) * 0.7;
  const end = Math.min(1, start + 0.08);
  const opacity = useTransform(progress, [start, end], [0.25, 1]);

  if (token.isPill && token.pillColor) {
    return (
      <span className="inline-block mx-1 sm:mx-1.5 my-1 align-baseline">
        <motion.span
          style={{ opacity }}
          className={`inline-flex items-center rounded-full border px-3 sm:px-4 py-0.5 sm:py-1 font-display font-bold shadow-sm transition-opacity duration-150 ${
            pillStyles[token.pillColor]
          }`}
        >
          {token.text}
        </motion.span>
      </span>
    );
  }

  return (
    <span className="inline-block mr-[0.28em] last:mr-0 align-baseline">
      <motion.span
        style={{ opacity }}
        className="inline-block font-display font-medium text-ink transition-opacity duration-150"
      >
        {token.text}
      </motion.span>
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textContainerRef,
    offset: ['start 85%', 'center 35%'],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-[90svh] flex-col justify-center px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-10 font-display text-[10vw] font-black leading-[0.88] tracking-[-0.04em] text-ink md:text-[6vw]"
        >
          About <span className="font-serif-italic font-normal text-accent-pink">me.</span>
        </motion.h2>

        <div ref={textContainerRef} className="mx-auto w-full max-w-4xl py-6">
          <p className="font-display text-[4.8vw] font-medium leading-[1.7] tracking-[-0.01em] text-center text-balance mx-auto md:text-[2.8vw] md:leading-[1.68] lg:text-[2.1vw] lg:leading-[1.62]">
            {tokens.map((token, i) => (
              <ScrollToken
                key={i}
                token={token}
                index={i}
                total={tokens.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

