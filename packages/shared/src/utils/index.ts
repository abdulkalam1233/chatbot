// Simple utility for generating IDs
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
