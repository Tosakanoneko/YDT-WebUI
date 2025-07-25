import { useState, useEffect } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";
import { kimiApi } from "@/services/kimiApi";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const apiKey = kimiApi.getApiKey();
    setHasApiKey(!!apiKey);
    if (!apiKey) {
      setShowApiKeyDialog(true);
    }
  }, []);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSendMessage = async (content: string) => {
    if (!hasApiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    const userMessage: Message = {
      id: generateId(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Prepare conversation history for API
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.content,
      }));

      const response = await kimiApi.sendMessage(conversationHistory);

      const aiMessage: Message = {
        id: generateId(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "发送失败",
        description: error instanceof Error ? error.message : "发送消息时出现错误",
        variant: "destructive",
      });

      // If it's an API key error, show the dialog
      if (error instanceof Error && error.message.includes('API Key')) {
        setShowApiKeyDialog(true);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleApiKeySet = (apiKey: string) => {
    kimiApi.setApiKey(apiKey);
    setHasApiKey(true);
    toast({
      title: "API Key 设置成功",
      description: "现在可以开始聊天了",
    });
  };

  const handleSettingsClick = () => {
    setShowApiKeyDialog(true);
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--gradient-background)]">
      <div className="flex items-center justify-between">
        <ChatHeader />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettingsClick}
          className="mr-4"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <ChatContainer messages={messages} isTyping={isTyping} />
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isTyping || !hasApiKey}
      />

      <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        onApiKeySet={handleApiKeySet}
        currentApiKey={kimiApi.getApiKey()}
      />
    </div>
  );
};

export default Index;