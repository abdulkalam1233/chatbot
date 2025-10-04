import { conversations, messages } from "./tables";

export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
