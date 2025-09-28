import type { ChatModel } from "../types";

// Just a simple constant for now
export const API_BASE_URL = "/api";

export const CHAT_MODELS: ChatModel[] = [
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "OpenAI GPT-3.5 Turbo",
    supportsOpenAI: true,
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "OpenAI GPT-4",
    supportsOpenAI: true,
  },
];
