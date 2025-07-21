"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarNavigation } from "@/components/sidebar/sidebar-navigation"
import { DashboardViews } from "@/components/dashboard/dashboard-views"
import { FloatingChat } from "@/components/chat/floating-chat"
import { ExpandedChat } from "@/components/chat/expanded-chat"
import mockData from "@/data/mockData.json"

export default function Dashboard() {
  const [activeView, setActiveView] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<
    Array<{
      id: string
      content: string
      sender: "user" | "bot"
      timestamp: Date
    }>
  >([])
  const [answerIndex, setAnswerIndex] = useState(0)

  const suggestedQueries = [
    "show me the 10 ten drg codes that could be displayed in a tabular format",
    "can you show the rate relativity per health system",
  ]

  // Load chat state from session on initial render
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chatMessages")
    if (savedMessages) {
      try {
        // Parse the saved messages and convert string timestamps back to Date objects
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(parsedMessages)
      } catch (error) {
        console.error("Error loading chat messages:", error)
      }
    }
  }, [])

  // Save chat state to sessionStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages])

  const toggleChat = () => {
    if (isExpanded) {
      setIsExpanded(false)
    }
    setIsChatOpen(!isChatOpen)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      // If we're expanding, make sure the chat is open
      setIsChatOpen(true)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleNavigate = (viewId: string | null) => {
    // If chat is expanded, minimize it when navigating
    if (isExpanded) {
      setIsExpanded(false)
    }

    setActiveView(viewId)

    // Update the active tab based on the view
    if (viewId === null) {
      setActiveTab("overview")
    } else if (viewId === "all-policies") {
      setActiveTab("policy-explorer")
    } else if (viewId === "bookmarked") {
      setActiveTab("payer-analysis")
    } else if (viewId === "code-coverage") {
      setActiveTab("code-coverage")
    }
    // Add more mappings as needed for other views
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (input.trim() && !isTyping) {
      const newMessage = {
        id: Date.now().toString(),
        content: input,
        sender: "user" as const,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInput("")
      setIsTyping(true)

      // Get the next answer from the chatAnswers array
      const answer = mockData.chatAnswers[answerIndex % mockData.chatAnswers.length]

      // Simulate AI thinking time (2-4 seconds)
      const thinkingTime = 2000 + Math.random() * 2000

      setTimeout(() => {
        setIsTyping(false)
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: answer,
          sender: "bot" as const,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])

        // Move to the next answer for future questions
        setAnswerIndex((prev) => prev + 1)
      }, thinkingTime)
    }
  }

  const handleSuggestedQuery = (query: string) => {
    if (!isTyping) {
      const newMessage = {
        id: Date.now().toString(),
        content: query,
        sender: "user" as const,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInput("")
      setIsTyping(true)

      // Get the next answer from the chatAnswers array
      const answer = mockData.chatAnswers[answerIndex % mockData.chatAnswers.length]

      // Simulate AI thinking time (2-4 seconds)
      const thinkingTime = 2000 + Math.random() * 2000

      setTimeout(() => {
        setIsTyping(false)
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: answer,
          sender: "bot" as const,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])

        // Move to the next answer for future questions
        setAnswerIndex((prev) => prev + 1)
      }, thinkingTime)
    }
  }

  return (
    <div className="min-h-auto" style={{ backgroundColor: '#F6F6F6' }}>
      <DashboardHeader
        onNavigate={handleNavigate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleChat={toggleChat}
        onToggleSidebar={toggleSidebar}
      />
      <div className="max-w-[1680px] mx-auto px-4 relative">
        <div className="flex mt-10">
          <SidebarNavigation
            onNavigate={handleNavigate}
            activeItem={activeView}
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
              <DashboardViews activeView={activeView} />
            )}
          </div>
        </div>
      </div>
      {/* Only render FloatingChat when not expanded */}
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
  )
}
