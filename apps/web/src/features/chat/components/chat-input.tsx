import type { ChatModel } from "@repo/shared";
import { Button, Textarea } from "@repo/ui";
import type React from "react";
import { useState } from "react";
import { ModelSelector } from ".";

interface ChatInputProps {
  onSend: (value: string) => void;
  loading?: boolean;
  models: ChatModel[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  loading,
  models,
  selectedModel,
  onModelChange,
}) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Model and Tool Selection Row */}
      <div className="flex gap-6 items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-card-foreground">Model:</span>
          <ModelSelector models={models} value={selectedModel} onChange={onModelChange} />
        </div>
        {/* Future: Tool selection will go here */}
        <div className="flex items-center gap-3 opacity-60">
          <span className="text-sm font-medium text-card-foreground">Tools:</span>
          <span className="text-xs text-muted-foreground px-3 py-1.5 bg-muted/80 border border-border/50 rounded-md font-medium shadow-sm">
            Coming soon
          </span>
        </div>
      </div>

      {/* Input Row */}
      <div className="flex gap-4 items-end w-full">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          rows={3}
          className="flex-1 resize-none rounded-lg bg-card border-border text-card-foreground placeholder:text-muted-foreground shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          onClick={handleSend}
          disabled={loading || !value.trim()}
          className="px-8 py-4 rounded-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          size="lg"
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};
