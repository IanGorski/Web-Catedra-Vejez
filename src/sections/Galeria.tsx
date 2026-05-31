import { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES } from '@/data/content';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

const HUES = [270, 220, 300, 240, 260, 200];

const CamIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

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
                {/* TODO: reemplazar placeholder por <img src={img.src} alt={img.alt} loading="lazy" /> */}
                <div
                  className="gallery-placeholder"
                  style={{ '--ph-hue': HUES[i] } as React.CSSProperties}
                >
                  <CamIcon />
                </div>
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
            {/* TODO: cambiar a <img> cuando existan las imágenes reales */}
            <div
              className="gallery-placeholder gallery-placeholder--lg"
              style={{ '--ph-hue': HUES[idx] } as React.CSSProperties}
            >
              <CamIcon />
            </div>
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
