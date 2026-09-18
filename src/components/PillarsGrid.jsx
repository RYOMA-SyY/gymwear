import { useScrollRevealMultiple } from '../hooks/useScrollReveal';
import { useI18n } from '../context/I18nContext';
import './PillarsGrid.css';

export default function PillarsGrid({ pillars }) {
  const { t } = useI18n();
  const { setRef, isVisible } = useScrollRevealMultiple(pillars.length);

  return (
    <section className="pillars" data-reveal>
      <div className="container">
        <header className="pillars__header">
          <p className="eyebrow pillars__eyebrow">{t('pillars.brandPillars')}</p>
          <h2 className="section-title pillars__title">{t('pillars.whatDrivesUs')}</h2>
        </header>

        <div className="pillars__grid" role="list">
          {pillars.map((pillar, index) => (
            <article 
              key={pillar.index} 
              className="pillars__card"
              ref={setRef(index)}
              style={{ opacity: isVisible(index) ? 1 : 0, transform: isVisible(index) ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out)' }}
              data-parallax
            >
              <span className="pillars__index">{pillar.index}</span>
              <h3 className="pillars__title">{t(`pillars.${pillar.title.toLowerCase().replace(/\s+/g, '')}`) || pillar.title}</h3>
              <p className="pillars__description">{t(`pillars.${pillar.title.toLowerCase().replace(/\s+/g, '')}Desc`) || pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}