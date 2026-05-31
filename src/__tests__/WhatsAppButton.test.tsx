import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhatsAppButton from '@/components/WhatsAppButton';

const EXPECTED_NUMBER = '5491156215140';
const EXPECTED_URL_BASE = `https://wa.me/${EXPECTED_NUMBER}`;

describe('WhatsAppButton', () => {
  it('renderiza un enlace', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('el href contiene el número correcto', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining(EXPECTED_URL_BASE));
  });

  it('abre en nueva pestaña', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('tiene rel noopener noreferrer', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('tiene aria-label descriptivo', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link).toBeInTheDocument();
  });

  it('la URL incluye un mensaje pre-cargado', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    const href = link.getAttribute('href') ?? '';
    expect(href).toContain('?text=');
  });

  it('tiene la clase CSS whatsapp-fab', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('whatsapp-fab');
  });
});
