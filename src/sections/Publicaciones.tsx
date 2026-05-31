import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';
import { PUBLICATIONS } from '@/data/content';

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Publicaciones() {
  const { lang } = useLang();
  const t = i18n[lang].publicaciones;

  return (
    <section id="publicaciones" className="section section--light">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>
        <div className="pub-grid">
          {PUBLICATIONS.map((pub, idx) => (
            <article key={idx} className="pub-card" data-animate>
              <div className="pub-meta">
                <span className={`pub-tag${pub.type === 'Tesis' ? ' accent' : ''}`}>{pub.type}</span>
                <span className="pub-year">{pub.year}</span>
              </div>
              <h3>{pub.title}</h3>
              <p className="pub-authors">{pub.authors}</p>
              <p className="pub-journal" dangerouslySetInnerHTML={{ __html: pub.journal }} />
              <a
                href={pub.href}
                {...(pub.doi ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="pub-doi"
              >
                <ExternalIcon />
                {pub.hrefLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
