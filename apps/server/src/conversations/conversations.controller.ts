import { Body, Controller, Get, Post } from "@nestjs/common";
import type { CreateConversationDto } from "@repo/shared";
import { ConversationsService } from "./conversations.service";

@Controller("conversations")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {
    this.conversationsService = conversationsService;
  }

  @Get()
  getConversations() {
    return this.conversationsService.getConversations();
  }

  @Post()
  createConversation(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.createConversation(createConversationDto);
  }
}
