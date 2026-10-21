import { sessions, getFilm, dateLabel } from './data';
import { money } from './domain';
import type { Booking } from './domain';
export function downloadTicket(booking: Booking) {
  const session = sessions.find((s) => s.id === booking.sessionId)!;
  const film = getFilm(session.film);
  const text = `CINE AURORA — INGRESSO DE DEMONSTRAÇÃO\n\n${film.title}\n${dateLabel(session.date)} às ${session.time}\n${session.room} · ${session.format}\n\nNome fictício: ${booking.name}\nAssentos: ${booking.seats.join(', ')}\nInteiras: ${booking.seats.length - booking.half} · Meias simuladas: ${booking.half}\nValor fictício: ${money(booking.total)}\nCódigo: ${booking.id}\nSituação: ${booking.cancelled ? 'Cancelado' : 'Ativo na demonstração'}\n\nEste documento não é um ingresso válido. Não há sessão, reserva ou pagamento real.\nNão há sincronização com servidores.\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `aurora-${booking.id.toLowerCase()}.txt`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
