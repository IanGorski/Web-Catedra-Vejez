import type { ReactNode } from 'react';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

const PILAR_ICONS: ReactNode[] = [
  // Docencia / Teaching
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>,
  // Investigación / Research
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>,
  // Extensión / Extension
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // Clínica / Clinical
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>,
  // Formación continua / Continuing Education
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>,
];

export default function Nosotros() {
  const { lang } = useLang();
  const t = i18n[lang].nosotros;

  return (
    <section id="nosotros" className="section section--light">
      <div className="container">

        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.subheading}</p>
        </header>

        <div className="nosotros-titular" data-animate>
          <div className="titular-avatar">
            <img src="/img/JefeCatedra.png" alt={t.professorName} loading="lazy" />
          </div>
          <div className="titular-info">
            <p className="titular-cargo">{t.professorTitle}</p>
            <h3 className="titular-nombre">{t.professorName}</h3>
            <p className="titular-desc">{t.professorDesc}</p>
          </div>
        </div>

        <div className="nosotros-body" data-animate>
          <div className="nosotros-texto">
            <p>{t.bodyText1}</p>
            <p>{t.bodyText2}</p>
            <blockquote className="nosotros-lema">
              "{t.motto}"
            </blockquote>
          </div>
          <aside className="nosotros-datos">
            <div className="info-card">
              <h4>{t.infoTitle}</h4>
              <dl className="info-list">
                {t.infoItems.map(({ label, value }) => (
                  <div className="info-item" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        <div className="nosotros-pilares" data-animate>
          <h3 className="nosotros-pilares-titulo">{t.pillarsTitle}</h3>
          <div className="pilares-grid">
            {t.pillars.map(({ title, desc }, i) => (
              <div className="pilar-card" key={title}>
                <div className="pilar-icono" aria-hidden="true">
                  {PILAR_ICONS[i]}
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
