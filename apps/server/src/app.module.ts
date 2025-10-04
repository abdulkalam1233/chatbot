import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@/db/database.module";
import { ApiResponseFactory } from "@/lib/api-response-factory";
import { ConversationsModule } from "./conversations/conversations.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConversationsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [ApiResponseFactory],
})
export class AppModule {}
