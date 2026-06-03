import { writeFileSync } from 'node:fs';
import { NEWS_ARTICLES } from '../src/data/content';

const SITE_URL = 'https://catedraterceraedadyvejez.psi.uba.ar';
const FEED_URL = `${SITE_URL}/rss.xml`;

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function normalizeUrl(href: string): string {
  if (!href || href === '#') return `${SITE_URL}/#noticias`;
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  if (href.startsWith('#')) return `${SITE_URL}/${href}`;
  return `${SITE_URL}${href.startsWith('/') ? href : `/${href}`}`;
}

const sortedNews = [...NEWS_ARTICLES].sort((a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

const latestDate = sortedNews[0]?.date ?? new Date().toISOString().slice(0, 10);
const pubDate = new Date(`${latestDate}T12:00:00.000Z`).toUTCString();

const itemsXml = sortedNews
  .map((item) => {
    const link = normalizeUrl(item.href);
    const title = escapeXml(item.title);
    const description = escapeXml(item.excerpt);
    const category = escapeXml(item.tag);
    const guid = `${link}#${item.date}`;
    const itemPubDate = new Date(`${item.date}T12:00:00.000Z`).toUTCString();

    return [
      '    <item>',
      `      <title>${title}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="false">${escapeXml(guid)}</guid>`,
      `      <pubDate>${itemPubDate}</pubDate>`,
      `      <category>${category}</category>`,
      `      <description>${description}</description>`,
      '    </item>',
    ].join('\n');
  })
  .join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cátedra Psicología de la Tercera Edad y Vejez — Novedades</title>
    <link>${SITE_URL}</link>
    <description>Actualizaciones de noticias, agenda y contenidos institucionales de la cátedra.</description>
    <language>es-ar</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

writeFileSync('public/rss.xml', rssXml, 'utf8');
console.log('RSS generado en public/rss.xml');
