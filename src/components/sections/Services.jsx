import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck, Wrench, Zap } from "lucide-react";
import { servicesSection } from "../../data/content.js";
import {
  cardHover,
  cardHoverSpring,
  fadeUp,
  instantStaggerParent,
  instantVisible,
  staggerItem,
  staggerParent,
} from "../../lib/motion.js";

const iconMap = {
  wrench: Wrench,
  zap: Zap,
  shield: ShieldCheck,
  map: MapPin,
};

const serviceIconTone = {
  emergency: "text-sky-950",
  puncture: "text-amber-950",
  locking: "text-emerald-950",
  home: "text-rose-950",
};

export function Services({ content = servicesSection }) {
  const reduceMotion = useReducedMotion();
  const headerVariants = reduceMotion ? instantVisible : fadeUp;
  const parentVariants = reduceMotion ? instantStaggerParent : staggerParent;
  const itemVariants = reduceMotion ? instantVisible : staggerItem;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-page py-8 sm:py-10"
    >
      <div className="mx-auto w-full max-w-6xl sx-gutter">
        <motion.div
          className="mb-10 max-w-xl"
          variants={headerVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.4, margin: "0px 0px -8% 0px" }}
        >
          <h2
            id="services-heading"
            className="relative inline-block font-display text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl"
          >
            <span className="relative z-10">{content.title}</span>
            <span
              className="absolute -bottom-1 left-0 z-0 h-1.5 w-24 max-w-[55%] bg-brand-lemon sm:w-28"
              aria-hidden
            />
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          variants={parentVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
        >
          {content.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.article
                key={item.key}
                variants={itemVariants}
                whileHover={reduceMotion ? undefined : cardHover}
                transition={cardHoverSpring}
                className="flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-page-elevated p-4 shadow-card-soft sm:p-5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-lemon to-brand-lemonHot text-page shadow-md ring-1 ring-amber-200/40">
                  {Icon ? (
                    <Icon
                      className={`h-5 w-5 ${serviceIconTone[item.key] ?? "text-neutral-950"}`}
                      aria-hidden
                      strokeWidth={2.25}
                    />
                  ) : null}
                </span>
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">{item.title}</h3>
                <p className="text-[0.8125rem] leading-relaxed text-white/60 sm:text-sm">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          variants={headerVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
        >
          <a
            href={content.viewAllHref}
            className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/90 transition-colors hover:text-brand-lemon"
            aria-label={content.viewAllLabel}
          >
            <span>{content.viewAllLabel}</span>
            <span aria-hidden className="text-lg">
              {content.viewAllSuffix}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
