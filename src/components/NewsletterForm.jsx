import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useI18n } from '../context/I18nContext';
import './NewsletterForm.css';

export default function NewsletterForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const { ref, isVisible } = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="newsletter" ref={ref} data-reveal>
      <div className="container">
        <div className="newsletter__inner">
          <header className="newsletter__header">
            <p className="eyebrow newsletter__eyebrow">{t('newsletter.stayConnected')}</p>
            <h2 className="section-title newsletter__title">{t('newsletter.join')}</h2>
            <p className="body-text newsletter__text">{t('newsletter.description')}</p>
          </header>

          <form className="newsletter__form" onSubmit={handleSubmit}>
            <div className="newsletter__input-group">
              <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
              <input
                type="email"
                id="newsletter-email"
                className="input newsletter__input"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'submitting' || status === 'success'}
              />
              <button 
                type="submit" 
                className="btn btn--filled newsletter__submit"
                disabled={status === 'submitting' || status === 'success' || !email}
                data-parallax
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="newsletter__spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                      </path>
                    </svg>
                    {t('newsletter.subscribing')}
                  </>
                ) : status === 'success' ? (
                  t('newsletter.subscribed')
                ) : (
                  <>
                    {t('newsletter.subscribe')}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            <p className="newsletter__note">{t('newsletter.privacyNote')}</p>
          </form>
        </div>
      </div>
    </section>
  );
}