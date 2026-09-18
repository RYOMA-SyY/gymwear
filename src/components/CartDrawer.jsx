import { useCartStore } from '../context/CartContext';
import { useI18n } from '../context/I18nContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { t } = useI18n();
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();

  return (
    <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="cart-drawer__overlay" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-drawer__panel">
        <header className="cart-drawer__header">
          <h2 className="cart-drawer__title">{t('cart.title')}</h2>
          <button className="cart-drawer__close" onClick={closeCart} data-parallax aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="cart-drawer__content">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <p className="body-text">{t('cart.empty')}</p>
              <p className="body-text" style={{ marginTop: '8px', fontSize: '13px' }}>{t('cart.addItems')}</p>
            </div>
          ) : (
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="cart-drawer__item">
                  <div className="cart-drawer__item-image">
                    <img src={item.images[0]} alt={item.name} loading="lazy" />
                  </div>
                  <div className="cart-drawer__item-details">
                    <h3 className="cart-drawer__item-name">{item.name}</h3>
                    <p className="cart-drawer__item-size">Size: {item.size}</p>
                    <p className="cart-drawer__item-price">{item.price} DH</p>
                  </div>
                  <div className="cart-drawer__item-controls">
                    <div className="cart-drawer__quantity">
                      <button
                        className="cart-drawer__qty-btn"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        data-parallax
                        aria-label="Decrease quantity"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <span className="cart-drawer__qty-value">{item.quantity}</span>
                      <button
                        className="cart-drawer__qty-btn"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        data-parallax
                        aria-label="Increase quantity"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                    <button
                      className="cart-drawer__remove"
                      onClick={() => removeItem(item.id, item.size)}
                      data-parallax
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="cart-drawer__footer">
            <div className="cart-drawer__summary">
              <div className="cart-drawer__summary-row">
                <span className="cart-drawer__summary-label">{t('cart.subtotal')}</span>
                <span className="cart-drawer__summary-value">{subtotal} DH</span>
              </div>
              <div className="cart-drawer__summary-row">
                <span className="cart-drawer__summary-label">{t('cart.shipping')}</span>
                <span className="cart-drawer__summary-value">{t('cart.calculatedAtCheckout')}</span>
              </div>
              <div className="cart-drawer__summary-row cart-drawer__summary-row--total">
                <span className="cart-drawer__summary-label">{t('cart.total')}</span>
                <span className="cart-drawer__summary-value">{subtotal} DH</span>
              </div>
            </div>
            <button className="btn btn--filled btn--full cart-drawer__checkout" data-parallax>
              {t('cart.checkout')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <p className="cart-drawer__note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5" />
                <path d="M7 21v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
              </svg>
              {t('cart.cashOnDelivery')}
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}