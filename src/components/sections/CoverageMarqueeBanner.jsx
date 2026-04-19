import { useReducedMotion } from "framer-motion";
import { coverageMarquee } from "../../data/content.js";

function MarqueeStrip({ items, separator, stripKey }) {
  return (
    <div className="flex shrink-0 items-center gap-x-10 sm:gap-x-14 md:gap-x-16">
      {items.map((text, i) => (
        <span key={`${stripKey}-${i}`} className="flex shrink-0 items-center gap-x-4 sm:gap-x-5 md:gap-x-6">
          <span className="whitespace-nowrap font-display text-[clamp(1.35rem,4.2vw,2.85rem)] uppercase leading-none tracking-[0.06em] text-white">
            {text}
          </span>
          <span className="select-none font-display text-2xl text-brand-lemon/75 sm:text-3xl md:text-4xl" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
      {/* Breathing room before the duplicated strip loops — reads as a gap between cycles */}
      <span className="inline-block w-10 shrink-0 sm:w-14 md:w-20" aria-hidden />
    </div>
  );
}

export function CoverageMarqueeBanner({ content = coverageMarquee }) {
  const reduceMotion = useReducedMotion();
  const { items, separator, regionAria } = content;

  if (reduceMotion) {
    return (
      <section
        id="coverage-check"
        aria-label={regionAria}
        className="border-y border-white/10 bg-page-card/70 py-6 sm:py-8"
      >
        <div className="sx-gutter mx-auto max-w-6xl text-center">
          <p className="font-display text-xl uppercase leading-snug tracking-[0.06em] text-white/95 sm:text-2xl md:text-3xl">
            {items.join(` ${separator} `)}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="coverage-check"
      aria-label={regionAria}
      className="border-y border-white/10 bg-page-card/70 py-6 sm:py-8"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-page to-transparent sm:w-24" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-page to-transparent sm:w-24" aria-hidden />
        <div className="marquee-track">
          <MarqueeStrip stripKey="a" items={items} separator={separator} />
          <div aria-hidden>
            <MarqueeStrip stripKey="b" items={items} separator={separator} />
          </div>
        </div>
      </div>
    </section>
  );
}
