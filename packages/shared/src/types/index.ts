// Simple common types
export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface ChatModel {
  id: string;
  name: string;
  description?: string;
  supportsOpenAI: boolean;
}
