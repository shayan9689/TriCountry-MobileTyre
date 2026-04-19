import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-scroll";
import { Menu, Phone, X } from "lucide-react";
import { contact, nav, site } from "../../data/content.js";
import { scrollNavLinkProps } from "../../lib/scrollNavProps.js";
import { MobileNavOverlay } from "./MobileNavOverlay.jsx";

export function Navbar({ contentNav = nav, contentContact = contact, contentSite = site }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const closeIfDesktop = () => {
      if (mq.matches) setOpen(false);
    };
    closeIfDesktop();
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  const headerMotion = reduceMotion
    ? {}
    : {
        transition: { duration: 0.35, ease: "easeOut" },
      };

  const overlayPortal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {open ? (
              <MobileNavOverlay
                key="mobile-nav-overlay"
                onClose={() => setOpen(false)}
                reduceMotion={reduceMotion}
                contentNav={contentNav}
                contentSite={contentSite}
                contentContact={contentContact}
              />
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={`sticky top-0 z-40 isolate w-full pt-[env(safe-area-inset-top,0px)] text-white backdrop-blur-[14px] backdrop-saturate-150 transition-[background,box-shadow] duration-300 ease-out [-webkit-backdrop-filter:blur(14px)_saturate(1.5)] ${
          scrolled
            ? "bg-gradient-to-b from-[rgba(255,252,247,0.34)] to-[rgba(255,255,255,0.12)] shadow-[0_10px_32px_rgba(0,0,0,0.2)]"
            : "bg-gradient-to-b from-[rgba(255,252,247,0.22)] to-[rgba(255,255,255,0.07)]"
        }`}
      >
        <div className="relative flex w-full min-w-0 items-center gap-2 py-2.5 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:gap-3 sm:py-3">
          <a
            href="#hero"
            aria-label={contentNav.brandAria}
            className="inline-flex min-h-12 min-w-0 shrink-0 items-center rounded-lg py-1 pr-1"
          >
            <span className="min-w-0 leading-tight">
              <span className="block bg-gradient-to-br from-brand-lemon via-[#fff3a0] to-brand-lemonHot bg-clip-text font-display text-2xl font-extrabold uppercase tracking-[0.08em] text-transparent sm:text-3xl">
                {contentSite.logoMarkTitle}
              </span>
            </span>
          </a>

          <div className="hidden min-w-0 flex-1 justify-center px-2 lg:flex">
            <nav className="flex items-center gap-6 xl:gap-8" aria-label="Primary">
              {contentNav.links.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  {...scrollNavLinkProps(reduceMotion)}
                  href={`#${item.id}`}
                  activeClass="navbar-link-active"
                  className="cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/90 transition-colors hover:bg-white/[0.07] hover:text-brand-lemon"
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <motion.a
              href={`tel:${contentContact.phoneTel}`}
              aria-label={contentNav.callLabel}
              className="btn-brand-gradient inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold uppercase tracking-wide shadow-cta-glow sm:gap-2 sm:px-4 sm:text-sm"
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              {...headerMotion}
            >
              <Phone className="h-4 w-4 shrink-0 text-orange-950" aria-hidden strokeWidth={2.5} />
              <span>{contentNav.callLabel}</span>
            </motion.a>

            <button
              type="button"
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/25 bg-white/[0.12] text-white backdrop-blur-md lg:hidden"
              aria-label={open ? contentNav.menuCloseLabel : contentNav.menuOpenLabel}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="h-5 w-5 text-rose-300" aria-hidden />
              ) : (
                <Menu className="h-5 w-5 text-cyan-300" aria-hidden strokeWidth={2.25} />
              )}
            </button>
          </div>
        </div>
      </header>
      {overlayPortal}
    </>
  );
}
