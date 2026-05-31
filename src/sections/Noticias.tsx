import { useState } from 'react';
import type { NewsFilter, NewsTag } from '@/types';
import { NEWS_ARTICLES, EVENTS } from '@/data/content';
import { useLang } from '@/hooks/useLang';
import { i18n } from '@/data/i18n';

const TAG_CLASS: Record<NewsTag, string> = {
  Jornada:      'news-tag',
  Publicación:  'news-tag news-tag--accent',
  Convocatoria: 'news-tag news-tag--green',
  Taller:       'news-tag',
};

export default function Noticias() {
  const { lang } = useLang();
  const t = i18n[lang].noticias;
  const [activeFilter, setActiveFilter] = useState<NewsFilter>('todos');

  const visible = NEWS_ARTICLES.filter(
    (a) => activeFilter === 'todos' || a.tag === activeFilter
  );

  return (
    <section id="noticias" className="section">
      <div className="container">
        <header className="section-header" data-animate>
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </header>

        <div className="news-filters" role="group" aria-label={t.heading} data-animate>
          {t.filters.map(({ label, value }) => (
            <button
              key={value}
              className={`filter-btn${activeFilter === value ? ' active' : ''}`}
              onClick={() => setActiveFilter(value as NewsFilter)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="news-grid" id="newsGrid">
          {visible.map((article, idx) => (
            <article
              key={idx}
              className={`news-card${article.featured ? ' news-card--featured' : ''}`}
              data-animate
            >
              <div className="news-meta">
                <span className={TAG_CLASS[article.tag]}>{article.tag}</span>
                <time className="news-date" dateTime={article.date}>{article.dateLabel}</time>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <a href={article.href} className="link-arrow">{t.readMore}</a>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="news-empty">{t.empty}</p>
          )}
        </div>

        <div className="calendar-section" data-animate>
          <h3 className="calendar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {t.eventsTitle}
          </h3>
          <ul className="events-list" aria-label={t.eventsTitle}>
            {EVENTS.map((ev) => (
              <li key={ev.date} className="event-item">
                <div className="event-date" aria-hidden="true">
                  <span className="event-day">{ev.day}</span>
                  <span className="event-month">{ev.month}</span>
                </div>
                <div className="event-info">
                  <h4 className="event-title">{ev.title}</h4>
                  <p className="event-desc">{ev.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
