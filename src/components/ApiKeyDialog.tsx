import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, ExternalLink } from "lucide-react";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

export const ApiKeyDialog = ({ 
  open, 
  onOpenChange, 
  onApiKeySet, 
  currentApiKey 
}: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState(currentApiKey || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      onApiKeySet(apiKey.trim());
      onOpenChange(false);
    } catch (error) {
      console.error('Error setting API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            设置 Kimi API Key
          </DialogTitle>
          <DialogDescription>
            请输入您的 Kimi API Key 以开始使用聊天功能
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <AlertDescription>
            API Key 将保存在您的浏览器本地存储中，不会上传到任何服务器。
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>如何获取 API Key？</p>
            <a 
              href="https://platform.moonshot.cn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              访问 Kimi 开放平台
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={!apiKey.trim() || isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? "设置中..." : "确认"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};