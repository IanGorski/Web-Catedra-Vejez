import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';
import { EVENTS } from '@/data/content';

export default function Agenda() {
  const { lang } = useLang();
  const t = i18n[lang].agenda;

  return (
    <section id="agenda" className="section">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>
        <div className="agenda-list" data-animate>
          {EVENTS.map((ev) => (
            <article key={ev.date} className="agenda-item">
              <h3>{ev.title}</h3>
              <p className="agenda-fecha">{ev.day} {ev.month}</p>
              <p className="agenda-desc">{ev.description}</p>
              <a href="#contacto" className="btn btn-sm btn-outline-primary">{t.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
