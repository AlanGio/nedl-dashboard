"use client";

import type React from "react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarNavigation } from "@/components/sidebar/sidebar-navigation";
import { FloatingChat } from "@/components/chat/floating-chat";
import { ExpandedChat } from "@/components/chat/expanded-chat";
import mockData from "@/data/mockData.json";

interface LayoutWithNavProps {
  children: React.ReactNode;
}

export function LayoutWithNav({ children }: LayoutWithNavProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      content: string;
      sender: "user" | "bot";
      timestamp: Date;
    }>
  >([]);
  const [answerIndex, setAnswerIndex] = useState(0);

  const suggestedQueries = [
    "show me the 10 ten drg codes that could be displayed in a tabular format",
    "can you show the rate relativity per health system",
  ];

  const toggleChat = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
    setIsChatOpen(!isChatOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setIsChatOpen(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (input.trim() && !isTyping) {
      const newMessage = {
        id: Date.now().toString(),
        content: input,
        sender: "user" as const,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setIsTyping(true);

      const answer =
        mockData.chatAnswers[answerIndex % mockData.chatAnswers.length];
      const thinkingTime = 2000 + Math.random() * 2000;

      setTimeout(() => {
        setIsTyping(false);
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: answer,
          sender: "bot" as const,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setAnswerIndex((prev) => prev + 1);
      }, thinkingTime);
    }
  };

  const handleSuggestedQuery = (query: string) => {
    if (!isTyping) {
      const newMessage = {
        id: Date.now().toString(),
        content: query,
        sender: "user" as const,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setIsTyping(true);

      const answer =
        mockData.chatAnswers[answerIndex % mockData.chatAnswers.length];
      const thinkingTime = 2000 + Math.random() * 2000;

      setTimeout(() => {
        setIsTyping(false);
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: answer,
          sender: "bot" as const,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setAnswerIndex((prev) => prev + 1);
      }, thinkingTime);
    }
  };

  return (
    <div className="min-h-auto" style={{ backgroundColor: "#F6F6F6" }}>
      <DashboardHeader
        toggleChat={toggleChat}
        onToggleSidebar={toggleSidebar}
      />
      <div className="mx-auto px-4 relative">
        <div className="flex mt-4">
          <SidebarNavigation
            onNavigate={() => {}}
            activeItem={null}
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
          />
          <div className="md:ml-64 flex-1 w-full">
            {isExpanded ? (
              <ExpandedChat
                messages={messages}
                input={input}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                handleSendMessage={handleSendMessage}
                handleSuggestedQuery={handleSuggestedQuery}
                suggestedQueries={suggestedQueries}
                toggleExpand={toggleExpand}
                isTyping={isTyping}
              />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
      {!isExpanded && (
        <FloatingChat
          isOpen={isChatOpen}
          toggleChat={toggleChat}
          toggleExpand={toggleExpand}
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleSendMessage={handleSendMessage}
          handleSuggestedQuery={handleSuggestedQuery}
          suggestedQueries={suggestedQueries}
          isTyping={isTyping}
        />
      )}
    </div>
  );
}
