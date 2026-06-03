import { useForm } from '@/hooks/useForm';
import { FormStatusEl } from '@/components/ui';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

function PrensaForm() {
  const { lang } = useLang();
  const f = i18n[lang].prensa.form;
  const { status, statusMsg, handleSubmit, onBlur, onInput } = useForm(
    'prensaForm',
    'mykowjzw'
  );

  return (
    <form id="prensaForm" className="contact-form" noValidate onSubmit={handleSubmit}>
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value={f.subject} />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prensa-nombre">{f.nombre} <span aria-hidden="true">*</span></label>
          <input type="text" id="prensa-nombre" name="nombre" autoComplete="name" required onBlur={onBlur} onInput={onInput} />
        </div>
        <div className="form-group">
          <label htmlFor="prensa-email">{f.email} <span aria-hidden="true">*</span></label>
          <input type="email" id="prensa-email" name="email" autoComplete="email" required onBlur={onBlur} onInput={onInput} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prensa-telefono">{f.telefono}</label>
          <input type="tel" id="prensa-telefono" name="telefono" autoComplete="tel" onBlur={onBlur} onInput={onInput} />
        </div>
        <div className="form-group">
          <label htmlFor="prensa-medio">{f.medio} <span aria-hidden="true">*</span></label>
          <input type="text" id="prensa-medio" name="medio" required onBlur={onBlur} onInput={onInput} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="prensa-tipo">{f.tipo}</label>
        <select id="prensa-tipo" name="tipo">
          {f.tipoOptions.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="prensa-descripcion">{f.descripcion} <span aria-hidden="true">*</span></label>
        <textarea id="prensa-descripcion" name="descripcion" rows={4} required onBlur={onBlur} onInput={onInput} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? f.sending : f.send}
      </button>
      <FormStatusEl msg={statusMsg} type={status} />
    </form>
  );
}

function NewsletterForm() {
  const { lang } = useLang();
  const n = i18n[lang].prensa.newsletter;
  const rssSubscribeUrl = `https://blogtrottr.com/?subscribe=${encodeURIComponent('https://catedraterceraedadyvejez.psi.uba.ar/rss.xml')}`;
  const { status, statusMsg, handleSubmit, onBlur, onInput } = useForm(
    'newsletterForm',
    'mykowjzw'
  );

  return (
    <form id="newsletterForm" className="newsletter-form" noValidate onSubmit={handleSubmit}>
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value={n.subject} />
      <input type="hidden" name="tipo" value="newsletter" />
      <input type="hidden" name="origen" value="seccion-prensa" />
      <div className="newsletter-form__row">
        <label htmlFor="newsletter-email" className="newsletter-form__label">{n.email}</label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          required
          autoComplete="email"
          className="newsletter-form__input"
          placeholder={n.placeholder}
          onBlur={onBlur}
          onInput={onInput}
        />
        <button type="submit" className="btn btn-primary newsletter-form__btn" disabled={status === 'loading'}>
          {status === 'loading' ? n.sending : n.send}
        </button>
      </div>
      <p className="newsletter-form__help">{n.help}</p>

      <div className="newsletter-rss-box">
        <p className="newsletter-rss-box__title">{n.rssTitle}</p>
        <p className="newsletter-rss-box__desc">{n.rssDesc}</p>
        <a
          href={rssSubscribeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary newsletter-rss-box__cta"
          aria-label={n.rssLinkLabel}
        >
          {n.rssCta}
        </a>
      </div>

      <FormStatusEl msg={statusMsg} type={status} />
    </form>
  );
}

export default function Prensa() {
  const { lang } = useLang();
  const t = i18n[lang].prensa;

  return (
    <section id="prensa" className="section section--light">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>

        <div className="prensa-grid" data-animate>
          {t.items.map(({ tag, cls, nombre, fecha, desc, linkLabel }, idx) => (
            <article key={idx} className="prensa-card">
              <span className={`prensa-tag${cls ? ` ${cls}` : ''}`}>{tag}</span>
              <div className="prensa-info">
                <h3>{nombre}</h3>
                <p className="prensa-fecha">{fecha}</p>
                <p>{desc}</p>
                <a href="#" target="_blank" rel="noopener noreferrer" className="link-arrow" onClick={(e) => e.preventDefault()}>{linkLabel}</a>
              </div>
            </article>
          ))}
        </div>

        <div className="prensa-redes" data-animate>
          <p className="prensa-redes-titulo">{t.redesTitle}</p>
          <div className="prensa-redes-links">
            <a href="https://www.facebook.com/share/1YfyxUyy1L/" target="_blank" rel="noopener noreferrer" className="prensa-red-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Facebook
            </a>
            <a href="https://youtube.com/@catedraterceraedadyvejez" target="_blank" rel="noopener noreferrer" className="prensa-red-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
              YouTube
            </a>
            <a href="https://www.instagram.com/terceraedadyvejezuba" target="_blank" rel="noopener noreferrer" className="prensa-red-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
          </div>
        </div>

        <div className="newsletter-wrapper" data-animate>
          <div className="newsletter-header">
            <h3>{t.newsletter.heading}</h3>
            <p>{t.newsletter.sub}</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="prensa-form-wrapper" data-animate>
          <div className="prensa-form-header">
            <h3>{t.formHeader.heading}</h3>
            <p>{t.formHeader.sub}</p>
          </div>
          <PrensaForm />
        </div>
      </div>
    </section>
  );
}
