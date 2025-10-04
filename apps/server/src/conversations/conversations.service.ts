import { BadRequestException, Injectable } from "@nestjs/common";
import type { CreateConversationDto } from "@repo/shared";
import { ZodError } from "zod";
import { DatabaseService } from "@/db/database.service";
import { conversations } from "@/db/schema/tables";
import type { Conversation } from "@/db/schema/types";
import { insertConversationSchema } from "@/db/schema/validations";

@Injectable()
export class ConversationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getConversations() {
    return await this.databaseService.db.select().from(conversations);
  }

  async createConversation(createConversationDto: CreateConversationDto): Promise<Conversation> {
    const validatedData = insertConversationSchema.parse(createConversationDto);
    const result = await this.databaseService.db
      .insert(conversations)
      .values(validatedData)
      .returning();
    return result[0];
  }
}
