import { useEffect } from 'react';
import './Lightbox.css';

export default function Lightbox({ isOpen, onClose, images, currentIndex, onIndexChange }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onIndexChange((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onIndexChange((currentIndex + 1) % images.length);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image lightbox">
      <div className="lightbox__overlay" onClick={onClose} />
      <button className="lightbox__close" onClick={onClose} data-parallax aria-label="Close lightbox">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={() => onIndexChange((currentIndex - 1 + images.length) % images.length)} data-parallax aria-label="Previous image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="lightbox__nav lightbox__nav--next" onClick={() => onIndexChange((currentIndex + 1) % images.length)} data-parallax aria-label="Next image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <div className="lightbox__content">
        <img 
          src={images[currentIndex]} 
          alt={`Image ${currentIndex + 1} of ${images.length}`}
          className="lightbox__image"
        />
      </div>
      <div className="lightbox__counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
