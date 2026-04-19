import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Facebook, Instagram, Twitter } from "lucide-react";
import { contact, footerSection, site } from "../../data/content.js";
import { instantStaggerParent, instantVisible, staggerItem, staggerParent } from "../../lib/motion.js";

const socialIconMap = {
  fb: Facebook,
  ig: Instagram,
  tw: Twitter,
};

const socialTone = {
  fb: "border-blue-500/40 bg-blue-500/10 text-blue-400 hover:border-blue-400/60 hover:bg-blue-500/15 hover:text-sky-200",
  ig: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/15 hover:text-fuchsia-200",
  tw: "border-slate-400/35 bg-slate-500/10 text-slate-200 hover:border-slate-300/50 hover:bg-slate-500/15 hover:text-white",
};

export function ContactFooter({ contentFooter = footerSection, contentSite = site, contentContact = contact }) {
  const reduceMotion = useReducedMotion();
  const parentVariants = reduceMotion ? instantStaggerParent : staggerParent;
  const itemVariants = reduceMotion ? instantVisible : staggerItem;

  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-page pb-[calc(10rem+env(safe-area-inset-bottom,0px))] pt-12 sm:pt-14 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-6xl sx-gutter">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]"
          variants={parentVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="font-display text-2xl font-extrabold uppercase leading-tight tracking-[0.1em] sm:text-3xl">
              <span className="block bg-gradient-to-br from-brand-lemon via-[#fff3a0] to-brand-lemonHot bg-clip-text text-transparent">
                {contentSite.logoMarkTitle}
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/70">{contentSite.tagline}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
              {contentFooter.quickLinksTitle}
            </h3>
            <ul className="space-y-2">
              {contentFooter.links.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    id={item.key === "privacy" ? "privacy" : undefined}
                    className="inline-flex min-h-12 items-center gap-2 rounded-lg py-2 text-sm font-semibold text-white/80 active:bg-white/5 sm:py-1.5 sm:hover:text-white"
                    aria-label={item.label}
                  >
                    <ChevronRight className="h-4 w-4 text-brand-lemon" aria-hidden />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
              {contentFooter.contactTitle}
            </h3>
            <div className="space-y-1 text-sm leading-relaxed text-white/70">
              <p className="font-semibold text-white/90">{contentContact.officeLabel}</p>
              {contentContact.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-white/45">{contentFooter.copyright}</p>
          <div className="mt-4 flex gap-3">
            {contentFooter.socials.map((item) => {
              const Icon = socialIconMap[item.key] ?? Facebook;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors active:scale-[0.98] sm:hover:scale-105 ${socialTone[item.key] ?? "border-white/10 bg-white/5 text-white/80 sm:hover:border-white/20 sm:hover:text-white"}`}
                >
                  <span className="sr-only">{item.label}</span>
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
