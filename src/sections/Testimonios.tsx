import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

export default function Testimonios() {
  const { lang } = useLang();
  const t = i18n[lang].testimonios;

  return (
    <section id="testimonios" className="section section--light">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>
        <div className="testimonios-grid">
          {t.items.map(({ text, initials, name, role, accent }, idx) => (
            <figure
              key={idx}
              className={`testimonial-card${accent ? ' testimonial-card--accent' : ''}`}
              data-animate
            >
              <blockquote><p>{text}</p></blockquote>
              <figcaption>
                <div className="testimonial-avatar" aria-hidden="true">{initials}</div>
                <div>
                  <cite>{name}</cite>
                  <span>{role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
