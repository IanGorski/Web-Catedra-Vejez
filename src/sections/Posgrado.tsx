import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

export default function Posgrado() {
  const { lang } = useLang();
  const t = i18n[lang].posgrado;

  const cards = [t.actualizacion, t.diplomatura];

  return (
    <section id="posgrado" className="section section--dark">
      <div className="container">

        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>

        <div className="posgrado-grid">
          {cards.map((card, idx) => (
            <article key={idx} className="posgrado-card" data-animate>
              <div className="posgrado-card-header">
                <span className="posgrado-tag">{card.tag}</span>
                <span className="posgrado-modalidad">{card.modalidad}</span>
              </div>
              <h3>{card.heading}</h3>
              <p>{card.desc}</p>
              <ul className="posgrado-features">
                {card.features.map((feat, fi) => <li key={fi}>{feat}</li>)}
              </ul>
              <div className="posgrado-card-footer">
                <p className="posgrado-costo-nota">{card.costoNota}</p>
                <a href={card.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-sm">
                  {card.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="posgrado-nota" data-animate>{t.nota}</p>

      </div>
    </section>
  );
}
