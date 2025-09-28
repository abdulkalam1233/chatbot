import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Chats table
export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  role: varchar('role', { length: 20 }).notNull(), // 'user' | 'assistant' | 'system'
  chatId: uuid('chat_id').references(() => chats.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Schema validation using Drizzle-Zod

export const insertChatSchema = createInsertSchema(chats);
export const selectChatSchema = createSelectSchema(chats);

export const insertMessageSchema = createInsertSchema(messages, {
  role: z.enum(['user', 'assistant', 'system']),
});
export const selectMessageSchema = createSelectSchema(messages);

// Types
export type Chat = typeof chats.$inferSelect;
export type NewChat = typeof chats.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;