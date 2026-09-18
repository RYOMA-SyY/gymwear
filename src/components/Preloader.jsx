import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true);
      onComplete?.();
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`preloader ${isHidden ? 'hidden' : ''}`} aria-hidden="true">
      <svg className="preloader__mark" viewBox="0 0 200 182" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 0L200 91L100 182L0 91L100 0Z" stroke="var(--off-white)" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M100 40L160 91L100 142L40 91L100 40Z" stroke="var(--off-white)" strokeWidth="2" strokeLinejoin="round" opacity="0.5"/>
      </svg>
      <div className="preloader__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100">
        <div className="preloader__bar-fill" />
      </div>
    </div>
  );
}
