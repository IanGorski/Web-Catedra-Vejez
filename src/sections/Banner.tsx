import { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

export default function Banner() {
  const [dismissed, setDismissed] = useState(false);
  const { lang } = useLang();
  const t = i18n[lang].banner;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--banner-h', dismissed ? '0px' : '');
  }, [dismissed]);

  const close = () => {
    setDismissed(true);
    document.documentElement.style.setProperty('--banner-h', '0px');
  };
  if (dismissed) return null;

  return (
    <div id="novedadesBanner" className="banner" role="alert" aria-label={t.tag}>
      <div className="banner-inner">
        <span className="banner-tag">{t.tag}</span>
        <p>
          <strong>{t.strong}</strong>{' '}{t.text}{' '}
          <a href="#posgrado" className="banner-link">{t.cta}</a>
        </p>
      </div>
      <button id="bannerClose" className="banner-close" aria-label={t.close} onClick={close}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
