import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const DURATION = 2000;
const EXIT_DURATION = 700;
const EASE_OUT = [0.22, 1, 0.36, 1];
const EASE_IN_OUT = [0.65, 0, 0.35, 1];

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } },
};

const wordLetter = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.7, ease: EASE_OUT } },
};

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
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
      document.body.style.overflow = prevOverflow;
      onCompleteRef.current?.();
    };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shown = Math.min(100, Math.floor(progress));

  return (
    <motion.div
      className="preloader"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.7, ease: EASE_IN_OUT } }}
    >
      <div className="preloader__center">
        <motion.svg
          className="preloader__mark"
          viewBox="0 0 200 182"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <path
            d="M100 0L200 91L100 182L0 91L100 0Z"
            stroke="var(--off-white)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M100 40L160 91L100 142L40 91L100 40Z"
            stroke="var(--off-white)"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </motion.svg>

        <motion.p
          className="preloader__word"
          aria-hidden="true"
          variants={wordContainer}
          initial="hidden"
          animate="show"
        >
          {'GYMWEAR'.split('').map((ch, i) => (
            <motion.span key={i} className="preloader__letter" variants={wordLetter}>
              {ch}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          className="preloader__meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
        >
          <div
            className="preloader__bar"
            role="progressbar"
            aria-label="Loading"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={shown}
          >
            <div className="preloader__bar-fill" style={{ transform: `scaleX(${shown / 100})` }} />
          </div>
          <span className="preloader__count" aria-hidden="true">
            {String(shown).padStart(3, '0')}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
