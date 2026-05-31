import { useForm } from '@/hooks/useForm';
import { FormStatusEl } from '@/components/ui';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

function ClinicaForm() {
  const { lang } = useLang();
  const f = i18n[lang].clinica.form;
  const { status, statusMsg, handleSubmit, onBlur, onInput } = useForm(
    'clinicaForm',
    'mojrdwqn'
  );
  return (
    <form id="clinicaForm" className="contact-form clinica-form" noValidate onSubmit={handleSubmit}>
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value={f.subject} />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="clinica-nombre">{f.nombre} <span aria-hidden="true">*</span></label>
          <input type="text" id="clinica-nombre" name="nombre" autoComplete="name" required onBlur={onBlur} onInput={onInput} />
        </div>
        <div className="form-group">
          <label htmlFor="clinica-email">{f.email} <span aria-hidden="true">*</span></label>
          <input type="email" id="clinica-email" name="email" autoComplete="email" required onBlur={onBlur} onInput={onInput} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="clinica-telefono">{f.telefono} <span aria-hidden="true">*</span></label>
          <input type="tel" id="clinica-telefono" name="telefono" autoComplete="tel" required onBlur={onBlur} onInput={onInput} />
        </div>
        <div className="form-group">
          <label htmlFor="clinica-para-quien">{f.paraQuien}</label>
          <select id="clinica-para-quien" name="para_quien">
            {f.paraQuienOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="clinica-servicio">{f.servicio}</label>
          <select id="clinica-servicio" name="servicio">
            {f.servicioOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="clinica-modalidad">{f.modalidad}</label>
          <select id="clinica-modalidad" name="modalidad">
            {f.modalidadOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="clinica-mensaje">{f.mensaje} <span aria-hidden="true">*</span></label>
        <textarea id="clinica-mensaje" name="mensaje" rows={4} required onBlur={onBlur} onInput={onInput} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? f.sending : f.send}
      </button>
      <FormStatusEl msg={statusMsg} type={status} />
    </form>
  );
}

export default function Clinica() {
  const { lang } = useLang();
  const t = i18n[lang].clinica;
  return (
    <section id="clinica" className="section">
      <div className="container">
        <div className="two-col two-col--reverse">
          <div className="two-col-content" data-animate>
            <p className="section-eyebrow">{t.eyebrow}</p>
            <h2>{t.heading}</h2>
            <p>{t.body}</p>
            <div className="clinic-features">
              {t.features.map((feat, idx) => (
                <div key={idx} className="clinic-feature">
                  <span className="feature-dot" /><span>{feat}</span>
                </div>
              ))}
            </div>
            <div className="clinica-pdf-row">
              <a href="#" className="btn btn-outline" aria-label={t.downloadLabel} onClick={(e) => e.preventDefault()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {t.downloadLabel}
              </a>
            </div>
          </div>
          <aside className="two-col-side" data-animate>
            <div className="steps-card">
              <h4>{t.steps.heading}</h4>
              <ol className="steps-list">
                {t.steps.items.map((item, idx) => (
                  <li key={idx}>
                    <span className="step-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
        <div className="clinica-form-wrapper" data-animate>
          <h3 className="clinica-form-titulo">{t.formTitle}</h3>
          <p className="clinica-form-desc">{t.formDesc}</p>
          <ClinicaForm />
        </div>
      </div>
    </section>
  );
}
