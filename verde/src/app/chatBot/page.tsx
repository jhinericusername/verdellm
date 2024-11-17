
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Send, Plus, Menu, Moon, Sun, Leaf } from 'lucide-react'
import { Ripple } from '@/components/ui/ripple'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

type Conversation = {
  id: number
  title: string
  messages: Message[]
}

export default function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [input, setInput] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [currentConversation?.messages])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && currentConversation) {
      const newMessage: Message = {
        id: Date.now(),
        text: input.trim(),
        sender: 'user'
      }
      const updatedConversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, newMessage]
      }
      setCurrentConversation(updatedConversation)
      setConversations(conversations.map(conv => 
        conv.id === currentConversation.id ? updatedConversation : conv
      ))
      setInput('')
      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now(),
          text: "This is a simulated eco-friendly response from Sustain 2.0.",
          sender: 'bot'
        }
        const updatedWithBotMessage = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, botMessage]
        }
        setCurrentConversation(updatedWithBotMessage)
        setConversations(conversations.map(conv => 
          conv.id === currentConversation.id ? updatedWithBotMessage : conv
        ))
      }, 1000)
    }
  }

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now(),
      title: `New Chat ${conversations.length + 1}`,
      messages: []
    }
    setConversations([newConversation, ...conversations])
    setCurrentConversation(newConversation)
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Persistent Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-10 flex items-center p-4 h-16">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
          <Menu className="h-6 w-6" />
        </Button>
        <Leaf className="h-8 w-8 text-green-500 mr-3" />
        <h1 className="text-xl font-bold">Sustain 2.0</h1>
        <div className="ml-auto flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <Moon className="h-4 w-4" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}>
          <div className="p-4 flex-1 flex flex-col">
            <Button onClick={startNewConversation} className="w-full mb-4 bg-gray-700 hover:bg-gray-600">
              <Plus className="mr-2 h-4 w-4" /> New chat
            </Button>
            <ScrollArea className="flex-1">
              {conversations.map(conv => (
                <Button
                  key={conv.id}
                  onClick={() => setCurrentConversation(conv)}
                  className={`w-full justify-start mb-2 ${currentConversation?.id === conv.id ? 'bg-gray-700' : 'bg-transparent'} hover:bg-gray-700`}
                >
                  {conv.title}
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            {currentConversation?.messages.map(message => (
              <Card key={message.id} className={`mb-4 ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[80%]`}>
                <CardContent className="p-3">
                  <p className={message.sender === 'user' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}>
                    {message.sender === 'user' ? 'You' : 'Sustain 2.0'}
                  </p>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">{message.text}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your eco-friendly message..."
                className="flex-1 resize-none"
                rows={1}
              />
              <Button type="submit" size="icon" className="bg-green-500 hover:bg-green-600 text-white relative overflow-hidden">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
                <Ripple color="rgba(255, 255, 255, 0.7)" duration={800} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}