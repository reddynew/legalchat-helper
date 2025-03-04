
import React, { useState } from 'react';
import { MessageSquare, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';
import ChatInterface from './ChatInterface';
import { cn } from '@/lib/utils';

const ChatBot: React.FC = () => {
  const { isActive, startChat } = useChat();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div 
      className={cn(
        "fixed z-40 bottom-6 right-6 transition-all duration-300 ease-in-out",
        isActive && !isMinimized ? "w-full sm:w-[400px] h-[500px]" : "w-auto h-auto",
      )}
    >
      {!isActive ? (
        <Button 
          size="lg" 
          className="bg-legal-700 hover:bg-legal-800 text-white rounded-full shadow-md p-4 h-14 w-14"
          onClick={startChat}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Open Chat</span>
        </Button>
      ) : (
        <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-slide-in-right">
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-legal-700 text-white px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h2 className="font-medium">Legal Assistant</h2>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-legal-600 rounded-full"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-legal-600 rounded-full"
                onClick={() => {
                  setIsMinimized(false);
                  window.location.reload();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chat Content */}
          {!isMinimized && (
            <ChatInterface />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
