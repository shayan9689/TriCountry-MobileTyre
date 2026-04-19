import { motion } from "framer-motion";
import { Link } from "react-scroll";
import {
  Clock,
  HelpCircle,
  Images,
  LayoutGrid,
  MapPin,
  Phone,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { WhatsAppIcon } from "../icons/WhatsAppIcon.jsx";
import { a11y, contact, mobileNavOverlay, nav, site } from "../../data/content.js";
import { scrollNavLinkProps } from "../../lib/scrollNavProps.js";

const iconMap = {
  wrench: Wrench,
  help: HelpCircle,
  images: Images,
  star: Star,
  map: MapPin,
  clock: Clock,
};

const navIconTone = {
  wrench: "text-sky-400 group-hover:text-sky-300",
  help: "text-violet-400 group-hover:text-violet-300",
  images: "text-fuchsia-400 group-hover:text-fuchsia-300",
  star: "text-amber-400 group-hover:text-amber-300",
  map: "text-emerald-400 group-hover:text-emerald-300",
  clock: "text-orange-400 group-hover:text-orange-300",
};

export function MobileNavOverlay({
  onClose,
  reduceMotion,
  contentNav = nav,
  contentSite = site,
  contentContact = contact,
  contentOverlay = mobileNavOverlay,
  contentA11y = a11y,
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={contentNav.overlayAria}
      className="page lg:hidden"
      initial={reduceMotion ? false : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
      transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
    >
      <header className="shrink-0 border-b border-white/10 bg-page pt-[env(safe-area-inset-top,0px)] text-white">
        <div className="flex w-full min-w-0 items-center justify-between gap-2 py-3 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))]">
          <a
            href="#hero"
            className="flex min-h-12 min-w-0 shrink-0 items-center rounded-lg py-1 pr-2"
            aria-label={contentNav.brandAria}
            onClick={() => onClose()}
          >
            <span className="min-w-0 leading-tight">
              <span className="block bg-gradient-to-br from-brand-lemon via-[#fff3a0] to-brand-lemonHot bg-clip-text font-display text-2xl font-extrabold uppercase tracking-[0.06em] text-transparent sm:text-3xl">
                {contentSite.logoMarkTitle}
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${contentContact.phoneTel}`}
              aria-label={contentNav.callLabel}
              className="btn-brand-gradient inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold uppercase tracking-wide shadow-md"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden strokeWidth={2.5} />
              <span>{contentNav.callLabel}</span>
            </a>
            <button
              type="button"
              onClick={() => onClose()}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
              aria-label={contentNav.menuCloseLabel}
            >
              <X className="h-5 w-5" aria-hidden strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain">
        <div className="sx-gutter flex items-center justify-between gap-3 pt-6">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/45">
            {contentOverlay.sectionLabel}
          </p>
          <LayoutGrid className="h-4 w-4 text-cyan-400/70" aria-hidden strokeWidth={1.75} />
        </div>

        <nav className="mt-2 flex flex-col sx-gutter pb-4" aria-label={contentNav.overlayAria}>
          {contentOverlay.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <Link
                key={item.scrollTo}
                to={item.scrollTo}
                {...scrollNavLinkProps(reduceMotion, { onClick: () => onClose() })}
                href={`#${item.scrollTo}`}
                className="group flex min-h-[3.5rem] cursor-pointer items-center gap-4 border-b border-white/[0.08] py-4"
                aria-label={item.label}
              >
                <span className="w-8 shrink-0 font-mono text-sm font-bold text-brand-lemon">{item.index}</span>
                <span className="min-w-0 flex-1 font-display text-xl uppercase tracking-[0.04em] text-white sm:text-2xl">
                  {item.label}
                </span>
                {Icon ? (
                  <Icon
                    className={`h-6 w-6 shrink-0 transition-colors ${navIconTone[item.icon] ?? "text-brand-lemon/70 group-hover:text-brand-lemon"}`}
                    aria-hidden
                    strokeWidth={1.5}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-6 border-t border-white/[0.08] sx-gutter pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pt-8">
          <p className="text-center text-[0.65rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/45">
            {contentOverlay.serviceAreas.join(", ")}
          </p>

          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.65)]" aria-hidden />
            <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/55">
              {contentOverlay.emergencyLine}
            </p>
          </div>

          <a
            href={`tel:${contentContact.phoneTel}`}
            aria-label={`${contentOverlay.technicianDirect} ${contentContact.phoneDisplay}`}
            className="btn-brand-gradient flex min-h-[3.75rem] w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 shadow-lg"
          >
            <div className="min-w-0 text-left">
              <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-neutral-800">
                {contentOverlay.technicianDirect}
              </p>
              <p className="truncate font-mono text-lg font-black tracking-tight sm:text-xl">
                {contentContact.phoneDisplay}
              </p>
            </div>
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/10">
              <Phone className="h-6 w-6 text-neutral-950" aria-hidden strokeWidth={2.25} />
            </span>
          </a>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <a
              href={contentContact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={contentA11y.whatsAppChat}
              className="inline-flex min-h-14 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl border border-cyan-400/35 bg-page-elevated px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-md sm:max-w-[12.5rem] sm:justify-start"
            >
              <WhatsAppIcon className="h-6 w-6 shrink-0 text-[#25D366]" />
              <span>{contentOverlay.whatsappCta}</span>
            </a>
            <div className="text-right sm:pb-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                {contentOverlay.averageResponseLabel}
              </p>
              <p className="text-base font-extrabold uppercase tracking-wide text-brand-lemon sm:text-lg">
                {contentOverlay.averageResponseValue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
