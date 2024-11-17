'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Paperclip, Send, User, Plus, Settings, Zap, Leaf, ExternalLink, Earth, Apple, ChartNoAxesCombined} from 'lucide-react'
import VerdeLogo from "@/lib/images/verdelogo.png"
import GPTLogo from "@/lib/images/ChatGPT-Logo.png"
import {
  Dialog,
  DialogContent,
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  chatGPTLink?: string;
  showModal?: boolean;
}

export default function Component() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [openModal, setOpenModal] = useState<number | null>(null)

    const comparisonData = [
    {
      prompt: "Explain the concept of quantum entanglement.",
      verdeResponse: "Quantum entanglement is a phenomenon in quantum physics where two or more particles become interconnected in such a way that the quantum state of each particle cannot be described independently, even when separated by a large distance. This means that measuring the state of one particle instantly affects the state of its entangled partner, regardless of the distance between them.",
      chatGPTResponse: "Quantum entanglement is a fascinating phenomenon in quantum mechanics where two or more particles become 'entangled' and share a quantum state. This means that the properties of these particles are correlated, and measuring one particle instantly affects the other, no matter how far apart they are. Einstein famously called this 'spooky action at a distance.' It's a cornerstone of quantum computing and has potential applications in secure communication.",
      verdeMetrics: {
        accuracy: "95%",
        speed: "50ms",
        coherence: "High",
        creativity: "Medium"
      },
      chatGPTMetrics: {
        accuracy: "93%",
        speed: "100ms",
        coherence: "High",
        creativity: "High"
      }
    }
  ]

  const MetricRow = ({ metrics }: { metrics: Record<string, string> }) => (
    <div className="bg-muted p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="font-medium text-sm">{key}</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newUserMessage: Message = { id: Date.now(), text: message, sender: 'user' }
      setMessages(prevMessages => [...prevMessages, newUserMessage])
      setMessage('')
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = { 
          id: Date.now() + 1, 
          text: "This is a simulated AI response.", 
          sender: 'ai',
          chatGPTLink: `https://chat.openai.com/c/${Date.now()}`, // Simulated ChatGPT link
          showModal: false
        }
        setMessages(prevMessages => [...prevMessages, aiResponse])
      }, 1000)
    }
  }

  const energyData = [
    { metric: "Energy per query", verde: "0.1 kWh", chatGPT: "0.2 kWh", icon: "Zap" },
    { metric: "Daily consumption", verde: "24 kWh", chatGPT: "48 kWh", icon: "Apple" },
    { metric: "Weekly average", verde: "168 kWh", chatGPT: "336 kWh", icon: "ChartNoAxesCombined" },
    { metric: "Carbon footprint", verde: "10 kg CO2e", chatGPT: "20 kg CO2e", icon: "Earth" },
  ]

  return (
    <div className="flex flex-col h-screen bg-maincolor">
      

      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <div className="w-96 bg-sidebarcolor p-4 flex flex-col border-r overflow-y-auto">
          {/* <div className="flex justify-center items-center">
            <h2 className="text-xl font-bold mb-4">Energy Consumption</h2>
          </div> */}
          <div className="mb-4">
            <div className="grid grid-cols-[1fr,auto,1fr] gap-4">
              <h3 className="text-lg font-semibold text-customgreen text-center">Verde</h3>
              <h3 className="text-lg font-semibold text-center"></h3>

              <h3 className="text-lg font-semibold text-gray-700 text-center">ChatGPT</h3>
            </div>
          </div>
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 mb-auto">
            {energyData.map((data, index) => (
              <>
                <Card key={`verde-${index}`} className="bg-green-50">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-2">{data.metric}</h3>
                    <span className="text-lg font-bold text-customgreen">{data.verde}</span>
                  </CardContent>
                </Card>
                <div className="flex items-center justify-center w-8">
                  {data.icon === "Zap" && <Zap className="h-6 w-6 text-gray-500" aria-hidden="true" />}
                  {data.icon === "Apple" && <Apple className="h-6 w-6 text-gray-500" aria-hidden="true" />}
                  {data.icon === "ChartNoAxesCombined" && <ChartNoAxesCombined className="h-6 w-6 text-gray-500" aria-hidden="true" />}
                  {data.icon === "Earth" && <Earth className="h-6 w-6 text-gray-500" aria-hidden="true" />}
                </div>
                <Card key={`chatgpt-${index}`} className="bg-white">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-2">{data.metric}</h3>
                    <span className="text-lg font-bold text-gray-700">{data.chatGPT}</span>
                  </CardContent>
                </Card>
              </>
            ))}
          </div>

          {/* New options at the bottom */}
          <div className="mt-4 flex justify-between space-x-2">
            <Button variant="ghost" size="sm" className="w-1/2 shadow bg-white">
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Create Agent
            </Button>
            <Button variant="ghost" size="sm" className="w-1/2 shadow bg-white">
              <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
              Settings
            </Button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
        <header >
          <div className="container mx-auto px-4 py-4 flex justify-center items-center">
            <div className="flex items-center space-x-2">
              <img src={VerdeLogo.src} alt="verde logo" className='h-8 w-8' />
              <span className="text-2xl font-bold text-customgreen">verde</span>
            </div>
          </div>
        </header>
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-customgreen text-white' : 'bg-gray-200'}`}>
                  {msg.sender === 'ai' && (
                    <div className="flex items-center mb-2">
                      <div className="p-2">
                        <img src={VerdeLogo.src} alt="verde logo" className='h-6 w-6' />
                      </div>
                      <span className="font-semibold">verde</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                  {msg.chatGPTLink && (
                    <button 
                      onClick={() => setOpenModal(msg.id)}
                      className="flex items-center mt-2 text-sm text-blue-600 hover:underline"
                    >
                      Compare Models 
                      <ExternalLink className="h-4 w-4 ml-1" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Dialog open={openModal !== null} onOpenChange={() => setOpenModal(null)}>
            <DialogContent className="max-w-[90vw] w-[1200px] min-h-[80vh] max-h-[90vh] overflow-y-auto ">
              
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-center">LLM Comparison</h3>
            {comparisonData.map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="flex bg-white shadow rounded-lg overflow-hidden">
                  <div className="w-1/4 bg-muted p-4 flex items-center justify-center">
                    <h3 className="font-semibold text-lg text-center">Prompt</h3>
                  </div>
                  <div className="w-3/4 p-4">
                    <p>{item.prompt}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Verde Response */}
                  <div className="flex bg-white shadow rounded-lg overflow-hidden">
                    <div className="w-1/4 bg-muted p-4 flex flex-col justify-center items-center space-y-2">
                      <img src={VerdeLogo.src} alt="" className="h-20 w-20"/>
                      <h3 className="font-semibold text-lg text-center">Verde</h3>
                    </div>
                    <div className="w-3/4 flex flex-col">
                      <div className="p-3 flex-grow">
                        <p>{item.verdeResponse}</p>
                      </div>
                      <div className="p-4">
                        <MetricRow metrics={item.verdeMetrics} />
                      </div>
                    </div>
                  </div>
                  {/* ChatGPT Response */}
                  <div className="flex bg-white shadow rounded-lg overflow-hidden">
                    <div className="w-1/4 bg-muted p-4 flex flex-col justify-center items-center space-y-2">
                      <img src={GPTLogo.src} alt="" className="h-20"/>
                      <h3 className="font-semibold text-lg text-center">ChatGPT</h3>
                    </div>
                    <div className="w-3/4 flex flex-col">
                      <div className="p-4">
                        <MetricRow metrics={item.chatGPTMetrics} />
                      </div>
                      <div className="p-4 flex-grow">
                        <p>{item.chatGPTResponse}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

          {/* Input Area */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <Button type="button" size="icon" variant="ghost" className="shrink-0">
                <Paperclip className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Input
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}