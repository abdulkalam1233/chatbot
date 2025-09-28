"use client";

import type { ChatMessage } from "@repo/shared";
import { CHAT_MODELS } from "@repo/shared";
import { useState } from "react";
import { ChatInput, MessageList } from "../../features/chat/components";

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [model, setModel] = useState<string>(CHAT_MODELS[0].id);
  const [loading, setLoading] = useState(false);

  const handleSend = (content: string) => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}`,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    // Here you would trigger backend call and append assistant response
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-6 px-4 flex flex-col gap-4 min-h-screen">
        {/* Header */}
        <div className="bg-card rounded-lg shadow-sm border p-6 text-center">
          <h1 className="text-3xl font-bold text-primary">AI Chatbot</h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-card rounded-lg shadow-sm border overflow-hidden">
          <MessageList messages={messages} />
        </div>

        {/* Input Area */}
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <ChatInput
            onSend={handleSend}
            loading={loading}
            models={CHAT_MODELS}
            selectedModel={model}
            onModelChange={setModel}
          />
        </div>
      </div>
    </div>
  );
}
