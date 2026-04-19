import { useLayoutEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import { contact, stickyBar } from "../../data/content.js";

export function StickyCallBar({ contentSticky = stickyBar, contentContact = contact }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [heroBottomPx, setHeroBottomPx] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      const el = document.getElementById("hero");
      if (!el) return;
      setHeroBottomPx(el.offsetTop + el.offsetHeight);
    };

    update();
    window.addEventListener("resize", update);

    const el = document.getElementById("hero");
    const ro = el ? new ResizeObserver(update) : null;
    if (el && ro) ro.observe(el);

    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, []);

  const y = useTransform(scrollY, (latest) => {
    const b = heroBottomPx;
    if (!b) return reduceMotion ? 0 : 100;
    const t0 = b + 220;
    const t1 = b + 300;
    if (reduceMotion) return latest > t1 ? 0 : 100;
    if (latest <= t0) return 100;
    if (latest >= t1) return 0;
    return 100 - ((latest - t0) / (t1 - t0)) * 100;
  });

  const opacity = useTransform(scrollY, (latest) => {
    const b = heroBottomPx;
    if (!b) return 0;
    const t0 = b + 200;
    const t1 = b + 300;
    if (reduceMotion) return latest > t1 ? 1 : 0;
    if (latest <= t0) return 0;
    if (latest >= t1) return 1;
    return (latest - t0) / (t1 - t0);
  });

  return (
    <motion.div
      style={{ y, opacity }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] px-[max(0.25rem,env(safe-area-inset-left,0px))] pr-[max(0.25rem,env(safe-area-inset-right,0px))] pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] lg:hidden"
    >
      <a
        href={`tel:${contentContact.phoneTel}`}
        aria-label={`${contentSticky.tapLine1} ${contentSticky.tapLine2}`}
        className="btn-brand-gradient pointer-events-auto flex min-h-[3.75rem] w-full items-center gap-3 rounded-t-2xl px-4 py-3.5 shadow-cta-glow sm:min-h-16 sm:px-5 sm:py-4"
      >
        <Phone className="h-7 w-7 shrink-0 text-orange-950 sm:h-8 sm:w-8" aria-hidden strokeWidth={2.5} />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-neutral-900 sm:text-xs">
            {contentSticky.tapLine1}
          </p>
          <p className="truncate font-mono text-base font-black sm:text-lg">{contentSticky.tapLine2}</p>
        </div>
      </a>
    </motion.div>
  );
}
