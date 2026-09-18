import { useState, useMemo } from 'react';
import { products } from '../data/products';
import { useI18n } from '../context/I18nContext';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import './Catalog.css';

export default function Catalog() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('featured');

  const filters = [
    { id: 'all', label: t('catalog.filter.all') },
    { id: 'new', label: t('catalog.filter.new') },
    { id: 'bestsellers', label: t('catalog.filter.bestsellers') },
    { id: 'sale', label: t('catalog.filter.sale') },
  ];

  const sorts = [
    { id: 'featured', label: t('catalog.sort.featured') },
    { id: 'price-asc', label: t('catalog.sort.priceAsc') },
    { id: 'price-desc', label: t('catalog.sort.priceDesc') },
    { id: 'name-asc', label: t('catalog.sort.nameAsc') },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    switch (activeFilter) {
      case 'new':
        result = result.filter(p => p.isNew);
        break;
      case 'bestsellers':
        result = result.filter(p => p.isBestseller);
        break;
      case 'sale':
        result = result.filter(p => p.oldPrice && p.oldPrice > p.price);
        break;
    }

    switch (activeSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }

    return result;
  }, [activeFilter, activeSort]);

  return (
    <>
      <CustomCursor />
      <section className="catalog-hero">
        <div className="container">
          <p className="eyebrow catalog-hero__eyebrow">{t('catalog.collection')}</p>
          <h1 className="section-title catalog-hero__title">{t('catalog.allProducts')}</h1>
        </div>
      </section>

      <section className="catalog-filters">
        <div className="container">
          <div className="catalog-filters__inner">
            <div className="catalog-filters__group" role="group" aria-label="Filter products">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`catalog-filters__btn ${activeFilter === filter.id ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                  data-parallax
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="catalog-filters__group" role="group" aria-label="Sort products">
              <label htmlFor="sort-select" className="visually-hidden">Sort by</label>
              <select
                id="sort-select"
                className="input catalog-filters__sort"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                data-parallax
              >
                {sorts.map((sort) => (
                  <option key={sort.id} value={sort.id}>{sort.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <ProductGrid products={filteredProducts} title={`${t('catalog.allProducts')} (${filteredProducts.length})`} showViewAll={false} />

      <Footer />
    </>
  );
}