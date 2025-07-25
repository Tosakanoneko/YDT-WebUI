import { Bot, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface ChatHeaderProps {
  onMenuClick?: () => void;
}

export const ChatHeader = ({ onMenuClick }: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-chess-red to-chess-gold text-white">
            <span className="text-lg font-bold">♔</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">弈点通小助手</h1>
            <p className="text-xs text-muted-foreground">象棋AI智能助手</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-muted-foreground">在线</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};