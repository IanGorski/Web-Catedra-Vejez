import type { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Banner from '../src/sections/Banner';
import LangSwitcher from '../src/components/LangSwitcher';
import { LangContext, type LangContextValue } from '../src/hooks/useLang';

function renderWithLang(ui: ReactNode, overrides?: Partial<LangContextValue>) {
  const value: LangContextValue = {
    lang: 'es',
    setLang: vi.fn(),
    toggle: vi.fn(),
    ...overrides,
  };
  return {
    ...render(<LangContext.Provider value={value}>{ui}</LangContext.Provider>),
    value,
  };
}
describe('Banner y selector de idioma', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('banner se cierra y persiste estado dismiss', () => {
    renderWithLang(<Banner />);
    const closeBtn = screen.getByRole('button', { name: /cerrar aviso/i });
    fireEvent.click(closeBtn);
    expect(localStorage.getItem('bannerDismissed')).toBe('1');
    expect(screen.queryByRole('alert')).toBeNull();
  });
  it('lang switcher ejecuta toggle al clickear', () => {
    const toggleSpy = vi.fn();
    renderWithLang(<LangSwitcher />, { toggle: toggleSpy });
    const btn = screen.getByRole('button', { name: /cambiar a inglés/i });
    fireEvent.click(btn);
    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });
});
