import { sessions, getFilm } from '#lib/data.ts';
import { error } from '@sveltejs/kit';
export const entries = () => sessions.map((s) => ({ id: s.id }));
export function load({ params }: { params: { id: string } }) {
  const session = sessions.find((s) => s.id === params.id);
  if (!session) error(404, 'Sessão não encontrada');
  return { session, film: getFilm(session.film) };
}
