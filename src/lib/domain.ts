import { allSeats, sessions } from './data.ts';
export interface Booking {
  id: string;
  sessionId: string;
  seats: string[];
  half: number;
  name: string;
  total: number;
  createdAt: string;
  cancelled: boolean;
}
export function occupiedSeats(sessionId: string) {
  const seed = [...sessionId].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return allSeats.filter((_, index) => (index * 7 + seed) % 13 < 3);
}
export function totalPrice(count: number, half: number) {
  if (
    !Number.isInteger(count) ||
    count < 1 ||
    count > 6 ||
    !Number.isInteger(half) ||
    half < 0 ||
    half > count
  )
    throw new RangeError('Selecione de 1 a 6 assentos e uma quantidade válida de ingressos.');
  return (count - half) * 32 + half * 16;
}
export function validateSelection(sessionId: string, seats: string[], bookings: Booking[] = []) {
  if (!sessions.some((s) => s.id === sessionId)) return 'Sessão não encontrada.';
  if (seats.length < 1 || seats.length > 6) return 'Escolha de 1 a 6 assentos.';
  if (new Set(seats).size !== seats.length || seats.some((s) => !allSeats.includes(s)))
    return 'Seleção de assentos inválida.';
  const taken = new Set([
    ...occupiedSeats(sessionId),
    ...bookings.filter((b) => b.sessionId === sessionId && !b.cancelled).flatMap((b) => b.seats),
  ]);
  if (seats.some((s) => taken.has(s)))
    return 'Um assento selecionado não está mais disponível. Escolha outro lugar.';
  return '';
}
export function sanitizeBookings(value: unknown): Booking[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is Booking => {
    if (!v || typeof v !== 'object') return false;
    const b = v as Booking;
    if (
      typeof b.id !== 'string' ||
      !/^AUR-[A-Z0-9-]{6,40}$/.test(b.id) ||
      !sessions.some((s) => s.id === b.sessionId) ||
      typeof b.name !== 'string' ||
      b.name.trim().length < 2 ||
      b.name.length > 60 ||
      !Array.isArray(b.seats) ||
      b.seats.length < 1 ||
      b.seats.length > 6 ||
      new Set(b.seats).size !== b.seats.length ||
      b.seats.some((s) => !allSeats.includes(s)) ||
      typeof b.createdAt !== 'string' ||
      !Number.isFinite(Date.parse(b.createdAt)) ||
      typeof b.cancelled !== 'boolean'
    )
      return false;
    try {
      return (
        b.total === totalPrice(b.seats.length, b.half) &&
        !b.seats.some((s) => occupiedSeats(b.sessionId).includes(s))
      );
    } catch {
      return false;
    }
  });
}
export const money = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
