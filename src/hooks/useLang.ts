import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Lang = 'es' | 'en';

export const LANG_KEY = 'lang';

export function getInitialLang(): Lang {
  const stored = localStorage.getItem(LANG_KEY) as Lang | null;
  if (stored === 'en' || stored === 'es') return stored;
  return 'es';
}

export interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

export const LangContext = createContext<LangContextValue | null>(null);

export function useLangState(initial: Lang) {
  const [lang, setLangState] = useState<Lang>(initial);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    window.dispatchEvent(new Event('langchange'));
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle  = useCallback(() => setLangState((l) => (l === 'es' ? 'en' : 'es')), []);

  return { lang, setLang, toggle };
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
