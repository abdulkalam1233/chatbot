import type { MessageRole } from "@repo/shared";
import { Badge } from "@repo/ui";
import type React from "react";

interface ChatMessageProps {
  role: MessageRole;
  content: string;
  model?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, model }) => {
  return (
    <div className={`flex flex-col gap-3 mb-8 ${role === "user" ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-2">
        <Badge
          variant={role === "user" ? "default" : "secondary"}
          className="text-xs font-medium px-3 py-1"
        >
          {role === "user" ? "You" : "Assistant"}
        </Badge>
        {model && (
          <Badge variant="outline" className="text-xs px-2 py-1">
            {model}
          </Badge>
        )}
      </div>
      <div
        className={`rounded-3xl px-5 py-4 text-base whitespace-pre-line max-w-2xl shadow-sm border ${
          role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {content}
      </div>
    </div>
  );
};
