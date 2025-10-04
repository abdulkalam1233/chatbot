import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { conversations, messages } from "./tables";

export const insertConversationSchema = createInsertSchema(conversations, {
  title: z.string({ error: "title is required" }).min(1),
});
export const selectConversationSchema = createSelectSchema(conversations);

export const insertMessageSchema = createInsertSchema(messages, {
  content: z.string().min(1),
  role: z.enum(["user", "assistant", "system"]),
});
export const selectMessageSchema = createSelectSchema(messages);
