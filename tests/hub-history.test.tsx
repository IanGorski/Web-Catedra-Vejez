import { render, fireEvent, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Hub from '../src/sections/Hub';
import { LangContext, type LangContextValue } from '../src/hooks/useLang';

vi.mock('../src/components/Modal', () => ({
  default: ({ isOpen, onClose, title }: { isOpen: boolean; onClose: () => void; title: string }) => (
    <div data-testid="hub-modal" data-open={isOpen ? '1' : '0'}>
      <button type="button" onClick={onClose}>cerrar</button>
      <span>{title}</span>
    </div>
  ),
}));

vi.mock('@/sections/Nosotros', () => ({ default: () => <div>Nosotros</div> }));
vi.mock('@/sections/Equipo', () => ({ default: () => <div>Equipo</div> }));
vi.mock('@/sections/Investigacion', () => ({ default: () => <div>Investigacion</div> }));
vi.mock('@/sections/Publicaciones', () => ({ default: () => <div>Publicaciones</div> }));
vi.mock('@/sections/Prensa', () => ({ default: () => <div>Prensa</div> }));
vi.mock('@/sections/Estudiantes', () => ({ default: () => <div>Estudiantes</div> }));
vi.mock('@/sections/Posgrado', () => ({ default: () => <div>Posgrado</div> }));
vi.mock('@/sections/Recursos', () => ({ default: () => <div>Recursos</div> }));
vi.mock('@/sections/Clinica', () => ({ default: () => <div>Clinica</div> }));
vi.mock('@/sections/Noticias', () => ({ default: () => <div>Noticias</div> }));
vi.mock('@/sections/Agenda', () => ({ default: () => <div>Agenda</div> }));
vi.mock('@/sections/Galeria', () => ({ default: () => <div>Galeria</div> }));
vi.mock('@/sections/Testimonios', () => ({ default: () => <div>Testimonios</div> }));
vi.mock('@/sections/FAQ', () => ({ default: () => <div>FAQ</div> }));

function renderHub() {
  const value: LangContextValue = {
    lang: 'es',
    setLang: vi.fn(),
    toggle: vi.fn(),
  };
  return render(
    <LangContext.Provider value={value}>
      <Hub />
    </LangContext.Provider>
  );
}
describe('Hub - historial y boton atras', () => {
  beforeEach(() => {
    history.replaceState(null, '', '/');
    window.location.hash = '';
  });
  it('abre una card y agrega hash al historial', () => {
    const { container } = renderHub();
    const firstCard = container.querySelector('.hub-card') as HTMLButtonElement;
    expect(firstCard).toBeTruthy();
    fireEvent.click(firstCard);
    expect(window.location.hash.length).toBeGreaterThan(1);
    const modal = screen.getByTestId('hub-modal');
    expect(modal.getAttribute('data-open')).toBe('1');
  });
  it('cierra la card al recibir popstate (simula flecha atras movil)', () => {
    const { container } = renderHub();
    const firstCard = container.querySelector('.hub-card') as HTMLButtonElement;
    fireEvent.click(firstCard);
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    const modal = screen.getByTestId('hub-modal');
    expect(modal.getAttribute('data-open')).toBe('0');
  });
  it('sincroniza apertura/cierre por hashchange', () => {
    const { container } = renderHub();
    act(() => {
      window.location.hash = '#clinica';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    let modal = screen.getByTestId('hub-modal');
    expect(modal.getAttribute('data-open')).toBe('1');
    act(() => {
      window.location.hash = '#inicio';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    modal = screen.getByTestId('hub-modal');
    expect(modal.getAttribute('data-open')).toBe('0');
  });
});
