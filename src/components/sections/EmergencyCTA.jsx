import { motion, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";
import { contact, emergencySection } from "../../data/content.js";
import { buttonHover, buttonTap, fadeUp, instantVisible } from "../../lib/motion.js";

export function EmergencyCTA({ content = emergencySection, contentContact = contact }) {
  const reduceMotion = useReducedMotion();
  const shellVariants = reduceMotion ? instantVisible : fadeUp;

  return (
    <section aria-labelledby="urgent-heading" className="bg-page py-12 sm:py-14">
      <div className="mx-auto w-full max-w-6xl sx-gutter">
        <motion.div
          variants={shellVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.4, margin: "0px 0px -8% 0px" }}
          className="relative overflow-hidden rounded-3xl border border-brand-lemon/30 bg-gradient-to-br from-brand-lemon to-brand-lemonHot p-6 text-center shadow-cta-glow sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)]" />
          <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-4">
            <span
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-600/35 via-amber-400/25 to-cyan-500/30 text-neutral-950 ring-2 ring-orange-500/40 shadow-inner"
              aria-label={content.iconAria}
            >
              <Zap className="h-7 w-7 text-orange-950 drop-shadow-[0_2px_6px_rgba(251,146,60,0.55)]" aria-hidden />
            </span>
            <h2
              id="urgent-heading"
              className="font-display text-3xl uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl"
            >
              {content.title}
            </h2>
            <p className="text-xs font-extrabold uppercase leading-snug tracking-wide text-neutral-900/90 sm:text-sm">
              {content.subtitle}
            </p>
            <motion.a
              href={`tel:${contentContact.phoneTel}`}
              aria-label={content.buttonLabel}
              className="mt-2 inline-flex min-h-14 w-full max-w-md items-center justify-center rounded-2xl bg-neutral-950 px-5 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-card-soft sm:px-6"
              whileHover={reduceMotion ? undefined : buttonHover}
              whileTap={reduceMotion ? undefined : buttonTap}
            >
              {content.buttonLabel}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
