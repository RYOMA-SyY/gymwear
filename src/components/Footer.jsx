import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import './Footer.css';

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/gymwear', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )},
  { name: 'Instagram', href: 'https://instagram.com/gymwear', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )},
  { name: 'YouTube', href: 'https://youtube.com/gymwear', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.44 24.12 24.12 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.44 24.12 24.12 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <path d="M10 15l5-3-5-3z" />
    </svg>
  )},
  { name: 'TikTok', href: 'https://tiktok.com/@gymwear', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      <path d="M12 2v20M17 7v10" strokeWidth="1" />
    </svg>
  )},
];

export default function Footer() {
  const { t } = useI18n();

  const footerLinks = {
    shop: [
      { key: 'allProducts', href: '/collections/all' },
      { key: 'newArrivals', href: '/collections/all?filter=new' },
      { key: 'bestSellers', href: '/collections/all?filter=bestsellers' },
    ],
    company: [
      { key: 'ourStory', href: '/story' },
      { key: 'athletes', href: '/athletes' },
      { key: 'contact', href: '/contact' },
    ],
    connect: [
      { key: 'newsletter', href: '#newsletter' },
      { key: 'instagram', href: 'https://instagram.com/gymwear' },
      { key: 'youtube', href: 'https://youtube.com/gymwear' },
      { key: 'tiktok', href: 'https://tiktok.com/@gymwear' },
    ],
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Gymwear Home">
              <svg viewBox="0 0 200 182" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="55">
                <path d="M100 0L200 91L100 182L0 91L100 0Z" stroke="var(--off-white)" strokeWidth="4" strokeLinejoin="round"/>
                <path d="M100 40L160 91L100 142L40 91L100 40Z" stroke="var(--off-white)" strokeWidth="2" strokeLinejoin="round" opacity="0.5"/>
              </svg>
              <span className="footer__wordmark">GYMWEAR</span>
            </Link>
            <p className="footer__tagline">{t('footer.tagline')}</p>
          </div>
          <nav className="footer__nav" aria-label="Footer navigation">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key} className="footer__col">
                <h3 className="footer__col-title">{t(`footer.${key}`)}</h3>
                <ul className="footer__col-list">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className="footer__link" data-parallax>
                        {t(`footer.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__social">
          <ul className="footer__social-list">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a href={social.href} className="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label={social.name} data-parallax>
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© {new Date().getFullYear()} GYMWEAR. {t('footer.copyright')}</p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">{t('footer.privacy')}</Link>
            <Link to="/terms" className="footer__legal-link">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}