import { films, sessions } from '#lib/data.ts';
import { error } from '@sveltejs/kit';
export const entries = () => films.map((f) => ({ slug: f.slug }));
export function load({ params }: { params: { slug: string } }) {
  const film = films.find((f) => f.slug === params.slug);
  if (!film) error(404, 'Filme não encontrado');
  return { film, sessions: sessions.filter((s) => s.film === film.slug) };
}
