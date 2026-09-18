import { useScrollReveal } from '../hooks/useScrollReveal';
import { useI18n } from '../context/I18nContext';
import './StatementBlock.css';

export default function StatementBlock({ eyebrow, title, text, image, reverse = false, imagePosition = 'full' }) {
  const { t } = useI18n();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={`statement ${reverse ? 'statement--reverse' : ''} ${imagePosition}`} ref={ref} data-reveal>
      {image && (
        <div className="statement__image-wrapper">
          <img src={image} alt="" className="statement__image" loading="lazy" />
        </div>
      )}

      <div className="statement__content container">
        {eyebrow && <p className="eyebrow statement__eyebrow">{t(eyebrow) || eyebrow}</p>}
        <h2 className="statement__title">{t(title) || title}</h2>
        {text && <p className="body-text statement__text">{text}</p>}
      </div>
    </section>
  );
}