import { useLang } from '@/hooks/useLang';

export default function LangSwitcher() {
  const { lang, toggle } = useLang();
  return (
    <button
      className="lang-switcher"
      aria-label={lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      onClick={toggle}
    >
      <span className={lang === 'es' ? 'lang-opt lang-opt--active' : 'lang-opt lang-opt--inactive'}>ES</span>
      <span className="lang-sep" aria-hidden="true">|</span>
      <span className={lang === 'en' ? 'lang-opt lang-opt--active' : 'lang-opt lang-opt--inactive'}>EN</span>
    </button>
  );
}
