import { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES } from '@/data/content';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

export default function Galeria() {
  const { lang } = useLang();
  const t = i18n[lang].galeria;
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openLightbox = useCallback((i: number) => {
    setIdx(i);
    setOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length), []);
  const next = useCallback(() => setIdx((i) => (i + 1) % GALLERY_IMAGES.length), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeLightbox, prev, next]);

  return (
    <>
      <section id="galeria" className="section section--light">
        <div className="container">
          <header className="section-header" data-animate>
            <p className="section-eyebrow">{t.eyebrow}</p>
            <h2>{t.heading}</h2>
            <p>{t.sub}</p>
          </header>
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={i}
                className={`gallery-item${i === 2 ? ' gallery-item--wide' : ''}`}
                aria-label={`${i + 1}: ${img.alt}`}
                data-animate
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="gallery-img"
                />
                <span className="gallery-caption">{img.alt.split('—')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div
          className="lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label={t.viewerLabel}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="lightbox-close" aria-label={t.closeLabel} onClick={closeLightbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button className="lightbox-prev" aria-label={t.prevLabel} onClick={prev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="lightbox-media">
            <img
              src={GALLERY_IMAGES[idx].src}
              alt={GALLERY_IMAGES[idx].alt}
              loading="eager"
              decoding="async"
              className="lightbox-img"
            />
          </div>
          <button className="lightbox-next" aria-label={t.nextLabel} onClick={next}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <p className="lightbox-caption">{GALLERY_IMAGES[idx].alt}</p>
          <p className="lightbox-counter" aria-live="polite">{idx + 1} / {GALLERY_IMAGES.length}</p>
        </div>
      )}
    </>
  );
}
