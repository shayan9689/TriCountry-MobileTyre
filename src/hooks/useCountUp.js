import { useEffect, useRef, useState } from "react";

/**
 * Animates an integer from 0 to `end` when `active` becomes true.
 * @param {number} end
 * @param {{ durationMs?: number, active?: boolean }} options
 */
export function useCountUp(end, options = {}) {
  const { durationMs = 1200, active = false } = options;
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    startRef.current = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - startRef.current) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(end * eased));
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, end, durationMs]);

  return value;
}
