import { writable, get } from 'svelte/store';
import { sanitizeBookings, validateSelection, totalPrice } from './domain';
import type { Booking } from './domain';
export const bookings = writable<Booking[]>([]);
export const storageWarning = writable(false);
let initialized = false;
export function initializeWallet() {
  if (initialized) return;
  initialized = true;
  try {
    bookings.set(sanitizeBookings(JSON.parse(localStorage.getItem('aurora-wallet') || '[]')));
  } catch {
    storageWarning.set(true);
  }
  bookings.subscribe((value) => {
    try {
      localStorage.setItem('aurora-wallet', JSON.stringify(value));
      storageWarning.set(false);
    } catch {
      storageWarning.set(true);
    }
  });
}
export function refreshWallet() {
  try {
    const stored = localStorage.getItem('aurora-wallet');
    if (stored) bookings.set(sanitizeBookings(JSON.parse(stored)));
  } catch {
    storageWarning.set(true);
  }
}
export function issueBooking(sessionId: string, seats: string[], half: number, name: string) {
  refreshWallet();
  const existing = get(bookings);
  const error = validateSelection(sessionId, seats, existing);
  if (error) throw Error(error);
  if (name.trim().length < 2 || name.trim().length > 60)
    throw Error('Use um nome fictício com 2 a 60 caracteres.');
  const booking: Booking = {
    id: `AUR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    sessionId,
    seats: [...seats],
    half,
    name: name.trim(),
    total: totalPrice(seats.length, half),
    createdAt: new Date().toISOString(),
    cancelled: false,
  };
  bookings.update((all) => [booking, ...all]);
  return booking;
}
export function cancelBooking(id: string) {
  bookings.update((all) => all.map((b) => (b.id === id ? { ...b, cancelled: true } : b)));
}
