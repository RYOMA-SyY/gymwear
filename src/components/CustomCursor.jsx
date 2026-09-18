import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const move = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const activate = (e) => {
      if (e.target.closest('a, button, .product-card, .gallery-item, .product-detail__main-image, .product-detail__showcase-item, .athletes-grid__card, .showcase-item, input, textarea, [data-parallax]')) {
        dot.classList.add('is-active');
      }
    };

    const deactivate = (e) => {
      if (e.target.closest('a, button, .product-card, .gallery-item, .product-detail__main-image, .product-detail__showcase-item, .athletes-grid__card, .showcase-item, input, textarea, [data-parallax]')) {
        dot.classList.remove('is-active');
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', activate);
    document.addEventListener('mouseout', deactivate);

    if (prefersReducedMotion) {
      dot.style.transition = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', activate);
      document.removeEventListener('mouseout', deactivate);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}