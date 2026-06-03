import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';
import LangSwitcher from '@/components/LangSwitcher';
import FontSizeControls from '@/components/FontSizeControls';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang } = useLang();
  const t = i18n[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Active section highlight
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveHref('#' + e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <nav
      id="mainNav"
      ref={navRef}
      className={`${scrolled ? 'scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}
      aria-label={t.aria}
    >
      <div className="nav-container">
        <a className="nav-brand" href="#inicio" aria-label="Inicio">
          <span className="nav-brand-isologo" aria-hidden="true">
            <img src="/img/Isologo/isologo.jpeg" alt="" className="nav-isologo-img" decoding="async" width={34} height={34} />
          </span>
          <span className="nav-brand-text">
            <span className="nav-brand-title">Cátedra Vejez</span>
            <span className="nav-brand-sub">Psicología UBA</span>
          </span>
        </a>

        <div className="nav-controls" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LangSwitcher />
          <button
            className="theme-toggle"
            id="themeToggle"
            aria-label={theme === 'dark' ? (lang === 'es' ? 'Cambiar a modo claro' : 'Switch to light mode') : (lang === 'es' ? 'Cambiar a modo oscuro' : 'Switch to dark mode')}
            title={lang === 'es' ? 'Alternar modo oscuro' : 'Toggle dark mode'}
            onClick={toggle}
          >
            <svg className="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg className="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          <FontSizeControls />

          <button
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            id="navToggle"
            aria-label={menuOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
            aria-expanded={menuOpen}
            aria-controls="navMenu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>

        <ul className={`nav-menu${menuOpen ? ' open' : ''}`} id="navMenu" role="list">
          {t.links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-link${activeHref === href ? ' active' : ''}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              className="nav-link nav-cta"
              onClick={closeMenu}
            >
              {t.contacto}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
