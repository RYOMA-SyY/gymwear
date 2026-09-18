import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const opts = useMemo(() => ({ threshold, rootMargin }), [threshold, rootMargin]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      opts
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [opts]);

  return { ref, isVisible };
}

export function useScrollRevealMultiple(count, { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = {}) {
  const refs = useRef([]);
  const [visibleIndices, setVisibleIndices] = useState(new Set());

  const opts = useMemo(() => ({ threshold, rootMargin }), [threshold, rootMargin]);

  useEffect(() => {
    const elements = refs.current.filter(Boolean);
    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisibleIndices((prev) => {
        if (prev.size === count) return prev;
        return new Set(Array.from({ length: count }, (_, i) => i));
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elements.indexOf(entry.target);
            if (index !== -1) {
              setVisibleIndices((prev) => new Set([...prev, index]));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      opts
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [count, opts]);

  const setRef = useCallback((index) => (el) => {
    refs.current[index] = el;
  }, []);

  return { setRef, isVisible: (index) => visibleIndices.has(index) };
}