import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import FontSizeControls from '../src/components/FontSizeControls';

describe('FontSizeControls', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('cicla nivel de fuente en cada click', () => {
    render(<FontSizeControls />);
    const btn = screen.getByRole('button', { name: /ajustar tamaño de letra/i });
    expect(btn.className).toContain('level-0');
    fireEvent.click(btn);
    expect(btn.className).toContain('level-1');
    fireEvent.click(btn);
    expect(btn.className).toContain('level-2');
    fireEvent.click(btn);
    expect(btn.className).toContain('level-0');
  });
  it('muestra hint inicial y lo oculta despues de unos segundos', () => {
    render(<FontSizeControls />);
    const hint = screen.getByText('Ajustar tamaño de texto');
    expect(hint.className).toContain('is-visible');
    act(() => {
      vi.advanceTimersByTime(4300);
    });
    expect(hint.className).not.toContain('is-visible');
  });
  it('persista preferencia en localStorage y variable CSS', () => {
    render(<FontSizeControls />);
    const btn = screen.getByRole('button', { name: /ajustar tamaño de letra/i });
    fireEvent.click(btn); // level 1
    expect(localStorage.getItem('fontSizePref')).toBe('1');
    expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('1.15');
  });
});
