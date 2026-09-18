import { useEffect, useRef, useState } from 'react';
import { HERO_IMAGES } from './Hero';

const DURATION = 2000;
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
      images: HERO_IMAGES.map(() => 0),
      windowLoaded: document.readyState === 'complete',
    };
    let target = state.windowLoaded ? WEIGHT_WINDOW : 0;
    let displayed = 0;
    let lastShown = -1;
    let raf = 0;

    const recompute = () => {
      const imageFrac =
        state.images.reduce((sum, f) => sum + f, 0) / HERO_IMAGES.length;
      target =
        (state.fonts ? WEIGHT_FONTS : 0) +
        imageFrac * WEIGHT_IMAGES +
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
      const elapsed = performance.now() - start;
      // Wall-clock floor guarantees the full 2s run and keeps the bar
      // moving; real task progress takes over whenever it runs ahead.
      const timeTarget = Math.min(100, (elapsed / DURATION) * 100);
      const effTarget = Math.max(target, timeTarget);
      const gap = effTarget - displayed;
      if (gap > 0) {
        displayed = Math.min(effTarget, displayed + Math.max(gap * 0.12, 0.6));
        const shown = Math.floor(displayed);
        if (shown !== lastShown) {
          lastShown = shown;
          setProgress(shown);
        }
      }
      if (elapsed >= DURATION) {
        displayed = 100;
        setProgress(100);
        finish();
        return;
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

    // Real byte-level progress: stream each hero image and report
    // received bytes against content-length. Warms the HTTP cache too,
    // so the hero <img> tags resolve instantly afterwards.
    const fetchWithProgress = async (url, index) => {
      try {
        const res = await fetch(url, { mode: 'cors' });
        const total = Number(res.headers.get('content-length')) || 0;
        if (!res.body) {
          await res.blob();
          state.images[index] = 1;
          recompute();
          return;
        }
        const reader = res.body.getReader();
        let loaded = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          loaded += value.byteLength;
          state.images[index] = total > 0 ? Math.min(1, loaded / total) : 0.5;
          recompute();
        }
        state.images[index] = 1;
        recompute();
      } catch {
        state.images[index] = 1;
        recompute();
      }
    };

    HERO_IMAGES.forEach((src, i) => {
      fetchWithProgress(src, i);
    });

    const onLoad = () => {
      state.windowLoaded = true;
      recompute();
    };
    if (!state.windowLoaded) {
      window.addEventListener('load', onLoad);
    }

    const safety = setTimeout(() => {
      finish();
    }, DURATION + 500);

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
