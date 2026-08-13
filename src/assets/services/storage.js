const KEY = 'nsr_data_v1';

export function readData() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch(e) { return null; }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function bootstrap(initial) {
  if (!readData()) {
    saveData({ rooms: initial, bookings: [] });
  }
}
