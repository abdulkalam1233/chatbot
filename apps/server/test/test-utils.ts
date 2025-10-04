import type { CreateConversationDto } from "@repo/shared";
import { eq } from "drizzle-orm";
import type { drizzle } from "drizzle-orm/node-postgres";
import { conversations, messages } from "../src/db/schema/tables";

export class TestDatabase {
  constructor(private db: ReturnType<typeof drizzle>) {}

  async createConversation(
    data: CreateConversationDto = {
      title: "Test Conversation",
    }
  ) {
    const [conversation] = await this.db
      .insert(conversations)
      .values({
        ...data,
      })
      .returning();
    return conversation;
  }

  async getConversation(id: string) {
    const [conversation] = await this.db
      .select()
      .from(conversations)
      .where(eq(conversations.id, id));
    return conversation;
  }

  async getMessages(conversationId: string) {
    return await this.db.select().from(messages).where(eq(messages.conversationId, conversationId));
  }

  async getAllConversations() {
    return await this.db.select().from(conversations);
  }

  async getAllMessages() {
    return await this.db.select().from(messages);
  }

  async clearDatabase() {
    await this.db.delete(messages);
    await this.db.delete(conversations);
  }
}
