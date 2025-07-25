export const TypingIndicator = () => {
  return (
    <div className="flex justify-start w-full animate-fade-in">
      <div className="bg-chat-ai text-chat-ai-foreground border border-border rounded-2xl px-4 py-3 shadow-lg">
        <div className="flex items-center space-x-1">
          <span className="text-sm opacity-70">Kimi正在思考</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-current rounded-full animate-typing" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-current rounded-full animate-typing" style={{ animationDelay: '200ms' }}></div>
            <div className="w-1 h-1 bg-current rounded-full animate-typing" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};