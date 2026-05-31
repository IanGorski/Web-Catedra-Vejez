import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '@/components/Modal';

describe('Modal', () => {
  it('no renderiza contenido visible cuando isOpen=false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test modal">
        <p>Contenido</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveAttribute('aria-hidden', 'true');
  });

  it('renderiza el contenido cuando isOpen=true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test modal">
        <p>Contenido del modal</p>
      </Modal>
    );
    expect(screen.getByText('Contenido del modal')).toBeInTheDocument();
  });

  it('muestra el título en el header', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Mi título">
        <p>x</p>
      </Modal>
    );
    expect(screen.getByText('Mi título')).toBeInTheDocument();
  });

  it('llama onClose al hacer clic en el botón cerrar', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <p>x</p>
      </Modal>
    );
    const closeBtn = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('llama onClose al hacer clic en el overlay', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <p>x</p>
      </Modal>
    );
    const overlay = container.querySelector('.section-modal-overlay');
    expect(overlay).not.toBeNull();
    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('llama onClose al presionar ESC', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <p>x</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('NO llama onClose al presionar otra tecla', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <p>x</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('bloquea el scroll del body cuando está abierto', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test">
        <p>x</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('libera el scroll del body al cerrar', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test">
        <p>x</p>
      </Modal>
    );
    rerender(
      <Modal isOpen={false} onClose={vi.fn()} title="Test">
        <p>x</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('');
  });

  it('no escucha ESC cuando está cerrado', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={false} onClose={onClose} title="Test">
        <p>x</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('aplica el color de acento al header cuando se pasa accent', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test" accent="#E8916A">
        <p>x</p>
      </Modal>
    );
    const dot = container.querySelector('.section-modal-accent-dot');
    expect(dot).not.toBeNull();
    expect((dot as HTMLElement).style.background).toBe('rgb(232, 145, 106)');
  });
});
