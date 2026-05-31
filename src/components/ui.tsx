import { useState, useEffect, useCallback, useRef } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <a
      href="#"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      onClick={handleClick}
      title="Volver arriba"
      aria-label="Volver arriba"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V6" />
        <path d="m6 12 6-6 6 6" />
      </svg>
    </a>
  );
}

// ── COUNTER animation ────────────────────────────────────────────
interface CounterProps {
  target: number;
  suffix?: string;
}

export function Counter({ target, suffix = '' }: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const dur = 1800;
          const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setValue(Math.round(ease(p) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}{suffix}
    </span>
  );
}

// Form status component
interface FormStatusProps {
  msg: string;
  type: 'idle' | 'loading' | 'ok' | 'warn' | 'error';
}

export function FormStatusEl({ msg, type }: FormStatusProps) {
  if (!msg) return null;
  const cls = type === 'ok' ? 'form-status--ok' : type === 'warn' ? 'form-status--warn' : 'form-status--error';
  return <p className={`form-status ${cls}`}>{msg}</p>;
}
