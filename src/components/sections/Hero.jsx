import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-scroll";
import { Clock, Phone } from "lucide-react";
import { WhatsAppIcon } from "../icons/WhatsAppIcon.jsx";
import { a11y, contact, hero } from "../../data/content.js";
import { buttonHover, buttonTap, instantStaggerParent, instantVisible, staggerItem, staggerParent } from "../../lib/motion.js";
import { scrollNavLinkProps } from "../../lib/scrollNavProps.js";

function HeroBackdrop({ src, scale = 0.9, reduceMotion }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;

  const clamped = Math.min(1.15, Math.max(0.5, scale));
  const blurClass = reduceMotion ? "" : "blur-[2px] sm:blur-[3px]";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src={src}
        alt=""
        decoding="async"
        fetchPriority="high"
        onError={() => setFailed(true)}
        className={`absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full object-cover object-center ${blurClass}`}
        style={{ transform: `translate(-50%, -50%) scale(${clamped})` }}
      />
    </div>
  );
}

export function Hero({ contentHero = hero, contentContact = contact, contentA11y = a11y }) {
  const reduceMotion = useReducedMotion();
  const scrollParentVariants = reduceMotion ? instantStaggerParent : staggerParent;
  const scrollChildVariants = reduceMotion ? instantVisible : staggerItem;
  const heroViewport = { once: false, amount: 0.2, margin: "0px 0px -10% 0px" };

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-page pb-10 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:pb-14"
    >
      <HeroBackdrop
        src={contentHero.landingImage}
        scale={contentHero.landingImageScale}
        reduceMotion={reduceMotion}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-page/65 via-page/58 to-page/82"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,229,69,0.08),transparent_50%)]" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 sx-gutter"
        variants={scrollParentVariants}
        initial="hidden"
        whileInView={reduceMotion ? undefined : "visible"}
        animate={reduceMotion ? "visible" : undefined}
        viewport={heroViewport}
      >
        <motion.div
          variants={scrollChildVariants}
          className="flex w-full shrink-0 justify-center pt-1 sm:pt-2"
        >
          <div
            className="inline-flex max-w-[min(100%,34rem)] items-center justify-center gap-2 rounded-full border border-white/18 bg-page/30 px-3 py-1.5 text-center shadow-[0_6px_28px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-red-500/25 backdrop-blur-xl supports-[backdrop-filter]:bg-page/[0.22] sm:gap-2.5 sm:px-4 sm:py-2"
            role="status"
          >
            <Clock
              className="h-3.5 w-3.5 shrink-0 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.45)] sm:h-4 sm:w-4"
              aria-hidden
              strokeWidth={2}
            />
            <p
              className={`text-center text-[0.62rem] font-extrabold uppercase leading-tight tracking-[0.06em] sm:text-[0.68rem] ${
                reduceMotion ? "text-red-400" : "hero-emergency-blink"
              }`}
            >
              {contentHero.statusLeft}
            </p>
          </div>
        </motion.div>

        <motion.div variants={scrollChildVariants} className="max-w-3xl space-y-4 text-center">
          <h1 className="font-display text-[clamp(2.65rem,12vw,4.75rem)] leading-[0.92] tracking-[0.02em] text-brand-lemon">
            {contentHero.title}
          </h1>
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/80 sm:text-base">{contentHero.description}</p>
        </motion.div>

        <motion.a
          href={`tel:${contentContact.phoneTel}`}
          aria-label={`${contentHero.primaryCtaLeft}, ${contentHero.primaryCtaRight}`}
          variants={scrollChildVariants}
          className="btn-brand-gradient mx-auto flex min-h-[3.25rem] w-full max-w-xl items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-center shadow-cta-glow sm:min-h-14 sm:gap-2.5 sm:px-5"
          whileHover={reduceMotion ? undefined : buttonHover}
          whileTap={reduceMotion ? undefined : buttonTap}
        >
          <Phone className="h-5 w-5 shrink-0 text-orange-950" aria-hidden strokeWidth={2.5} />
          <span className="text-sm font-extrabold uppercase tracking-wide sm:text-base">{contentHero.primaryCtaLeft}</span>
        </motion.a>

        <motion.a
          href={contentContact.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          variants={scrollChildVariants}
          aria-label={contentA11y.whatsAppChat}
          className="mx-auto flex min-h-14 w-full max-w-xl items-center justify-center gap-2 rounded-2xl border border-[#25D366]/45 bg-gradient-to-br from-[#063b26] via-[#0d6b47] to-[#128C7E] px-3 py-3 text-center text-xs font-extrabold uppercase leading-tight tracking-wide text-white shadow-[0_12px_36px_-10px_rgba(37,211,102,0.4)] ring-1 ring-inset ring-white/10 sm:text-sm"
          whileHover={reduceMotion ? undefined : buttonHover}
          whileTap={reduceMotion ? undefined : buttonTap}
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#b9f7cf] drop-shadow-[0_0_12px_rgba(37,211,102,0.55)]" />
          <span>{contentHero.whatsappCta}</span>
        </motion.a>

        <motion.div variants={scrollChildVariants} className="w-full max-w-xl">
          <Link
            to="coverage-check"
            {...scrollNavLinkProps(reduceMotion)}
            href="#coverage-check"
            aria-label={contentA11y.checkCoverageScroll}
            className="mx-auto flex min-h-14 w-full max-w-xl cursor-pointer items-center justify-center rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-white/[0.08] via-cyan-500/[0.12] to-page-elevated/90 px-4 py-3.5 text-center font-display text-lg uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[border-color,box-shadow,color,background-image] duration-200 hover:border-brand-lemon/45 hover:bg-gradient-to-br hover:from-brand-lemon/15 hover:via-cyan-400/10 hover:to-page-elevated/95 hover:text-brand-lemon hover:shadow-[0_0_28px_-8px_rgba(255,229,69,0.22)] active:bg-white/[0.06] sm:text-xl"
          >
            {contentHero.checkCoverageCta}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
