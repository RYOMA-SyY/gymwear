import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import './Nav.css';

export default function Nav({ onCartClick }) {
  const { t, locale, changeLocale, SUPPORTED_LOCALES, dir } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { key: 'shop', href: '/collections/all' },
    { key: 'story', href: '/story' },
    { key: 'athletes', href: '/athletes' },
    { key: 'contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLangChange = (newLocale) => {
    changeLocale(newLocale);
    setIsLangOpen(false);
  };

  return (
    <header className={`nav ${isScrolled ? 'is-scrolled' : ''}`} role="banner" dir={dir}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo" aria-label="Gymwear Home">
          <svg viewBox="0 0 200 182" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="47">
            <path d="M100 0L200 91L100 182L0 91L100 0Z" stroke="var(--off-white)" strokeWidth="4" strokeLinejoin="round"/>
            <path d="M100 40L160 91L100 142L40 91L100 40Z" stroke="var(--off-white)" strokeWidth="2" strokeLinejoin="round" opacity="0.5"/>
          </svg>
          <span className="nav__wordmark">GYMWEAR</span>
        </Link>

        <nav className="nav__desktop" role="navigation" aria-label="Main navigation">
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`nav__link ${location.pathname === link.href ? 'is-active' : ''}`}
                  data-parallax
                >
                  {t(`nav.${link.key}`)}
                  <span className="nav__link-line" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <div className="nav__lang" role="menu" aria-label="Language selection">
            <button
              className="nav__lang-btn"
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-expanded={isLangOpen}
              aria-haspopup="menu"
              data-parallax
            >
              {locale.toUpperCase()}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isLangOpen && (
              <div className="nav__lang-dropdown" role="menu">
                {SUPPORTED_LOCALES.map((lang) => (
                  <button
                    key={lang}
                    className={`nav__lang-option ${locale === lang ? 'is-active' : ''}`}
                    onClick={() => handleLangChange(lang)}
                    role="menuitem"
                    data-parallax
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="btn nav__cta"
            onClick={onCartClick}
            data-parallax
          >
            {t('nav.cart')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>

          <button
            className={`nav__burger ${isMobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            data-parallax
          >
            <span className="nav__burger-line" />
            <span className="nav__burger-line" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`nav__mobile ${isMobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <nav className="nav__mobile-inner">
          <ul className="nav__mobile-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`nav__mobile-link ${location.pathname === link.href ? 'is-active' : ''}`}
                  data-parallax
                >
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav__mobile-lang" role="menu" aria-label="Language selection">
            <button
              className="nav__lang-btn nav__lang-btn--mobile"
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-expanded={isLangOpen}
              aria-haspopup="menu"
              data-parallax
            >
              {locale.toUpperCase()}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isLangOpen && (
              <div className="nav__lang-dropdown" role="menu">
                {SUPPORTED_LOCALES.map((lang) => (
                  <button
                    key={lang}
                    className={`nav__lang-option ${locale === lang ? 'is-active' : ''}`}
                    onClick={() => handleLangChange(lang)}
                    role="menuitem"
                    data-parallax
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="btn btn--filled nav__mobile-cta"
            onClick={onCartClick}
            data-parallax
          >
            {t('nav.cart')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}