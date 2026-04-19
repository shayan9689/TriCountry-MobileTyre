import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Navbar, StickyCallBar } from "./components/layout/index.js";
import {
  ContactFooter,
  CoverageArea,
  CoverageMarqueeBanner,
  EmergencyCTA,
  Gallery,
  Hero,
  HowItWorks,
  Reviews,
  Services,
  WhyChooseUs,
} from "./components/sections/index.js";

export default function App() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    scrollTop();
    const onPageShow = (e) => {
      if (e.persisted) scrollTop();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="root-shell"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative min-h-dvh bg-page"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 z-50 hidden w-full max-w-[390px] -translate-x-1/2 sm:block lg:hidden">
          <div className="container" aria-hidden />
        </div>

        <Navbar />
        <main className="pb-[max(5.5rem,calc(4.75rem+env(safe-area-inset-bottom,0px)))] lg:pb-0">
          <Hero />
          <CoverageMarqueeBanner />
          <WhyChooseUs />
          <Services />
          <HowItWorks />
          <Gallery />
          <Reviews />
          <CoverageArea />
          <EmergencyCTA />
          <ContactFooter />
        </main>
        <StickyCallBar />
      </motion.div>
    </AnimatePresence>
  );
}
