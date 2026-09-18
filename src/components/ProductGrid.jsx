import ProductCard from './ProductCard';
import { useScrollRevealMultiple } from '../hooks/useScrollReveal';
import { useI18n } from '../context/I18nContext';
import './ProductGrid.css';

export default function ProductGrid({ products, title = 'COLLECTION', showViewAll = true, viewAllHref = '/collections/all' }) {
  const { t } = useI18n();
  const { setRef, isVisible } = useScrollRevealMultiple(products.length);

  return (
    <section className="product-grid" data-reveal>
      <header className="product-grid__header">
        <p className="eyebrow product-grid__eyebrow">{t('productGrid.newArrivals')}</p>
        <h2 className="section-title product-grid__title">{title}</h2>
        {showViewAll && (
          <a href={viewAllHref} className="text-link product-grid__view-all" data-parallax>
            {t('productGrid.viewAll')}
          </a>
        )}
      </header>

      <div className="product-grid__list" role="list">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            ref={setRef(index)}
            style={{ opacity: isVisible(index) ? 1 : 0, transform: isVisible(index) ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out)' }}
          />
        ))}
      </div>
    </section>
  );
}