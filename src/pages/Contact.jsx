import { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const { ref, isVisible } = useScrollReveal();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.name') + ' is required';
    if (!formData.email.trim()) newErrors.email = t('contact.email') + ' is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = t('contact.message') + ' is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <>
      <CustomCursor />
      <section className="contact-hero" ref={ref} data-reveal>
        <div className="container">
          <p className="eyebrow contact-hero__eyebrow">{t('contact.getInTouch')}</p>
          <h1 className="section-title contact-hero__title">{t('contact.contactUs')}</h1>
          <p className="body-text contact-hero__text">{t('contact.contactText')}</p>
        </div>
      </section>

      <section className="contact-form-section" data-reveal>
        <div className="container">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <div className="contact-form__group">
                <label htmlFor="name" className="contact-form__label">{t('contact.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`input contact-form__input ${errors.name ? 'input--error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.placeholderName')}
                  required
                  disabled={status === 'submitting' || status === 'success'}
                />
                {errors.name && <p className="error-note">{errors.name}</p>}
              </div>
              <div className="contact-form__group">
                <label htmlFor="email" className="contact-form__label">{t('contact.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`input contact-form__input ${errors.email ? 'input--error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.placeholderEmail')}
                  required
                  disabled={status === 'submitting' || status === 'success'}
                />
                {errors.email && <p className="error-note">{errors.email}</p>}
              </div>
            </div>
            <div className="contact-form__group">
              <label htmlFor="message" className="contact-form__label">{t('contact.message')}</label>
              <textarea
                id="message"
                name="message"
                className={`input contact-form__textarea ${errors.message ? 'input--error' : ''}`}
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.placeholderMessage')}
                rows={6}
                required
                disabled={status === 'submitting' || status === 'success'}
              />
              {errors.message && <p className="error-note">{errors.message}</p>}
            </div>
            <button 
              type="submit" 
              className="btn btn--filled btn--arrow contact-form__submit"
              disabled={status === 'submitting' || status === 'success'}
              data-parallax
            >
              {status === 'submitting' ? (
                <>
                  <svg className="contact-form__spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                    </path>
                  </svg>
                  {t('newsletter.subscribing').replace('S\'ABONNER', t('contact.sending').replace('ENVOI...', 'SENDING...'))}
                </>
              ) : status === 'success' ? (
                t('contact.sent')
              ) : (
                <>
                  {t('contact.sendMessage')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <section className="contact-info" data-reveal>
        <div className="container">
          <div className="contact-info__grid">
            <div className="contact-info__item">
              <h3 className="contact-info__title">{t('contact.headquarters')}</h3>
              <address className="contact-info__address">
                GYMWEAR HQ<br />
                BOULEVARD ZERKTouni<br />
                CASABLANCA, MOROCCO
              </address>
            </div>
            <div className="contact-info__item">
              <h3 className="contact-info__title">{t('contact.emailLabel')}</h3>
              <a href="mailto:hello@gymwear.ma" className="contact-info__link">HELLO@GYMWEAR.MA</a>
              <a href="mailto:orders@gymwear.ma" className="contact-info__link">ORDERS@GYMWEAR.MA</a>
            </div>
            <div className="contact-info__item">
              <h3 className="contact-info__title">{t('contact.hours')}</h3>
              <p className="contact-info__hours">{t('contact.hoursWeek')}</p>
              <p className="contact-info__hours">{t('contact.hoursSat')}</p>
              <p className="contact-info__hours">{t('contact.hoursSun')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}