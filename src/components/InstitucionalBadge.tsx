import { useState, useEffect, useRef } from 'react';

const INFO_ITEMS = [
  { label: 'Facultad', value: 'Psicología — UBA' },
  { label: 'Año de fundación', value: '1986' },
  { label: 'Área', value: 'Psicología del envejecimiento' },
  { label: 'Sede', value: 'Hipólito Yrigoyen 3242, CABA' },
  { label: 'Contacto', value: 'catedravejez@psi.uba.ar' },
];

export default function InstitucionalBadge() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Aparece 2s después de la carga — entrada discreta y salida diferida
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Cerrar al click fuera
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <>
      {/* Botón flotante */}
      <button
        className={`ib-trigger${mounted ? ' ib-trigger--visible' : ''}${open ? ' ib-trigger--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar información institucional' : 'Ver información institucional'}
        aria-expanded={open}
        aria-controls="ib-drawer"
      >
        <span className="ib-trigger-ring" aria-hidden="true" />
        <img
          src="/img/Isologo/isologo.jpeg"
          alt=""
          className="ib-trigger-img"
          draggable={false}
        />
      </button>

      {/* Información lateral */}
      <div
        id="ib-drawer"
        ref={drawerRef}
        className={`ib-drawer${open ? ' ib-drawer--open' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="Información institucional"
      >
        <div className="ib-drawer-header">
          <img src="/img/Isologo/isologo.jpeg" alt="Isologo Cátedra Vejez UBA" className="ib-drawer-isologo" />
          <div>
            <p className="ib-drawer-title">Cátedra de Psicología<br />de la Tercera Edad y Vejez</p>
            <p className="ib-drawer-inst">Facultad de Psicología · UBA</p>
          </div>
          <button
            className="ib-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="ib-drawer-list">
          {INFO_ITEMS.map(({ label, value }) => (
            <li key={label} className="ib-drawer-item">
              <span className="ib-drawer-label">{label}</span>
              <span className="ib-drawer-value">{value}</span>
            </li>
          ))}
        </ul>

        <a
          href="#nosotros"
          className="ib-drawer-cta"
          onClick={() => setOpen(false)}
        >
          Conocer la cátedra
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </>
  );
}
