import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useI18n } from '../context/I18nContext';
import './Hero.css';

const heroImages = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop',
];

export default function Hero() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" ref={ref} data-reveal>
      <div className="hero__bg">
        {heroImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className={`hero__image ${index === currentIndex ? 'is-active' : ''} ${isLoaded ? 'is-loaded' : ''}`}
            aria-hidden="true"
          />
        ))}
        <div className="hero__vignette" aria-hidden="true" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow eyebrow" data-parallax>{t('hero.location')}</p>
        <Link to="/collections/all" className="btn btn--arrow hero__cta" data-parallax>
          {t('hero.cta')}
        </Link>
      </div>

      <div className="hero__scroll" data-parallax>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}