import type { ChatMessage as ChatMessageType } from "@repo/shared";
import { ScrollArea } from "@repo/ui";
import type React from "react";
import { ChatMessage } from "./ChatMessage";

interface MessageListProps {
  messages: ChatMessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <ScrollArea className="h-[500px] w-full">
      <div className="p-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <div className="text-3xl">💬</div>
              </div>
              <p className="text-xl font-semibold text-foreground mb-2">Start a conversation</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Send a message to begin chatting with the AI assistant
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
