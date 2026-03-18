import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );

    const elements = el.querySelectorAll(".reveal");
    for (const el of elements) {
      observer.observe(el);
    }
    // Also observe the ref itself if it has reveal class
    if (el.classList.contains("reveal")) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useCounterAnimation(
  targetValue: number,
  duration = 2000,
): { count: number; ref: React.RefObject<HTMLDivElement | null> } {
  const countRef = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            countRef.current = Math.round(eased * targetValue);
            el.textContent =
              countRef.current.toLocaleString() + (el.dataset.suffix || "");
            if (progress < 1) {
              animationRef.current = requestAnimationFrame(animate);
            }
          };
          animationRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetValue, duration]);

  return { count: countRef.current, ref };
}
