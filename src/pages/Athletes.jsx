import { useState } from 'react';
import { athletes } from '../data/products';
import { useI18n } from '../context/I18nContext';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Lightbox from '../components/Lightbox';
import { useScrollRevealMultiple } from '../hooks/useScrollReveal';
import './Athletes.css';

export default function Athletes() {
  const { t } = useI18n();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { setRef, isVisible } = useScrollRevealMultiple(athletes.length);

  const lightboxImages = athletes.map(a => a.image);

  return (
    <>
      <CustomCursor />
      <section className="athletes-hero" data-reveal>
        <div className="container">
          <p className="eyebrow athletes-hero__eyebrow">{t('athletes.athletes')}</p>
          <h1 className="section-title athletes-hero__title">{t('athletes.theTeam')}</h1>
          <p className="body-text athletes-hero__text">{t('athletes.teamDesc')}</p>
        </div>
      </section>

      <section className="athletes-grid" data-reveal>
        <div className="container">
          <div className="athletes-grid__list" role="list">
            {athletes.map((athlete, index) => (
              <article 
                key={athlete.id} 
                className="athletes-grid__card"
                ref={setRef(index)}
                style={{ opacity: isVisible(index) ? 1 : 0, transform: isVisible(index) ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out)' }}
                data-parallax
              >
                <div className="athletes-grid__image-wrapper">
                  <img src={athlete.image} alt={athlete.name} className="athletes-grid__image" loading="lazy" />
                  <div className="athletes-grid__overlay">
                    <button className="athletes-grid__zoom" onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }} data-parallax aria-label={`View ${athlete.name} fullscreen`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="athletes-grid__info">
                  <p className="athletes-grid__sport">{t(`athletes.sport.${athlete.sport.toLowerCase().replace(/\s+/g, '')}`) || athlete.sport}</p>
                  <h3 className="athletes-grid__name">{athlete.name}</h3>
                  <p className="athletes-grid__location">{athlete.location}</p>
                  <p className="athletes-grid__bio">{athlete.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />

      <Footer />
    </>
  );
}