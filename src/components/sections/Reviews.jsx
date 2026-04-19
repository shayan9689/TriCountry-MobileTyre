import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { a11y, reviewsSection, stats, trustBadges } from "../../data/content.js";
import { useCountUp } from "../../hooks/useCountUp.js";
import {
  cardHover,
  cardHoverSpring,
  fadeUp,
  instantStaggerParent,
  instantVisible,
  staggerItem,
  staggerParent,
} from "../../lib/motion.js";

function Avatar({ initials, hue }) {
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-extrabold uppercase text-white shadow-inner ring-2 ring-white/10"
      style={{ backgroundColor: `hsl(${hue} 42% 36%)` }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function Reviews({
  content = reviewsSection,
  contentStats = stats,
  contentA11y = a11y,
  contentTrust = trustBadges,
}) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const animated = useCountUp(contentStats.ratingCountTarget, {
    active: inView && !reduceMotion,
    durationMs: 900,
  });
  const ratingValue = reduceMotion && inView ? contentStats.ratingCountTarget : animated;
  const ratingText = useMemo(
    () => (ratingValue / contentStats.ratingScale).toFixed(1),
    [ratingValue, contentStats],
  );

  const headerVariants = reduceMotion ? instantVisible : fadeUp;
  const listParentVariants = reduceMotion ? instantStaggerParent : staggerParent;
  const listItemVariants = reduceMotion ? instantVisible : staggerItem;

  return (
    <section
      id="reviews"
      ref={sectionRef}
      aria-labelledby="reviews-heading"
      className="bg-page py-12 sm:py-14"
    >
      <div className="mx-auto w-full max-w-6xl sx-gutter">
        <motion.div
          className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4"
          variants={headerVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.4, margin: "0px 0px -8% 0px" }}
        >
          <h2
            id="reviews-heading"
            className="relative inline-block font-display text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl"
          >
            <span className="relative z-10">{content.title}</span>
            <span
              className="absolute -bottom-1 left-0 z-0 h-1.5 w-[min(100%,7rem)] bg-brand-lemon"
              aria-hidden
            />
          </h2>
          <div className="flex items-center gap-2 pb-0 sm:pb-1">
            <span className="font-mono text-xl font-semibold text-white sm:text-2xl" aria-live="polite">
              {ratingText}
              {content.ratingSuffix}
            </span>
            <Star className="h-6 w-6 text-brand-lemon sm:h-7 sm:w-7" aria-label={contentA11y.starRating} />
          </div>
        </motion.div>

        <motion.div
          className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 pe-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:pb-0 lg:pe-0 [&::-webkit-scrollbar]:hidden"
          variants={listParentVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
          aria-label={contentA11y.carousel}
        >
          {content.items.map((item) => (
            <motion.article
              key={item.key}
              variants={listItemVariants}
              whileHover={reduceMotion ? undefined : cardHover}
              transition={cardHoverSpring}
              className="min-w-[min(19rem,calc(100vw-2.5rem))] max-w-[22rem] snap-center rounded-xl border border-brand-lemon/25 bg-page-elevated p-4 shadow-card-soft sm:min-w-[20rem] sm:p-5 lg:min-w-0 lg:max-w-none"
            >
              <div className="mb-4 flex gap-3">
                <Avatar initials={item.initials} hue={item.avatarHue} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-extrabold text-white">{item.name}</p>
                    <p className="shrink-0 text-xs font-medium text-white/45">{item.relativeTime}</p>
                  </div>
                  <div
                    className="mt-1.5 flex items-center gap-0.5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]"
                    aria-label={contentA11y.starRating}
                  >
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={`${item.key}-star-${i}`} className="h-3.5 w-3.5 fill-current" aria-hidden />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm italic leading-relaxed text-white/85">{item.quote}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          variants={headerVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
        >
          {contentTrust.items.map((badge) => (
            <span
              key={badge.key}
              className="inline-flex min-h-11 items-center rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white/55"
            >
              {badge.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
