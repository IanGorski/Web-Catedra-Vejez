import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

export default function Investigacion() {
  const { lang } = useLang();
  const t = i18n[lang].investigacion;

  return (
    <section id="investigacion" className="section">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>
        <div className="research-grid">
          {t.lines.map(({ num, title, desc }) => (
            <article key={num} className="research-card" data-animate>
              <span className="research-num">{num}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
