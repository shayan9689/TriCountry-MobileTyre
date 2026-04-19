import { motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { trustBar } from "../../data/content.js";
import {
  cardHoverSpring,
  instantStaggerParent,
  instantVisible,
  staggerItem,
  staggerParent,
} from "../../lib/motion.js";

const iconMap = {
  rac: ShieldCheck,
  hours: Clock,
  radius: MapPin,
};

const trustIconShell = {
  rac: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25",
  hours: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25",
  radius: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/25",
};

export function WhyChooseUs({ contentTrust = trustBar }) {
  const reduceMotion = useReducedMotion();
  const parentVariants = reduceMotion ? instantStaggerParent : staggerParent;
  const itemVariants = reduceMotion ? instantVisible : staggerItem;

  return (
    <section aria-labelledby="trust-heading" className="bg-page py-6 sm:py-8">
      <div className="mx-auto w-full max-w-6xl sx-gutter">
        <h2 id="trust-heading" className="sr-only">
          {contentTrust.items.map((i) => i.label).join(", ")}
        </h2>
        <motion.div
          className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-page-card/90 px-3 py-4 sm:grid-cols-3 sm:px-4"
          variants={parentVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.35, margin: "0px 0px -8% 0px" }}
        >
          {contentTrust.items.map((item) => {
            const Icon = iconMap[item.key];
            return (
              <motion.div
                key={item.key}
                variants={itemVariants}
                className="flex min-h-12 items-center gap-3"
                whileHover={reduceMotion ? undefined : { scale: 1.02, y: -4 }}
                transition={cardHoverSpring}
              >
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${trustIconShell[item.key] ?? "bg-white/10 text-brand-lemon"}`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-[0.7rem] font-extrabold uppercase leading-snug tracking-wide text-white/90 sm:text-xs">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
