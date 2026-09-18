import { useEffect, useRef, useState } from 'react';

const DURATION = 2000;
const EXIT_DURATION = 700;

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let raf = 0;
    let lastShown = -1;
    const start = performance.now();

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      cancelAnimationFrame(raf);
      setProgress(100);
      if (reduced) {
        document.body.style.overflow = prevOverflow;
        onCompleteRef.current?.();
      } else {
        setPhase('exiting');
        setTimeout(() => {
          document.body.style.overflow = prevOverflow;
          onCompleteRef.current?.();
        }, EXIT_DURATION);
      }
    };

    if (reduced) {
      const t = setTimeout(finish, 150);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prevOverflow;
      };
    }

    const tick = () => {
      const elapsed = performance.now() - start;
      const shown = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      if (shown !== lastShown) {
        lastShown = shown;
        setProgress(shown);
      }
      if (elapsed >= DURATION) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const safety = setTimeout(finish, DURATION + 500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const shown = Math.min(100, Math.floor(progress));

  return (
    <div
      className={`preloader ${phase === 'exiting' ? 'is-exiting' : ''}`}
      aria-hidden={phase !== 'loading'}
    >
      <div className="preloader__center">
        <svg
          className="preloader__mark"
          viewBox="0 0 200 182"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="preloader__draw preloader__draw--outer"
            d="M100 0L200 91L100 182L0 91L100 0Z"
            stroke="var(--off-white)"
            strokeWidth="4"
            strokeLinejoin="round"
            pathLength="1"
          />
          <path
            className="preloader__draw preloader__draw--inner"
            d="M100 40L160 91L100 142L40 91L100 40Z"
            stroke="var(--off-white)"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.5"
            pathLength="1"
          />
        </svg>
        <p className="preloader__word" aria-hidden="true">
          {'GYMWEAR'.split('').map((ch, i) => (
            <span key={i} className="preloader__letter" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
              {ch}
            </span>
          ))}
        </p>
        <div className="preloader__meta">
          <div
            className="preloader__bar"
            role="progressbar"
            aria-label="Loading"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={shown}
          >
            <div className="preloader__bar-fill" style={{ width: `${shown}%` }} />
          </div>
          <span className="preloader__count" aria-hidden="true">
            {String(shown).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
