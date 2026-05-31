import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLang();
  const t = i18n[lang].footer;
  return (
    <>
      {/* Separador tipográfico sobre el footer */}
      <div className="footer-divider-top" aria-hidden="true">
        <span className="footer-divider-lema">{t.lema}</span>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
          <div className="footer-brand">
            <a href="https://www.psi.uba.ar" target="_blank" rel="noopener noreferrer" className="footer-facultad-logo" aria-label={t.facultad + ' UBA'}>
              <span className="footer-facultad-text">{t.facultad}</span>
              <span className="footer-facultad-sub">{t.uba}</span>
            </a>
            <p className="footer-brand-title">
              {t.brandTitle.split('\n').map((line, i) => (
                <span key={`${lang}-brand-title-${i}`}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>
            <p className="footer-brand-sub">{t.brandSub}</p>
            <blockquote className="footer-lema">{t.lema}</blockquote>
          </div>
          <nav className="footer-nav" aria-label={t.facultad}>
            <h4 className="footer-title">{t.nav1Title}</h4>
            <ul>
              {t.nav1.map(({ href, label }: any) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <nav className="footer-nav" aria-label={t.servicios}>
            <h4 className="footer-title">{t.servicios}</h4>
            <ul>
              {t.nav2.map(({ href, label }: any) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="footer-contact">
            <h4 className="footer-title">{t.seguir}</h4>
            <p className="footer-sub">{t.sub}</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/terceraedadyvejezuba" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1YfyxUyy1L/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://youtube.com/@catedraterceraedadyvejez" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
              <a href="mailto:catedraterceraedadyvejez@gmail.com" className="social-btn" aria-label="Correo electrónico">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
            <p className="footer-email">
              <a href={`mailto:${t.email}`}>{t.email}</a>
            </p>
          </div>
        </div>{/* footer-grid */}
        <div className="footer-bottom">
          <p>&copy; {year} {t.copyright}</p>
          <a href="https://www.psi.uba.ar" target="_blank" rel="noopener noreferrer">{t.psiuba}</a>
        </div>
      </div>
    </footer>
    </>
  );
}
