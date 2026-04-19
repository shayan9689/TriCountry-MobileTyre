import { motion, useReducedMotion } from "framer-motion";
import { coverageSection } from "../../data/content.js";
import { fadeUp, instantStaggerParent, instantVisible, staggerItem, staggerParent } from "../../lib/motion.js";

export function CoverageArea({ content = coverageSection }) {
  const reduceMotion = useReducedMotion();
  const headerVariants = reduceMotion ? instantVisible : fadeUp;
  const parentVariants = reduceMotion ? instantStaggerParent : staggerParent;
  const itemVariants = reduceMotion ? instantVisible : staggerItem;

  return (
    <section id="coverage" aria-labelledby="coverage-heading" className="bg-page py-12 sm:py-14">
      <div className="mx-auto w-full max-w-6xl sx-gutter">
        <motion.div
          className="mb-8 max-w-3xl space-y-3"
          variants={headerVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.4, margin: "0px 0px -8% 0px" }}
        >
          <h2
            id="coverage-heading"
            className="relative inline-block font-display text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl"
          >
            <span className="relative z-10">{content.title}</span>
            <span className="absolute -bottom-1 left-0 z-0 h-1.5 w-24 bg-brand-lemon" aria-hidden />
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-sm">{content.subtitle}</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2"
          variants={parentVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
        >
          {content.towns.map((town) => (
            <motion.span
              key={town}
              variants={itemVariants}
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-page-card/80 px-3 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wide text-white/90 sm:min-h-12 sm:px-4 sm:text-xs"
            >
              {town}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
