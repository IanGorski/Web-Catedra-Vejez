import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

const CARD_CLASSES = ['audience-card--estudiantes', 'audience-card--featured', 'audience-card--mayores'];
const CARD_BTN_CLASSES = ['btn-outline', 'btn-white', 'btn-outline'];
const CARD_ICONS = [
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
  </svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>,
];

export default function Audiencias() {
  const { lang } = useLang();
  const t = i18n[lang].audiencias;
  return (
    <section id="audiencias" className="section">
      <div className="container">
        <header className="section-header">
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>
        <div className="audience-grid">
          {t.cards.map((card, idx) => (
            <article key={idx} className={`audience-card ${CARD_CLASSES[idx]}`} data-animate data-delay={String(idx + 1)} data-num={String(idx + 1).padStart(2, '0')}>
              <div className="audience-icon">{CARD_ICONS[idx]}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <ul className="audience-list">
                {card.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href={card.href} className={`btn ${CARD_BTN_CLASSES[idx]} btn-sm`}>{card.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
