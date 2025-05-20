"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import mockData from "@/data/mockData.json"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const suggestedQueries = [
  "show me the 10 ten drg codes that could be displayed in a tabular format",
  "can you show the rate relativity per health system",
]

// Update the component definition to accept isOpen and toggleChat props
export function FloatingChat({ isOpen = false, toggleChat }: { isOpen?: boolean; toggleChat?: () => void }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [answerIndex, setAnswerIndex] = useState(0)

  // Remove the isOpen state since it's now a prop
  // const [isOpen, setIsOpen] = useState(false)

  // Remove the toggleChat function since it's now a prop
  // const toggleChat = () => {
  //   setIsOpen(!isOpen)
  // }

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
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: input,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInput("")

      // Get the next answer from the chatAnswers array
      const answer = mockData.chatAnswers[answerIndex % mockData.chatAnswers.length]

      // Simulate bot response after a delay
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: answer,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])

        // Move to the next answer for future questions
        setAnswerIndex((prev) => prev + 1)
      }, 1000)
    }
  }

  const handleSuggestedQuery = (query: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: query,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages([...messages, newMessage])
    setInput("")

    // Get the next answer from the chatAnswers array
    const answer = mockData.chatAnswers[answerIndex % mockData.chatAnswers.length]

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: answer,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

      // Move to the next answer for future questions
      setAnswerIndex((prev) => prev + 1)
    }, 1000)
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages, isOpen])

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center pb-6">
          <div className="relative w-full max-w-5xl mx-auto flex flex-col">
            {/* Chat container with gradient border */}
            <div
              className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg"
              style={{
                background: "linear-gradient(to right, #449CFB, #E85DF9)",
                padding: "3px",
                height: "60vh",
                maxHeight: "600px",
                boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Inner white container */}
              <div className="absolute inset-0 rounded-lg bg-white m-[3px] flex flex-col overflow-hidden">
                {/* Close button */}
                <button
                  onClick={toggleChat}
                  className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 pt-12 pr-12 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-slate-500">
                      <div>
                        <p>How can I help you today?</p>
                        <p className="mt-1 text-xs">Ask me anything about your healthcare policies.</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`mb-4 ${index === 0 ? "mt-2" : ""} ${message.sender === "user" ? "flex justify-end" : "flex justify-start"}`}
                      >
                        <div
                          className={`max-w-3/4 rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat input area */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Type anything you want to ask our AI chat agent"
                      className="w-full p-4 pr-16 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none h-[110px]"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!input.trim()}
                      className="absolute bottom-4 right-4 bg-[#8B5CF6] text-white rounded-full p-3 disabled:opacity-50 hover:bg-[#7C3AED] transition-colors"
                      aria-label="Send message"
                    >
                      <Image src="/send-icon.svg" alt="Send" width={20} height={20} />
                    </button>
                  </div>

                  {/* Suggested queries */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {suggestedQueries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuery(query)}
                        className="bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
