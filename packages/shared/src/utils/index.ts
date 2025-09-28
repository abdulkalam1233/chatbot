// Simple utility for generating IDs
export const generateId = (): string => {
  return crypto.randomUUID();
};