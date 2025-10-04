export interface ApiResponse<T = unknown> {
  readonly data?: T;
  readonly error?: string;
}

export * from "./conversations";
