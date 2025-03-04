
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/context/ChatContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatInterface: React.FC = () => {
  const { 
    messages, 
    currentQuestion, 
    isActive, 
    isChatComplete,
    answerQuestion, 
    completeChat 
  } = useChat();
  
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !currentQuestion?.isOpen) return;
    
    answerQuestion(userInput);
    setUserInput('');
  };

  const handleOptionClick = (option: string) => {
    answerQuestion(option);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${
                message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
              } animate-fade-in`}
            >
              {message.text}
            </div>
          ))}
          
          {/* Options for current question if available */}
          {currentQuestion && !currentQuestion.isOpen && currentQuestion.options && (
            <div className="flex flex-wrap gap-2 mt-4 animate-fade-in">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  size="sm"
                  className="border-legal-200 text-legal-700 hover:bg-legal-50"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
          
          {/* Completion message */}
          {isChatComplete && (
            <div className="mt-4 p-3 bg-legal-50 rounded-lg text-center text-sm animate-fade-in">
              <p className="text-legal-700 font-medium">Chat completed!</p>
              <Button
                variant="link"
                className="text-legal-600 hover:text-legal-700 p-0 h-auto text-sm"
                onClick={completeChat}
              >
                Save and send my information
              </Button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input area */}
      {isActive && currentQuestion && (
        <form 
          onSubmit={handleSendMessage} 
          className="p-3 border-t border-gray-100 flex gap-2 items-center bg-white"
        >
          <Input
            placeholder={currentQuestion.isOpen ? "Type your response..." : "Select an option above..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={!currentQuestion.isOpen || isChatComplete}
            className="border-legal-200 focus-visible:ring-legal-500"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!userInput.trim() || !currentQuestion.isOpen || isChatComplete}
            className="bg-legal-700 hover:bg-legal-800 text-white h-10 w-10 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default ChatInterface;
