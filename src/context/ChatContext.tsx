
import React, { createContext, useContext, useState } from 'react';
import { ChatQuestion, legalChatFlow } from '@/utils/chatQuestions';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatData {
  [key: string]: string | string[];
}

interface ChatContextType {
  messages: Message[];
  currentQuestion: ChatQuestion | null;
  chatData: ChatData;
  isActive: boolean;
  isChatComplete: boolean;
  startChat: () => void;
  resetChat: () => void;
  answerQuestion: (answer: string) => void;
  completeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<ChatQuestion | null>(null);
  const [chatData, setChatData] = useState<ChatData>({});
  const [isActive, setIsActive] = useState(false);
  const [isChatComplete, setIsChatComplete] = useState(false);

  const startChat = () => {
    setIsActive(true);
    setIsChatComplete(false);
    setChatData({});
    
    // Start with the first question
    const firstQuestion = legalChatFlow["start"];
    setCurrentQuestion(firstQuestion);
    
    // Add the first message from the assistant
    const welcomeMessage: Message = {
      id: `assistant-${Date.now()}`,
      text: firstQuestion.text,
      sender: 'assistant',
      timestamp: new Date(),
    };
    
    setMessages([welcomeMessage]);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentQuestion(null);
    setChatData({});
    setIsActive(false);
    setIsChatComplete(false);
  };

  const answerQuestion = (answer: string) => {
    if (!currentQuestion) return;
    
    // Save the answer
    setChatData(prev => ({
      ...prev,
      [currentQuestion.fieldName]: answer
    }));
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: answer,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Check if there's a next question
    if (currentQuestion.nextQuestionId) {
      const nextQuestion = legalChatFlow[currentQuestion.nextQuestionId];
      setCurrentQuestion(nextQuestion);
      
      // Add the next question as an assistant message
      setTimeout(() => {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          text: nextQuestion.text,
          sender: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }, 500); // Small delay for a more natural conversation flow
    } else {
      // No more questions, chat is complete
      setIsChatComplete(true);
      setCurrentQuestion(null);
      
      // Final message
      setTimeout(() => {
        const finalMessage: Message = {
          id: `assistant-${Date.now()}`,
          text: "Thank you for providing all the information. Our legal team will review your case and get back to you soon.",
          sender: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, finalMessage]);
      }, 500);
    }
  };

  const completeChat = () => {
    // Log the collected data
    console.log("Collected chat data:", chatData);
    
    // In a real app, you would send this data to your backend
    // For demo purposes, we just log it
    alert("Chat data has been logged to console. In a real app, this would be sent to your backend.");
    
    setIsChatComplete(true);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        currentQuestion,
        chatData,
        isActive,
        isChatComplete,
        startChat,
        resetChat,
        answerQuestion,
        completeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
