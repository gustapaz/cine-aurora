import { films } from '#lib/data.ts';
export const prerender = true;
export function GET() {
  const root = 'https://gustapaz.github.io/cine-aurora';
  const paths = ['/', '/programacao/', '/sobre/', ...films.map((f) => `/filmes/${f.slug}/`)];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${root}${path}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
