import { useEffect, useState } from 'react';
import { loaderDebug, loaderDebugControls } from './Preloader';
import './LoaderDebug.css';

export default function LoaderDebug({ onReplay }) {
  const [snap, setSnap] = useState({ ...loaderDebug });
  const [open, setOpen] = useState(true);
  const [forceMotion, setForceMotion] = useState(loaderDebugControls.forceMotion);

  useEffect(() => {
    const id = setInterval(() => {
      setSnap({
        ...loaderDebug,
        bodyOverflow: document.body.style.overflow || '(none)',
      });
    }, 200);
    return () => clearInterval(id);
  }, []);

  if (!open) {
    return (
      <button className="loader-debug__fab" onClick={() => setOpen(true)} aria-label="Show loader debugger">
        DBG
      </button>
    );
  }

  const rows = [
    ['run', snap.run],
    ['phase', snap.phase],
    ['progress', `${snap.progress}%`],
    ['elapsed', `${snap.elapsed}ms`],
    ['rAF ticks', snap.ticks],
    ['reduced motion', String(snap.reducedMotion)],
    ['body overflow', snap.bodyOverflow],
  ];

  return (
    <section className="loader-debug" aria-label="Loader debugger">
      <header className="loader-debug__head">
        <span>LOADER DBG</span>
        <button onClick={() => setOpen(false)} aria-label="Hide loader debugger">–</button>
      </header>
      <dl className="loader-debug__rows">
        {rows.map(([k, v]) => (
          <div key={k} className="loader-debug__row">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <label className="loader-debug__force">
        <input
          type="checkbox"
          checked={forceMotion}
          onChange={(e) => {
            loaderDebugControls.forceMotion = e.target.checked;
            setForceMotion(e.target.checked);
            onReplay();
          }}
        />
        force motion (ignore OS setting)
      </label>
      <div className="loader-debug__actions">
        <button onClick={onReplay}>↻ replay</button>
        <button
          onClick={() => loaderDebugControls.skip?.()}
          disabled={snap.phase !== 'loading'}
        >
          ⏭ skip to site
        </button>
      </div>
    </section>
  );
}
