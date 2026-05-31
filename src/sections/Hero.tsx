import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

/* ── Background Aurora Gerontos ──────────────────────────────── */
const EMBERS = Array.from({ length: 32 }, (_, i) => ({
  id:    i,
  left:  `${4 + (i * 3.1 + i * i * 0.07) % 92}%`,
  size:  1.5 + (i % 5) * 0.65,
  delay: `${(i * 0.31) % 8}s`,
  dur:   `${7 + (i * 0.47) % 9}s`,
  sway:  `${-18 + (i * 4.1) % 42}px`,
  sway2: `${-22 + (i * 6.3) % 50}px`,
  color: i % 3 === 0
    ? 'rgba(202,110,71,.5)'
    : i % 3 === 1
      ? 'rgba(212,197,58,.42)'
      : 'rgba(220,130,90,.38)',
}));

function HeroBgAurora() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-aurora" />
      {EMBERS.map(e => (
        <span
          key={e.id}
          className="hero-ember"
          style={{
            left:              e.left,
            width:             `${e.size}px`,
            height:            `${e.size}px`,
            background:        e.color,
            boxShadow:         `0 0 ${e.size * 1.8}px ${e.color}`,
            animationDelay:    e.delay,
            animationDuration: e.dur,
            '--sway':          e.sway,
            '--sway2':         e.sway2,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
export default function Hero() {
  const { lang } = useLang();
  const t = i18n[lang].hero;

  return (
    <section id="inicio" className="hero">
      <HeroBgAurora />

      <div className="hero-sello" aria-hidden="true">
        <div className="hero-sello-ring" />
        <img src="/img/Isologo/isologo.jpeg" alt="" className="hero-sello-img" draggable={false} />
        <span className="hero-sello-label">Cátedra Oficial · UBA</span>
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">{t.eyebrow}</p>
        <h1 className="hero-title">
          {t.titleLight.replace(/\n/g, ' ')}{t.titleStrong}
        </h1>
        <blockquote className="hero-lema">
          "{t.lema}"
        </blockquote>
        <p className="hero-subtitle">
          {t.subtitle}
        </p>
        <div className="hero-pillars" aria-label="Los cinco pilares de la cátedra">
          {t.pillars.map((p: string, i: number) => (
            <span key={i} className="hero-pillar">{p}</span>
          ))}
        </div>
        <div className="hero-actions">
          <a href="#nosotros" className="btn btn-primary">{t.conocer}</a>
          <a href="#contacto" className="btn btn-ghost">{t.contactarnos}</a>
        </div>
      </div>
    </section>
  );
}
