import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import { gallerySection } from "../../data/content.js";
import { loadGooglePlaceGalleryPhotos } from "../../lib/googlePlaceGallery.js";
import { fadeUp, instantVisible } from "../../lib/motion.js";

const CARD_W = 288;
const CARD_H = 384;

function normalizeOffset(index, active, n) {
  let o = index - active;
  const half = n / 2;
  if (o > half) o -= n;
  if (o < -half) o += n;
  return o;
}

function cardMotion(offset) {
  const abs = Math.abs(offset);
  const scale = abs === 0 ? 1 : abs === 1 ? 0.86 : abs === 2 ? 0.74 : 0.62;
  const opacity = abs > 3 ? 0.28 : abs === 0 ? 1 : 0.42 + (3 - Math.min(abs, 3)) * 0.12;
  const zIndex = 20 - abs;
  return { scale, opacity, zIndex, abs };
}

export function Gallery({ content = gallerySection }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(200);
  const trackRef = useRef(null);
  const wasInViewRef = useRef(false);
  const [introKey, setIntroKey] = useState(0);
  const [googleGallery, setGoogleGallery] = useState(null);

  const carouselInView = useInView(trackRef, {
    amount: 0.28,
    once: false,
    margin: "0px 0px -6% 0px",
  });

  useEffect(() => {
    if (carouselInView && !wasInViewRef.current) {
      setIntroKey((k) => k + 1);
    }
    wasInViewRef.current = carouselInView;
  }, [carouselInView]);

  const displayItems = useMemo(
    () => (googleGallery?.items?.length ? googleGallery.items : content.items),
    [googleGallery, content.items],
  );

  const n = displayItems.length;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    const textQuery = content.googlePlaceTextQuery;
    if (!apiKey || !textQuery) return undefined;

    let cancelled = false;
    (async () => {
      try {
        const result = await loadGooglePlaceGalleryPhotos({
          apiKey,
          textQuery,
          maxPhotos: content.googlePhotosMax ?? 8,
          locationBias: content.googlePlaceLocationBias,
        });
        if (!cancelled && result?.items?.length) {
          setGoogleGallery(result);
          setActive(0);
        }
      } catch {
        /* keep static fallback */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [content.googlePlaceTextQuery, content.googlePhotosMax, content.googlePlaceLocationBias]);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    setStep(Math.min(260, Math.max(118, w * 0.34)));
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    const el = trackRef.current;
    if (el) ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const go = useCallback(
    (dir) => {
      if (n < 1) return;
      setActive((i) => (i + dir + n) % n);
    },
    [n],
  );

  const headerVariants = reduceMotion ? instantVisible : fadeUp;
  /** Cover-flow + intro — tuned a touch slower so motion reads calmer. */
  const spring = { type: "spring", stiffness: 260, damping: 40, mass: 1.12 };

  if (n === 0) return null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="border-t border-white/10 bg-page py-12 sm:py-14"
    >
      <div className="mx-auto w-full max-w-6xl sx-gutter">
        <motion.div
          className="mb-8 max-w-2xl space-y-2"
          variants={headerVariants}
          initial="hidden"
          whileInView={reduceMotion ? undefined : "visible"}
          animate={reduceMotion ? "visible" : undefined}
          viewport={{ once: false, amount: 0.35, margin: "0px 0px -8% 0px" }}
        >
          <h2
            id="gallery-heading"
            className="relative inline-block font-display text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl"
          >
            <span className="relative z-10">{content.title}</span>
            <span
              className="absolute -bottom-1 left-0 z-0 h-1.5 w-[min(100%,6.5rem)] bg-brand-lemon"
              aria-hidden
            />
          </h2>
          {content.subtitle ? (
            <p className="text-sm leading-relaxed text-white/65 sm:text-base">{content.subtitle}</p>
          ) : null}
        </motion.div>

        <div
          ref={trackRef}
          className="relative mx-auto w-full select-none overflow-hidden rounded-2xl py-2 sm:py-4"
          aria-roledescription="carousel"
        >
          <motion.div
            className="relative mx-auto h-[min(58vw,22rem)] sm:h-[26rem]"
            onPanEnd={(_, info) => {
              if (reduceMotion) return;
              if (info.offset.x < -48) go(1);
              else if (info.offset.x > 48) go(-1);
            }}
          >
            <p className="sr-only" aria-live="polite">
              {content.slideLabel.replace("{current}", String(active + 1)).replace("{total}", String(n))}
            </p>

            {displayItems.map((item, i) => {
              const offset = normalizeOffset(i, active, n);
              const { scale, opacity, zIndex, abs } = cardMotion(offset);
              const baseX = offset * step - CARD_W / 2;
              const fromLeft = i % 2 === 0;
              const sideNudge = reduceMotion ? 0 : fromLeft ? -150 : 150;
              const playIntro = introKey > 0 && !reduceMotion;
              const inactiveShadow = "0 12px 30px rgba(0,0,0,0.35)";
              const activeShadow =
                "0 24px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)";

              return (
                <motion.article
                  key={`${item.key}-${introKey}`}
                  layout={false}
                  initial={
                    playIntro
                      ? {
                          x: baseX + sideNudge,
                          y: -CARD_H / 2,
                          scale: scale * 0.93,
                          opacity: 0.12,
                          zIndex,
                          boxShadow: inactiveShadow,
                        }
                      : false
                  }
                  className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-page-card shadow-lg"
                  style={{ width: CARD_W, height: CARD_H }}
                  animate={{
                    x: baseX,
                    y: -CARD_H / 2,
                    scale,
                    opacity,
                    zIndex,
                    boxShadow: abs === 0 ? activeShadow : inactiveShadow,
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          ...spring,
                          opacity: {
                            type: "tween",
                            duration: 0.72,
                            ease: [0.22, 0.65, 0.28, 1],
                          },
                          delay: Math.min(abs, 4) * 0.055,
                        }
                  }
                  onClick={() => {
                    if (offset !== 0) setActive(i);
                  }}
                  aria-hidden={offset !== 0}
                >
                  <img
                    src={item.src}
                    alt={offset === 0 ? item.alt : ""}
                    loading={i <= 1 ? "eager" : "lazy"}
                    className="pointer-events-none h-full w-full object-cover"
                    draggable={false}
                  />
                  {item.showPlay ? (
                    <span
                      className="pointer-events-none absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md ring-1 ring-black/10"
                      aria-hidden
                    >
                      <Play className="ml-0.5 h-5 w-5" strokeWidth={2.25} aria-hidden />
                    </span>
                  ) : null}
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-3">
            <motion.button
              type="button"
              onClick={() => go(-1)}
              aria-label={content.prevAria}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-page-card text-cyan-300 shadow-md transition-colors hover:border-fuchsia-400/45 hover:text-fuchsia-300"
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden strokeWidth={2} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => go(1)}
              aria-label={content.nextAria}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-page-card text-cyan-300 shadow-md transition-colors hover:border-fuchsia-400/45 hover:text-fuchsia-300"
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            >
              <ChevronRight className="h-6 w-6" aria-hidden strokeWidth={2} />
            </motion.button>
          </div>

          {content.googleMapsListingUrl ? (
            <a
              href={content.googleMapsListingUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={content.mapsCtaAria}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/10 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-cyan-200 transition-colors hover:border-cyan-300/50 hover:bg-cyan-500/15 hover:text-cyan-50"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden strokeWidth={2.25} />
              <span>{content.mapsCtaLabel}</span>
            </a>
          ) : null}

          {googleGallery?.attributions?.length ? (
            <p className="max-w-lg text-center text-[0.65rem] leading-relaxed text-white/50">
              <span className="font-semibold text-white/60">Photo credits: </span>
              {googleGallery.attributions.map((a, i) => (
                <span key={a.displayName}>
                  {i > 0 ? " · " : null}
                  {a.uri ? (
                    <a
                      href={a.uri}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300/95 underline-offset-2 hover:underline"
                    >
                      {a.displayName}
                    </a>
                  ) : (
                    <span>{a.displayName}</span>
                  )}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
