import { useState, useEffect, lazy, Suspense, type ReactNode } from 'react';
import Modal from '@/components/Modal';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';
import Contacto from '@/sections/Contacto';

/* ── Lazy loading — cada sección se carga solo al abrir su modal ── */
const Nosotros      = lazy(() => import('@/sections/Nosotros'));
const Equipo        = lazy(() => import('@/sections/Equipo'));
const Investigacion = lazy(() => import('@/sections/Investigacion'));
const Publicaciones = lazy(() => import('@/sections/Publicaciones'));
const Prensa        = lazy(() => import('@/sections/Prensa'));
const Estudiantes   = lazy(() => import('@/sections/Estudiantes'));
const Posgrado      = lazy(() => import('@/sections/Posgrado'));
const Recursos      = lazy(() => import('@/sections/Recursos'));
const Clinica       = lazy(() => import('@/sections/Clinica'));
const Noticias      = lazy(() => import('@/sections/Noticias'));
const Agenda        = lazy(() => import('@/sections/Agenda'));
const Galeria       = lazy(() => import('@/sections/Galeria'));
const Testimonios   = lazy(() => import('@/sections/Testimonios'));
const FAQ           = lazy(() => import('@/sections/FAQ'));

/* ── Íconos inline ──────────────────────────────────────────── */
const icons: Record<string, ReactNode> = {
  nosotros: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  equipo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      <path d="M16 3.5a4 4 0 0 1 0 7" /><path d="M20 19.5c0-2.5-1.8-4.5-4-5" />
    </svg>
  ),
  investigacion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  publicaciones: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  prensa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8z" />
    </svg>
  ),
  estudiantes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  posgrado: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="14 2 14 8 20 8" /><path d="M20 22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10l8 8v10a2 2 0 0 1-2 2z" />
      <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  ),
  recursos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  clinica: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  contacto: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  noticias: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  agenda: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  galeria: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  testimonios: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  faq: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

/* ── Colores de acento por categoría (estáticos) ── */
const ACCENTS = ['#E8916A', '#EDDF52', '#8BA58A', '#7A9BBF'];

/* ── Mapa de secciones (componentes lazy) ── */
type SectionComponent = React.ComponentType;
const SECTION_COMPONENTS: Record<string, SectionComponent> = {
  nosotros:      Nosotros,
  equipo:        Equipo,
  investigacion: Investigacion,
  publicaciones: Publicaciones,
  prensa:        Prensa,
  estudiantes:   Estudiantes,
  posgrado:      Posgrado,
  recursos:      Recursos,
  clinica:       Clinica,
  contacto:      Contacto,
  noticias:      Noticias,
  agenda:        Agenda,
  galeria:       Galeria,
  testimonios:   Testimonios,
  faq:           FAQ,
};

export default function Hub() {
  const { lang } = useLang();
  const th = i18n[lang].hub;
  const [activeId,    setActiveId]    = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState('');
  const [activeAccent, setActiveAccent] = useState('');

  const resetActive = () => {
    setActiveId(null);
    setActiveTitle('');
    setActiveAccent('');
  };

  const open = (id: string, label: string, accent: string) => {
    setActiveId(id);
    setActiveTitle(label);
    setActiveAccent(accent);
    if (window.location.hash !== `#${id}`) {
      history.pushState({ hubModal: id }, '', `#${id}`);
    }
  };
  const close = () => {
    const activeHash = activeId ? `#${activeId}` : '';
    if (
      activeId &&
      window.location.hash === activeHash &&
      history.state?.hubModal === activeId
    ) {
      history.back();
      return;
    }
    resetActive();
    history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}`);
  };

  // Escucha cambios de hash (links del Navbar, Footer, Audiencias, Hero, Banner)
  useEffect(() => {
    const allItems = th.categories.flatMap((c, idx) =>
      c.items.map((item) => ({ ...item, accent: ACCENTS[idx] }))
    );
    // IDs que existen como secciones propias en la página principal
    const MAIN_PAGE_IDS = ['inicio', 'audiencias', 'stats', 'hub', 'contacto'];
    const syncWithHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || MAIN_PAGE_IDS.includes(hash)) {
        resetActive();
        return;
      }
      const match = allItems.find((i) => i.id === hash);
      if (match) {
        setActiveId(match.id);
        setActiveTitle(match.label);
        setActiveAccent(match.accent);
        return;
      }
      resetActive();
    };

    const onPopState = () => {
      const hash = window.location.hash.slice(1);
      // Fallback para móviles: si vuelve atrás pero mantiene el mismo hash,
      // cerramos igual el modal para evitar pantalla en blanco o estado trabado.
      if (activeId && hash === activeId) {
        resetActive();
        history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}`);
        return;
      }
      syncWithHash();
    };

    const onHashChange = () => {
      syncWithHash();
    };

    syncWithHash(); // por si ya había hash al cargar
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onPopState);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, activeId]);

  return (
    <section id="hub" className="section hub-section">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{th.eyebrow}</p>
          <h2>{th.heading}</h2>
          <p>{th.sub}</p>
        </header>

        {th.categories.map((cat, idx) => (
          <div key={idx} className="hub-category" data-animate>
            <div className="hub-category-header">
              <span className="hub-category-dot" style={{ background: ACCENTS[idx] }} aria-hidden="true" />
              <h3 className="hub-category-label">{cat.label}</h3>
            </div>

            <div className="hub-grid">
              {cat.items.map((item) => (
                <button
                  key={item.id}
                  className="hub-card"
                  style={{ '--hub-accent': ACCENTS[idx] } as React.CSSProperties}
                  onClick={() => open(item.id, item.label, ACCENTS[idx])}
                  aria-label={`${th.openAriaPrefix} ${item.label}`}
                >
                  <div className="hub-card-icon" aria-hidden="true">
                    {icons[item.id]}
                  </div>
                  <div className="hub-card-body">
                    <span className="hub-card-label">{item.label}</span>
                    <span className="hub-card-desc">{item.desc}</span>
                  </div>
                  <div className="hub-card-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal único — renderiza la sección activa con lazy loading */}
      <Modal
        isOpen={!!activeId}
        onClose={close}
        title={activeTitle}
        accent={activeAccent}
      >
        {activeId && (() => {
          const Comp = SECTION_COMPONENTS[activeId];
          return (
            <Suspense fallback={
              <div className="modal-splash" role="status" aria-label="Cargando sección">
                <div className="splash-inner">
                  <div className="splash-symbol" aria-hidden="true" style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'1.2rem'}}>
                    <img src="/img/Isologo/isologo.jpeg" alt="Isologo Cátedra Vejez UBA" decoding="async" width={72} height={72} style={{width:'72px',height:'72px',objectFit:'contain',borderRadius:'16px',boxShadow:'0 2px 12px rgba(0,0,0,.10)'}} />
                  </div>
                  <p className="splash-title">Cátedra Vejez UBA</p>
                  <p className="splash-sub">Facultad de Psicología · Universidad de Buenos Aires</p>
                  <div className="splash-track">
                    <div className="splash-fill"></div>
                  </div>
                </div>
              </div>
            }>
              <Comp />
            </Suspense>
          );
        })()}
      </Modal>
    </section>
  );
}
