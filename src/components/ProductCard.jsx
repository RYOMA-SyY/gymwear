import { Link } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(false);
  const [showSizeSelect, setShowSizeSelect] = useState(false);
  const { addItem } = useCartStore();
  const availableSizes = product.sizes.filter(s => s.available);

  const handleAddToCart = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, size.label, 1);
    setShowSizeSelect(false);
  };

  const isSoldOut = availableSizes.length === 0;

  return (
    <article className={`product-card ${hovered ? 'is-hovered' : ''} ${isSoldOut ? 'is-sold-out' : ''}`} 
             onMouseEnter={() => setHovered(true)} 
             onMouseLeave={() => setHovered(false)}
             data-parallax>
      <Link to={`/products/${product.handle}`} className="product-card__link" data-parallax>
        <div className="product-card__image-wrapper">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="product-card__image product-card__image--primary"
            loading="lazy"
          />
          {product.images[1] && (
            <img 
              src={product.images[1]} 
              alt={product.name} 
              className="product-card__image product-card__image--secondary"
              loading="lazy"
            />
          )}
          {(product.badge || isSoldOut) && (
            <span className={`product-card__badge ${isSoldOut ? 'sold-out' : ''}`}>
              {isSoldOut ? t('productGrid.soldOut') : product.badge}
            </span>
          )}
        </div>
        <div className="product-card__info">
          <h3 className="product-card__name">{product.name}</h3>
          <div className="product-card__price-row">
            <span className="product-card__price">{product.price} DH</span>
            {product.oldPrice && (
              <span className="product-card__old-price">{product.oldPrice} DH</span>
            )}
          </div>
        </div>
      </Link>

      {!isSoldOut && (
        <div className="product-card__action">
          {showSizeSelect ? (
            <div className="product-card__size-select">
              <p className="product-card__size-label">{t('productGrid.selectSize')}</p>
              <div className="product-card__size-options">
                {availableSizes.map((size) => (
                  <button
                    key={size.label}
                    className="product-card__size-btn"
                    onClick={(e) => handleAddToCart(e, size)}
                    data-parallax
                  >
                    {size.label}
                    <span className="product-card__size-range">{size.range}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button 
              className="btn product-card__choose-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (availableSizes.length === 1) {
                  handleAddToCart(e, availableSizes[0]);
                } else {
                  setShowSizeSelect(true);
                }
              }}
              data-parallax
            >
              {t('productGrid.choose')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          )}
        </div>
      )}
    </article>
  );
}