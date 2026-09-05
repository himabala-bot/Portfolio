import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-0 md:min-h-screen flex-col justify-center px-4 py-12 sm:px-6 md:px-10 md:py-32 lg:px-14 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 font-outfit text-xs uppercase tracking-widest text-ink/40 md:text-sm">
            <span className="font-semibold">[ 01 ]</span>
            <span>Who is Hima?</span>
          </div>
          <h2 className="mt-2 font-display text-[10vw] font-black leading-[0.88] tracking-[-0.04em] text-ink md:text-[6vw]">
            About <span className="font-serif-italic font-normal text-accent-pink">me.</span>
          </h2>
        </motion.div>

        <div className="mx-auto w-full max-w-5xl py-4 sm:py-6">
          <ScrollReveal
            baseOpacity={0.12}
            enableBlur={true}
            baseRotation={0}
            blurStrength={8}
            containerClassName="w-full"
            textClassName="font-display text-[1.35rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.6rem] font-semibold leading-[1.65] md:leading-[1.55] tracking-[-0.02em] text-ink"
            rotationEnd="bottom 80%"
            wordAnimationEnd="bottom 70%"
          >
            A Computer Science Engineer currently working as a Product Designer, with skills across full-stack development and design . I enjoy combining technology and creativity to build digital products that are both useful and thoughtfully crafted.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
