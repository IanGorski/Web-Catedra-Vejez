import { Counter } from '@/components/ui';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

export default function Stats() {
  const { lang } = useLang();
  const stats = i18n[lang].stats;
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map(({ count, suffix, label }, idx) => (
            <div key={idx} className="stat" data-animate data-delay={String(idx + 1)}>
              <span className="stat-number">
                <Counter target={count} suffix={suffix} />
              </span>
              <p className="stat-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
