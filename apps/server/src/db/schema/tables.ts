import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// create conversations table
export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// create messages table
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  role: varchar("role", { length: 20 }).notNull(), // 'user' | 'assistant' | 'system'
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
