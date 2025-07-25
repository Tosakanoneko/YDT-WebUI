import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 bg-background border-t border-border">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入消息..."
        disabled={disabled}
        className={cn(
          "min-h-[44px] max-h-32 resize-none transition-all duration-200",
          "focus:ring-2 focus:ring-primary focus:border-transparent",
          "bg-input border-border"
        )}
        rows={1}
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className={cn(
          "h-11 px-4 bg-primary hover:bg-primary/90 text-primary-foreground",
          "transition-all duration-200 hover:shadow-[var(--shadow-glow)]",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};