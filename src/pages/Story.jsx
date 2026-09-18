import { storyContent } from '../data/products';
import StatementBlock from '../components/StatementBlock';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useI18n } from '../context/I18nContext';
import './Story.css';

export default function Story() {
  const { t } = useI18n();
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <CustomCursor />
      <section className="story-hero" ref={ref} data-reveal>
        <div className="container">
          <p className="eyebrow story-hero__eyebrow">{t('story.ourStory')}</p>
          <h1 className="section-title story-hero__title">{t('story.builtDifferent')}</h1>
          <p className="body-text story-hero__text">{t('story.fromCasablanca')}</p>
        </div>
      </section>

      <div className="story-content">
        {storyContent.map((block, index) => {
          if (block.type === 'statement') {
            return (
              <StatementBlock
                key={index}
                image={block.image}
                eyebrow={t(`story.${block.eyebrow.toLowerCase().replace(/\s+/g, '')}`) || block.eyebrow}
                title={t(`story.${block.title.toLowerCase().replace(/\s+/g, '')}`) || block.title}
                text={block.text}
                imagePosition="full"
              />
            );
          }

          if (block.type === 'image') {
            return (
              <div key={index} className="story-image" data-reveal>
                <img src={block.image} alt="" loading="lazy" />
              </div>
            );
          }

          if (block.type === 'copy') {
            return (
              <section key={index} className="story-copy" data-reveal>
                <div className="container">
                  <p className="eyebrow story-copy__eyebrow">{t(`story.${block.eyebrow.toLowerCase().replace(/\s+/g, '')}`) || block.eyebrow}</p>
                  <h2 className="section-title story-copy__title">{t(`story.${block.title.toLowerCase().replace(/\s+/g, '')}`) || block.title}</h2>
                  <div className="story-copy__text">
                    <p className="body-text">{block.text}</p>
                    {block.text2 && <p className="body-text" style={{ marginTop: '24px' }}>{block.text2}</p>}
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>

      <Footer />
    </>
  );
}