import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCartStore } from '../context/CartContext';
import { useScrollRevealMultiple } from '../hooks/useScrollReveal';
import { useI18n } from '../context/I18nContext';
import Lightbox from '../components/Lightbox';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import './ProductDetail.css';

export default function ProductDetail() {
  const { t } = useI18n();
  const { handle } = useParams();
  const product = products.find(p => p.handle === handle);
  const { addItem } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { setRef, isVisible } = useScrollRevealMultiple(2);

  const availableSizes = product?.sizes.filter(s => s.available) || [];

  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0].label);
    }
  }, [availableSizes, selectedSize]);

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem(product, selectedSize, quantity);
    }
  };

  const allImages = product ? [product.images[0], ...(product.showcaseImages || [])] : [];

  if (!product) {
    return (
      <>
        <CustomCursor />
        <div className="container" style={{ padding: '100px var(--gutter)', textAlign: 'center' }}>
          <h1 className="section-title">{t('productDetail.productNotFound')}</h1>
          <Link to="/collections/all" className="text-link" style={{ marginTop: '24px', display: 'inline-flex' }} data-parallax>
            {t('productDetail.backToShop')}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <section className="product-detail" data-reveal>
        <div className="container">
          <div className="product-detail__grid" ref={setRef(0)} style={{ opacity: isVisible(0) ? 1 : 0, transform: isVisible(0) ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out)' }}>
            <div className="product-detail__gallery">
              <div className="product-detail__main-image" data-parallax>
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="product-detail__main-img"
                  onClick={() => { setLightboxIndex(selectedImage); setLightboxOpen(true); }}
                />
              </div>

              {product.thumbnails.length > 1 && (
                <div className="product-detail__thumbnails" role="list">
                  {product.thumbnails.map((thumb, index) => (
                    <button
                      key={index}
                      className={`product-detail__thumb ${index === selectedImage ? 'is-active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-current={index === selectedImage ? 'true' : 'false'}
                      data-parallax
                    >
                      <img src={thumb} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-detail__panel" ref={setRef(1)} style={{ opacity: isVisible(1) ? 1 : 0, transform: isVisible(1) ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out)' }}>
              <p className="eyebrow product-detail__category">{t('productDetail.newArrival')}</p>
              <h1 className="product-detail__name">{product.name}</h1>

              <div className="product-detail__price-row">
                <span className="product-detail__price">{product.price} DH</span>
                {product.oldPrice && (
                  <span className="product-detail__old-price">{product.oldPrice} DH</span>
                )}
                {product.badge && (
                  <span className="product-detail__badge">{product.badge}</span>
                )}
              </div>

              <p className="product-detail__description">{product.description}</p>

              {availableSizes.length > 0 && (
                <div className="product-detail__sizes">
                  <label className="product-detail__size-label">{t('productDetail.selectSize')}</label>
                  <div className="product-detail__size-grid" role="radiogroup" aria-label="Size selection">
                    {availableSizes.map((size) => (
                      <button
                        key={size.label}
                        className={`product-detail__size-btn ${selectedSize === size.label ? 'is-selected' : ''}`}
                        onClick={() => setSelectedSize(size.label)}
                        role="radio"
                        aria-checked={selectedSize === size.label}
                        data-parallax
                      >
                        <span className="product-detail__size-name">{size.label}</span>
                        <span className="product-detail__size-range">{size.range}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-detail__quantity">
                <label className="product-detail__qty-label">{t('productDetail.quantity')}</label>
                <div className="product-detail__qty-stepper">
                  <button
                    className="product-detail__qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    data-parallax
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    className="input product-detail__qty-input"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="99"
                    aria-label="Quantity"
                  />
                  <button
                    className="product-detail__qty-btn"
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    aria-label="Increase quantity"
                    data-parallax
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                className="btn btn--filled btn--full product-detail__add-btn"
                onClick={handleAddToCart}
                disabled={!selectedSize || availableSizes.length === 0}
                data-parallax
              >
                {t('productDetail.addToCart')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <div className="product-detail__cod">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5" />
                  <path d="M7 21v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                </svg>
                <span>{t('productDetail.cashOnDelivery')}</span>
              </div>

              {product.features.length > 0 && (
                <div className="product-detail__features">
                  <h3 className="product-detail__features-title">{t('productDetail.features')}</h3>
                  <ul className="product-detail__features-list" role="list">
                    {product.features.map((feature, index) => (
                      <li key={index} className="product-detail__feature">
                        <span className="product-detail__feature-index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="product-detail__feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {product.showcaseImages.length > 0 && (
            <div className="product-detail__showcase" data-reveal>
              <div className="container">
                <h2 className="section-title product-detail__showcase-title">{t('productDetail.inDetail')}</h2>
                <div className="product-detail__showcase-grid">
                  {product.showcaseImages.map((img, index) => (
                    <div key={index} className="product-detail__showcase-item" data-parallax>
                      <img src={img} alt={`${product.name} detail ${index + 1}`} loading="lazy" 
                           onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {product.videoUrl && (
            <div className="product-detail__video" data-reveal>
              <div className="container">
                <h2 className="section-title product-detail__video-title">{t('productDetail.motion')}</h2>
                <div className="product-detail__video-wrapper">
                  <video src={product.videoUrl} controls poster={product.images[0]} className="product-detail__video-player" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />

      <Footer />
    </>
  );
}