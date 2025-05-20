"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare } from "lucide-react"
import mockData from "@/data/mockData.json"

interface Message {
  text: string
  isUser: boolean
  timestamp: Date
}

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [answerIndex, setAnswerIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { chatAnswers } = mockData

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate typing delay before bot responds
    setTimeout(() => {
      // Get next answer from the predefined list
      const answer = chatAnswers[answerIndex % chatAnswers.length]

      // Add bot message
      const botMessage: Message = {
        text: answer,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      // Move to next answer for future questions
      setAnswerIndex((prev) => prev + 1)
    }, 1000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-custom hover:bg-primary-700 transition-all"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6 no-shadow" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 rounded-lg border bg-white shadow-custom">
      <div className="flex items-center justify-between border-b bg-primary-600 p-3 text-white">
        <h3 className="font-medium">Nedl Assistant</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full p-1 hover:bg-primary-700 no-shadow"
          aria-label="Close chat"
        >
          <X className="h-5 w-5 no-shadow" />
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-3">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-sm text-slate-500">
            <div>
              <p>How can I help you today?</p>
              <p className="mt-1 text-xs">Ask me anything about your healthcare policies.</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 max-w-[85%] rounded-lg p-2 shadow-custom ${
                message.isUser ? "ml-auto bg-primary-100 text-primary-800" : "bg-slate-100 text-slate-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="mt-1 text-right text-[10px] text-slate-500">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 shadow-custom"
          />
          <button
            type="submit"
            className="rounded-md bg-primary-600 p-2 text-white hover:bg-primary-700 shadow-custom"
            aria-label="Send message"
          >
            <Send className="h-4 w-4 no-shadow" />
          </button>
        </div>
      </form>
    </div>
  )
}
