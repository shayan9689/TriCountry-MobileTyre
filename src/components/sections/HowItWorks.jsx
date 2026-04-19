import { motion, useReducedMotion } from "framer-motion";
import { howItWorksSection } from "../../data/content.js";
import { fadeUp, instantStaggerParent, instantVisible, staggerItem, staggerParent } from "../../lib/motion.js";

export function HowItWorks({ content = howItWorksSection }) {
  const reduceMotion = useReducedMotion();
  const shellVariants = reduceMotion ? instantVisible : fadeUp;
  const listParentVariants = reduceMotion ? instantStaggerParent : staggerParent;
  const listItemVariants = reduceMotion ? instantVisible : staggerItem;

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="bg-page py-12 sm:py-14">
      <div className="mx-auto w-full max-w-6xl sx-gutter">
        <motion.div
          className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-page-card/90 p-5 shadow-card-soft sm:p-6 md:p-8"
          variants={shellVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.35, margin: "0px 0px -8% 0px" }}
        >
          <h2
            id="how-heading"
            className="mb-8 text-center font-display text-2xl uppercase tracking-[0.12em] text-white sm:text-3xl"
          >
            {content.title}
          </h2>

          <motion.ol
            className="relative space-y-8"
            variants={listParentVariants}
            initial="hidden"
            whileInView={reduceMotion ? undefined : "visible"}
            animate={reduceMotion ? "visible" : undefined}
            viewport={{ once: false, amount: 0.35, margin: "0px 0px -8% 0px" }}
          >
            {content.steps.map((step, index) => (
              <motion.li key={step.key} variants={listItemVariants} className="relative flex gap-4">
                {index < content.steps.length - 1 ? (
                  <span
                    className="absolute left-[19px] top-12 h-[calc(100%+0.5rem)] w-px bg-white/15"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-lemon text-sm font-black text-neutral-900">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/65">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
