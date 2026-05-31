import { useForm } from '@/hooks/useForm';
import { FormStatusEl } from '@/components/ui';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

function ContactForm() {
  const { lang } = useLang();
  const t = i18n[lang].contacto;
  const { status, statusMsg, handleSubmit, onBlur, onInput } = useForm(
    'contactForm',
    'meengkoz'
  );
  return (
    <form id="contactForm" className="contact-form" noValidate data-animate onSubmit={handleSubmit}>
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value={t.subjectHidden} />
      <h3>{t.formHeading}</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombre">{t.nombre} <span aria-hidden="true">*</span></label>
          <input type="text" id="nombre" name="nombre" autoComplete="name" required onBlur={onBlur} onInput={onInput} />
        </div>
        <div className="form-group">
          <label htmlFor="email">{t.email} <span aria-hidden="true">*</span></label>
          <input type="email" id="email" name="email" autoComplete="email" required onBlur={onBlur} onInput={onInput} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="perfil">{t.perfil}</label>
          <select id="perfil" name="perfil">
            {t.perfilOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="asunto">{t.asunto}</label>
          <select id="asunto" name="asunto">
            {t.asuntoOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="mensaje">{t.mensaje} <span aria-hidden="true">*</span></label>
        <textarea id="mensaje" name="mensaje" rows={5} required onBlur={onBlur} onInput={onInput} />
      </div>
      <button type="submit" className="btn btn-primary btn-full" disabled={status === 'loading'}>
        {status === 'loading' ? t.sending : t.send}
      </button>
      <FormStatusEl msg={statusMsg} type={status} />
    </form>
  );
}
export default function Contacto() {
  const { lang } = useLang();
  const t = i18n[lang].contacto;
  return (
    <section id="contacto" className="section">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-info" data-animate>
            <p className="section-eyebrow">{t.eyebrow}</p>
            <h2>{t.heading}</h2>
            <p>{t.body}</p>
            <div className="contact-items">
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t.address}</span>
              </div>
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:catedraterceraedadyvejez@gmail.com">catedraterceraedadyvejez@gmail.com</a>
              </div>
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <a href="https://www.instagram.com/terceraedadyvejezuba" target="_blank" rel="noopener noreferrer">{t.instagram}</a>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://www.instagram.com/terceraedadyvejezuba" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1YfyxUyy1L/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://youtube.com/@catedraterceraedadyvejez" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
