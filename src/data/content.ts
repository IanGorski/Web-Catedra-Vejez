import type { CalendarEvent, NewsArticle, GalleryImage, Publication } from '@/types';

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/img/galeria/jornada-2025.jpg',         alt: 'Jornada anual de Psicogerontología 2025' },
  { src: '/img/galeria/seminario-posgrado.jpg',   alt: 'Seminario de posgrado sobre demencias' },
  { src: '/img/galeria/taller-clinico.jpg',       alt: 'Taller clínico sobre evaluación neuropsicológica — CABA 2024' },
  { src: '/img/galeria/equipo-investigacion.jpg', alt: 'Equipo de investigación de la cátedra' },
  { src: '/img/galeria/clase-teorica.jpg',        alt: 'Clase teórica en la Facultad de Psicología' },
  { src: '/img/galeria/actividad-comunitaria.jpg',alt: 'Actividad comunitaria con adultos mayores' },
];

export const EVENTS: CalendarEvent[] = [
  {
    date: '2026-05-15', day: '15', month: 'May',
    title: 'Jornada Anual de Psicogerontología 2026',
    description: 'Nuevas perspectivas del envejecimiento activo.',
  },
  {
    date: '2026-06-01', day: '01', month: 'Jun',
    title: 'Inscripción a Pasantías Clínicas',
    description: 'Vacantes para estudiantes avanzados.',
  },
  {
    date: '2026-06-20', day: '20', month: 'Jun',
    title: 'Taller: Evaluación Neuropsicológica',
    description: 'Instrumentos de evaluación cognitiva en adultos mayores.',
  },
  {
    date: '2026-07-10', day: '10', month: 'Jul',
    title: 'Seminario: Modelos de Cuidado en la Vejez',
    description: 'Debate sobre nuevos modelos de cuidado centrado en la persona.',
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    tag: 'Jornada', date: '2026-05-15', dateLabel: 'Mayo 2026', featured: true,
    title: 'Jornada anual de Psicogerontología 2026',
    excerpt: 'Este año la jornada se centrará en las nuevas perspectivas del envejecimiento activo, el cuidado y la salud mental en contextos institucionales.',
    href: '#',
  },
  {
    tag: 'Publicación', date: '2026-04-10', dateLabel: 'Abril 2026',
    title: 'Nueva publicación en revista indexada',
    excerpt: 'El equipo publicó un artículo sobre resiliencia y bienestar psicológico en adultos mayores.',
    href: '#publicaciones',
  },
  {
    tag: 'Convocatoria', date: '2026-06-01', dateLabel: 'Junio 2026',
    title: 'Inscripción pasantías clínicas',
    excerpt: 'Se abren vacantes para estudiantes avanzados interesados en pasantías clínicas con adultos mayores.',
    href: '#contacto',
  },
  {
    tag: 'Taller', date: '2026-06-20', dateLabel: 'Junio 2026',
    title: 'Taller: Evaluación neuropsicológica en vejez',
    excerpt: 'Taller intensivo de dos jornadas sobre instrumentos de evaluación cognitiva en adultos mayores.',
    href: '#contacto',
  },
  {
    tag: 'Publicación', date: '2026-03-20', dateLabel: 'Marzo 2026',
    title: 'Revisión sistemática sobre institucionalización publicada',
    excerpt: 'Nueva revisión de la literatura sobre calidad de vida en residencias geriátricas de Argentina.',
    href: '#publicaciones',
  },
  {
    tag: 'Jornada', date: '2026-07-10', dateLabel: 'Julio 2026',
    title: 'Seminario: Modelos de cuidado en la vejez',
    excerpt: 'Espacio de debate sobre nuevos modelos de cuidado centrado en la persona en contextos geriátricos.',
    href: '#contacto',
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    type: 'Artículo', year: 2025,
    title: 'Resiliencia y bienestar psicológico en adultos mayores argentinos: un estudio transversal',
    authors: '[Autores — completar con datos reales]',
    journal: 'Revista Argentina de Psicología Clínica, vol. 34, n.º 2.',
    doi: '10.xxxx/placeholder',
    href: 'https://doi.org/10.xxxx/placeholder',
    hrefLabel: 'DOI: 10.xxxx/placeholder',
  },
  {
    type: 'Capítulo', year: 2024,
    title: 'Intervenciones psicológicas en demencias: marco teórico y aplicaciones clínicas',
    authors: '[Autores — completar con datos reales]',
    journal: 'En: Psicología y envejecimiento. Ed. Akadia, Buenos Aires.',
    href: '#publicaciones',
    hrefLabel: 'Solicitar ejemplar',
  },
  {
    type: 'Artículo', year: 2024,
    title: 'Institucionalización gerontológica y calidad de vida: una revisión sistemática',
    authors: '[Autores — completar con datos reales]',
    journal: 'Psicogerontología, vol. 12, n.º 1, pp. 45–67.',
    doi: '10.xxxx/placeholder2',
    href: 'https://doi.org/10.xxxx/placeholder2',
    hrefLabel: 'DOI: 10.xxxx/placeholder2',
  },
  {
    type: 'Tesis', year: 2023,
    title: 'Aspectos subjetivos del envejecimiento y narrativas identitarias en adultos mayores de CABA',
    authors: '[Autores — completar con datos reales]',
    journal: 'Tesis doctoral. Facultad de Psicología, UBA.',
    href: '#publicaciones',
    hrefLabel: 'Acceder en repositorio',
  },
];
