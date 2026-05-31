import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

const PersonIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
export default function Equipo() {
  const { lang } = useLang();
  const t = i18n[lang].equipo;
  return (
    <section id="equipo" className="section section--light">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>
        <div className="equipo-titular" data-animate>
          <div className="equipo-titular-foto" aria-hidden="true">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="equipo-titular-info">
            <span className="equipo-titular-badge">{t.titular.badge}</span>
            <h3>{t.titular.nombre}</h3>
            <p className="equipo-titular-titulo">{t.titular.titulo}</p>
            <p className="equipo-titular-desc">{t.titular.desc}</p>
            <p className="equipo-titular-desc">{t.titular.descExtra}</p>
          </div>
        </div>
        <div className="equipo-resto" data-animate>
          <h3 className="equipo-resto-titulo">{t.cuerpoDocente.titulo}</h3>
          <p className="equipo-resto-desc">{t.cuerpoDocente.desc}</p>
          <div className="team-grid">
            {t.teamRoles.map(({ role }, i) => (
              <article key={i} className="team-card">
                <div className="team-avatar" aria-hidden="true"><PersonIcon /></div>
                <h4>{t.teamPlaceholder}</h4>
                <p className="team-role">{role}</p>
                <p className="team-area">{t.teamArea}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
