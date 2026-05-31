import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BackToTop } from '../src/components/ui';

describe('BackToTop UI', () => {
  it('incluye un icono visible de flecha hacia arriba', () => {
    const { container } = render(<BackToTop />);
    const link = screen.getByRole('link', { name: /volver arriba/i });
    const icon = container.querySelector('.back-to-top svg');

    expect(link).toBeInTheDocument();
    expect(icon).toBeTruthy();
  });
});
