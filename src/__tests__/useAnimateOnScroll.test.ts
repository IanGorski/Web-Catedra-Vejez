import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

// Mocks de métodos del observer — compartidos entre tests
const mockObserve    = vi.fn();
const mockUnobserve  = vi.fn();
const mockDisconnect = vi.fn();
const mockConstructor = vi.fn();   // spy para contar instanciaciones
let capturedCallback: IntersectionObserverCallback;

// Class-based mock: compatible con `new IntersectionObserver(cb, opts)`
class MockIntersectionObserver {
  observe   = mockObserve;
  unobserve = mockUnobserve;
  disconnect = mockDisconnect;
  constructor(cb: IntersectionObserverCallback) {
    capturedCallback = cb;
    mockConstructor();
  }
}

describe('useAnimateOnScroll', () => {
  beforeEach(() => {
    (globalThis as unknown as Record<string, unknown>).IntersectionObserver = MockIntersectionObserver;
    mockObserve.mockClear();
    mockUnobserve.mockClear();
    mockDisconnect.mockClear();
    mockConstructor.mockClear();
    document.body.innerHTML = '';
  });

  it('crea un IntersectionObserver al montar', () => {
    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    renderHook(() => useAnimateOnScroll());
    expect(mockConstructor).toHaveBeenCalledOnce();
  });

  it('observa todos los elementos [data-animate]', () => {
    for (let i = 0; i < 3; i++) {
      const el = document.createElement('div');
      el.setAttribute('data-animate', '');
      document.body.appendChild(el);
    }

    renderHook(() => useAnimateOnScroll());
    expect(mockObserve).toHaveBeenCalledTimes(3);
  });

  it('no crea observer si no hay elementos [data-animate]', () => {
    renderHook(() => useAnimateOnScroll());
    expect(mockConstructor).not.toHaveBeenCalled();
  });

  it('agrega clase is-visible cuando el elemento entra en pantalla', () => {
    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    renderHook(() => useAnimateOnScroll());

    // Simular intersección
    capturedCallback(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(el.classList.contains('is-visible')).toBe(true);
  });

  it('llama unobserve después de que el elemento se hace visible', () => {
    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    renderHook(() => useAnimateOnScroll());

    capturedCallback(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(mockUnobserve).toHaveBeenCalledWith(el);
  });

  it('NO agrega is-visible si el elemento no está en pantalla', () => {
    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    renderHook(() => useAnimateOnScroll());

    capturedCallback(
      [{ isIntersecting: false, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(el.classList.contains('is-visible')).toBe(false);
  });

  it('desconecta el observer al desmontar', () => {
    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    const { unmount } = renderHook(() => useAnimateOnScroll());
    unmount();
    expect(mockDisconnect).toHaveBeenCalledOnce();
  });

  it('el useEffect solo se ejecuta una vez ([] dependency)', () => {
    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    const { rerender } = renderHook(() => useAnimateOnScroll());
    rerender();
    rerender();

    // Observer solo creado una vez aunque se re-renderice
    expect(mockConstructor).toHaveBeenCalledTimes(1);
  });
});
