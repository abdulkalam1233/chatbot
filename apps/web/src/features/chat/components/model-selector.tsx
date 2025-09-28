import type { ChatModel } from "@repo/shared";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import type React from "react";

interface ModelSelectorProps {
  models: ChatModel[];
  value: string;
  onChange: (modelId: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ models, value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48 h-9 bg-card border-border text-card-foreground shadow-sm hover:bg-accent/50 transition-colors">
        <SelectValue placeholder="Select a model" className="text-sm" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border shadow-lg rounded-lg min-w-48">
        {models.map((model) => (
          <SelectItem
            key={model.id}
            value={model.id}
            className="px-3 py-2.5 text-sm font-medium text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground cursor-pointer transition-all duration-200 min-w-full"
          >
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
