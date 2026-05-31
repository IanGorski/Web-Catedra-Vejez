import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Navbar from '@/sections/Navbar';
import { LangContext, type LangContextValue } from '@/hooks/useLang';

function renderNavbar() {
  const value: LangContextValue = {
    lang: 'es',
    setLang: vi.fn(),
    toggle: vi.fn(),
  };
  return render(
    <LangContext.Provider value={value}>
      <Navbar />
    </LangContext.Provider>
  );
}

// Mock de IntersectionObserver para evitar errores en tests
class MockIntersectionObserver {
  observe   = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_cb: IntersectionObserverCallback) {}
}

beforeEach(() => {
  // IntersectionObserver: asignación directa (no vi.stubGlobal para evitar conflictos)
  (globalThis as unknown as Record<string, unknown>).IntersectionObserver = MockIntersectionObserver;
  // matchMedia: no existe en jsdom, se define globalmente
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals(); // solo afecta matchMedia (stubGlobal), no IntersectionObserver
});

describe('Navbar', () => {
  it('renderiza el componente', () => {
    renderNavbar();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('muestra el título de la cátedra', () => {
    renderNavbar();
    expect(screen.getByText(/cátedra vejez/i)).toBeInTheDocument();
  });

  it('tiene botón hamburguesa para menú móvil', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /abrir menú/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('abre el menú al hacer clic en hamburguesa', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('el botón cambia su aria-label a "Cerrar menú" cuando está abierto', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /cerrar menú/i })).toBeInTheDocument();
  });

  it('cierra el menú al hacer clic fuera de la navbar', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /abrir menú/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Clic fuera del nav
    fireEvent.click(document.body);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('tiene botón de alternancia de tema', () => {
    renderNavbar();
    const themeBtn = screen.getByRole('button', { name: /modo/i });
    expect(themeBtn).toBeInTheDocument();
  });

  it('el menú de navegación tiene los links principales', () => {
    renderNavbar();
    // Al menos uno de los links de secciones debe existir
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('#nosotros');
  });
});
