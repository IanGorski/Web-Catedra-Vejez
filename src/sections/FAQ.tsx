import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

const ChevronIcon = () => (
  <svg className="faq-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
export default function FAQ() {
  const { lang } = useLang();
  const t = i18n[lang].faq;
  return (
    <section id="faq" className="section">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>
        <div className="faq-grid">
          <div className="faq-col" data-animate>
            {t.left.map(({ q, a }, idx) => (
              <details key={idx} className="faq-item">
                <summary className="faq-trigger"><span>{q}</span><ChevronIcon /></summary>
                <div className="faq-body"><p dangerouslySetInnerHTML={{ __html: a }} /></div>
              </details>
            ))}
          </div>
          <div className="faq-col" data-animate>
            {t.right.map(({ q, a }, idx) => (
              <details key={idx} className="faq-item">
                <summary className="faq-trigger"><span>{q}</span><ChevronIcon /></summary>
                <div className="faq-body"><p dangerouslySetInnerHTML={{ __html: a }} /></div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
