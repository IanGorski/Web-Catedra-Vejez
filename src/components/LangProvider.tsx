import type { ReactNode } from 'react';
import { LangContext, useLangState, getInitialLang } from '@/hooks/useLang';

export default function LangProvider({ children }: { children: ReactNode }) {
  const value = useLangState(getInitialLang());
  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}
