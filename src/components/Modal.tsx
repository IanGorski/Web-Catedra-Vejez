import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  accent?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, accent, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Cerrar con ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.body.classList.toggle('section-modal-open', isOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('section-modal-open');
    };
  }, [isOpen]);

  // Foco al abrir
  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <div
      className={`section-modal${isOpen ? ' section-modal--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-hidden={!isOpen}
    >
      <div className="section-modal-overlay" onClick={onClose} aria-hidden="true" />

      <div className="section-modal-panel" ref={panelRef} tabIndex={-1}>
        {/* Header */}
        <div
          className="section-modal-header"
          style={accent ? { borderBottomColor: accent } : undefined}
        >
          {accent && (
            <span
              className="section-modal-accent-dot"
              style={{ background: accent }}
              aria-hidden="true"
            />
          )}
          <h2 className="section-modal-title">{title}</h2>
          <button className="section-modal-close" onClick={onClose} aria-label="Cerrar panel">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Contenido de la sección */}
        <div className="section-modal-body">
          {isOpen && children}
        </div>
      </div>
    </div>
  );
}
