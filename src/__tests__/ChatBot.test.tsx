import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ChatBot from '@/components/ChatBot/ChatBot';

beforeEach(() => {
  vi.useFakeTimers();
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    value: vi.fn(),
  });
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('ChatBot', () => {
  it('permite iniciar una nueva conversación después de consultar', () => {
    render(<ChatBot />);

    fireEvent.click(screen.getByRole('button', { name: /abrir asistente virtual/i }));

    expect(screen.queryByRole('button', { name: /iniciar nueva conversación/i })).not.toBeInTheDocument();

    const input = screen.getByRole('textbox', { name: /escribí tu consulta/i });
    fireEvent.change(input, { target: { value: 'Horarios de cursada' } });
    fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(screen.getByRole('button', { name: /iniciar nueva conversación/i })).toBeInTheDocument();
    expect(screen.getByText('Horarios de cursada')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(800);
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar nueva conversación/i }));

    expect(screen.queryByText('Horarios de cursada')).not.toBeInTheDocument();
    expect(screen.getByText(/¡Hola! Soy el asistente de la Cátedra Vejez UBA\./i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /iniciar nueva conversación/i })).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /escribí tu consulta/i })).toHaveValue('');
  });
});
