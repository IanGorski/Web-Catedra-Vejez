import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BackToTop } from '@/components/ui';

describe('BackToTop', () => {
  beforeEach(() => {
    // scrollY: no existe en jsdom, así que lo definimos para poder simular el scroll
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza el enlace', () => {
    render(<BackToTop />);
    const link = screen.getByRole('link', { name: /volver arriba/i });
    expect(link).toBeInTheDocument();
  });

  it('no tiene clase is-visible al inicio (scroll = 0)', () => {
    render(<BackToTop />);
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('is-visible');
  });

  it('agrega is-visible cuando scrollY > 300', () => {
    render(<BackToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true });
      fireEvent.scroll(window);
    });

    const link = screen.getByRole('link');
    expect(link).toHaveClass('is-visible');
  });

  it('remueve is-visible cuando scrollY vuelve a 0', () => {
    render(<BackToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true });
      fireEvent.scroll(window);
    });

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
      fireEvent.scroll(window);
    });

    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('is-visible');
  });

  it('llama window.scrollTo al hacer clic', () => {
    render(<BackToTop />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('previene el comportamiento por defecto al hacer clic', () => {
    render(<BackToTop />);
    const link = screen.getByRole('link');
    const event = fireEvent.click(link);
    // fireEvent.click devuelve true si no se llamó preventDefault y false si sí
    expect(event).toBe(false);
  });

  it('tiene aria-label correcto', () => {
    render(<BackToTop />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Volver arriba');
  });
});
