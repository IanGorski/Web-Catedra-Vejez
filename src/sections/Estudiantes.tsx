import { useForm } from '@/hooks/useForm';
import { FormStatusEl } from '@/components/ui';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

const CARD_ICONS = [
  <svg key={0} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>,
  <svg key={1} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>,
  <svg key={2} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key={3} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>,
];

function TutoriasForm() {
  const { lang } = useLang();
  const f = i18n[lang].estudiantes.form;
  const { status, statusMsg, handleSubmit, onBlur, onInput } = useForm(
    'tutoriasForm',
    'mqenqbae'
  );
  return (
    <form id="tutoriasForm" className="contact-form" noValidate onSubmit={handleSubmit}>
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value={f.subject} />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tutorias-nombre">{f.nombre} <span aria-hidden="true">*</span></label>
          <input type="text" id="tutorias-nombre" name="nombre" autoComplete="name" required onBlur={onBlur} onInput={onInput} />
        </div>
        <div className="form-group">
          <label htmlFor="tutorias-email">{f.email} <span aria-hidden="true">*</span></label>
          <input type="email" id="tutorias-email" name="email" autoComplete="email" required onBlur={onBlur} onInput={onInput} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tutorias-telefono">{f.telefono}</label>
          <input type="tel" id="tutorias-telefono" name="telefono" autoComplete="tel" onBlur={onBlur} onInput={onInput} />
        </div>
        <div className="form-group">
          <label htmlFor="tutorias-carrera">{f.carrera}</label>
          <select id="tutorias-carrera" name="carrera">
            {f.carreraOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tutorias-institucion">{f.institucion} <span aria-hidden="true">*</span></label>
          <input type="text" id="tutorias-institucion" name="institucion" required onBlur={onBlur} onInput={onInput} />
        </div>
        <div className="form-group">
          <label htmlFor="tutorias-avance">{f.avance}</label>
          <select id="tutorias-avance" name="avance">
            {f.avanceOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="tutorias-tema">{f.tema} <span aria-hidden="true">*</span></label>
        <input type="text" id="tutorias-tema" name="tema" required onBlur={onBlur} onInput={onInput} />
      </div>
      <div className="form-group">
        <label htmlFor="tutorias-mensaje">{f.mensaje} <span aria-hidden="true">*</span></label>
        <textarea id="tutorias-mensaje" name="mensaje" rows={4} required onBlur={onBlur} onInput={onInput} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? f.sending : f.send}
      </button>
      <FormStatusEl msg={statusMsg} type={status} />
    </form>
  );
}
export default function Estudiantes() {
  const { lang } = useLang();
  const t = i18n[lang].estudiantes;

  return (
    <section id="estudiantes" className="section">
      <div className="container">

        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>
        <div className="estudiantes-grid" data-animate>
          {t.cards.map(({ heading, desc, linkLabel, href, ariaLabel }, idx) => (
            <article key={idx} className="estudiantes-card">
              <div className="estudiantes-icon" aria-hidden="true">{CARD_ICONS[idx]}</div>
              <div className="estudiantes-card-body">
                <h3>{heading}</h3>
                <p>{desc}</p>
                <a
                  href={href}
                  className="link-arrow"
                  {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >{linkLabel}</a>
              </div>
            </article>
          ))}
        </div>
        <div className="practicas-section" data-animate>
          <h3 className="practicas-titulo">{t.practicas.titulo}</h3>
          <p className="practicas-desc">{t.practicas.desc}</p>
          <div className="practicas-grid">
            {[t.practicas.prof, t.practicas.inv].map((prac, idx) => (
              <article key={idx} className="practica-card">
                <span className={`practica-badge${idx === 1 ? ' practica-badge--alt' : ''}`}>{prac.badge}</span>
                <h4>{prac.heading}</h4>
                <p>{prac.desc}</p>
                <dl className="practica-datos">
                  <div><dt>{prac.modalidad}</dt><dd>{prac.modalidadVal}</dd></div>
                  <div><dt>{prac.docente}</dt><dd>{prac.docenteVal}</dd></div>
                  <div><dt>{prac.cupo}</dt><dd>{prac.cupoVal}</dd></div>
                </dl>
                <a href="#contacto" className="btn btn-outline btn-sm">{prac.cta}</a>
              </article>
            ))}
          </div>
        </div>
        <div className="diplomatura-banner" data-animate>
          <div className="diplomatura-banner-content">
            <span className="diplomatura-badge">{t.banner.badge}</span>
            <h3>{t.banner.heading}</h3>
            <p>{t.banner.desc}</p>
          </div>
          <a href="#posgrado" className="btn btn-primary">{t.banner.cta}</a>
        </div>
        <div className="tutorias-form-wrapper" data-animate>
          <div className="tutorias-form-header">
            <p className="section-eyebrow">{t.tutorias.eyebrow}</p>
            <h3>{t.tutorias.heading}</h3>
            <p>{t.tutorias.desc}</p>
          </div>
          <TutoriasForm />
        </div>
      </div>
    </section>
  );
}
