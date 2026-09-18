import { useEffect, useRef, useState } from 'react';
import { HERO_IMAGES } from './Hero';

const MIN_DISPLAY = 900;
const MAX_WAIT = 2600;
const EXIT_DURATION = 700;

const WEIGHT_FONTS = 30;
const WEIGHT_IMAGES = 50;
const WEIGHT_WINDOW = 20;

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

    const start = performance.now();
    const state = {
      fonts: false,
      imagesLoaded: 0,
      windowLoaded: document.readyState === 'complete',
    };
    let target = state.windowLoaded ? WEIGHT_WINDOW : 0;
    let displayed = 0;
    let lastShown = -1;
    let raf = 0;

    const recompute = () => {
      target =
        (state.fonts ? WEIGHT_FONTS : 0) +
        (state.imagesLoaded / HERO_IMAGES.length) * WEIGHT_IMAGES +
        (state.windowLoaded ? WEIGHT_WINDOW : 0);
    };

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

    const tick = () => {
      const gap = target - displayed;
      if (gap > 0) {
        displayed = Math.min(target, displayed + Math.max(gap * 0.1, 0.4));
        const shown = Math.floor(displayed);
        if (shown !== lastShown) {
          lastShown = shown;
          setProgress(shown);
        }
      }
      const elapsed = performance.now() - start;
      const allDone =
        state.fonts && state.imagesLoaded >= HERO_IMAGES.length && state.windowLoaded;
      if ((allDone && elapsed >= MIN_DISPLAY) || elapsed >= MAX_WAIT) {
        target = 100;
        if (displayed >= 99.5 || elapsed >= MAX_WAIT) {
          displayed = 100;
          setProgress(100);
          finish();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      const t = setTimeout(finish, 150);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prevOverflow;
      };
    }

    raf = requestAnimationFrame(tick);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        state.fonts = true;
        recompute();
      });
    } else {
      state.fonts = true;
      recompute();
    }

    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      const settle = () => {
        state.imagesLoaded += 1;
        recompute();
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = src;
    });

    const onLoad = () => {
      state.windowLoaded = true;
      recompute();
    };
    if (!state.windowLoaded) {
      window.addEventListener('load', onLoad);
    }

    const safety = setTimeout(() => {
      target = 100;
    }, MAX_WAIT);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      window.removeEventListener('load', onLoad);
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
