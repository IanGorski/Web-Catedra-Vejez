// Tipos compartidos del proyecto

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface CalendarEvent {
  date: string;
  day: string;
  month: string;
  title: string;
  description: string;
}

export interface NewsArticle {
  tag: NewsTag;
  date: string;         // ISO date string e.g. "2026-05-15"
  dateLabel: string;    // e.g. "Mayo 2026"
  title: string;
  excerpt: string;
  href: string;
  featured?: boolean;
}

export type NewsTag = 'Jornada' | 'Publicación' | 'Convocatoria' | 'Taller';
export type NewsFilter = 'todos' | NewsTag;

export interface Publication {
  type: 'Artículo' | 'Capítulo' | 'Tesis' | 'Libro';
  year: number;
  title: string;
  authors: string;
  journal: string;
  doi?: string;
  href: string;
  hrefLabel: string;
}

export type Theme = 'light' | 'dark';
