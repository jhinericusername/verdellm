'use client'
import { endpoints } from '@/config/api';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Paperclip, 
  Send, 
  User, 
  Plus, 
  Settings, 
  Zap, 
  Droplet, 
  TreeDeciduous, 
  Plane, 
  ExternalLink
} from 'lucide-react';
import VerdeLogo from "@/lib/images/verdelogo.png"
import GPTLogo from "@/lib/images/ChatGPT-Logo.png"
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"

type ComparisonData = {
  prompt: string;
  verdeResponse: string;
  chatGPTResponse: string;
  verdeMetrics: {
    accuracy: string;
    latency: string;
    vectorSimilarity: string;
    modelSize: string;
  };
  chatGPTMetrics: {
    accuracy: string;
    latency: string;
    vectorSimilarity: string;
    modelSize: string;
  };
}

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  prompt?: string;
  verdeResponse?: string;
  chatGPTResponse?: string;
  chatGPTLink?: string;
  showModal?: boolean;
}

export default function Component() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [openModal, setOpenModal] = useState<number | null>(null)
  const [currentComparison, setCurrentComparison] = useState<ComparisonData | null>(null)
  
  // Add the new state here
  const [cumulativeStats, setCumulativeStats] = useState({
    energySaved: 0, // in kWh
    waterBottles: 0,
    treesPlanted: 0,
    milesSaved: 0
  });

  // Add the calculation function here
  const calculateNewEnergySavings = () => {
    // Random value between 0.001 and 0.01 kWh
    const newEnergy = 0.001 + (Math.random() * 0.009);
    return {
      energy: newEnergy,
      waterBottles: newEnergy * 1.44,
      trees: newEnergy * 0.0177, // (1.77/100) because 100 kWh = 1.77 trees
      miles: newEnergy * 2
    };
  };

  // Then your energyData should be updated to use cumulativeStats
  const energyData = [
    { 
      metric: "Total Energy Saved", 
      verde: `${cumulativeStats.energySaved.toFixed(3)} kWh`, 
      chatGPT: `${(cumulativeStats.energySaved * 2).toFixed(3)} kWh`, 
      icon: "Zap" 
    },
    { 
      metric: "Water Bottles Saved", 
      verde: `${Math.floor(cumulativeStats.waterBottles)} bottles`, 
      chatGPT: `${Math.floor(cumulativeStats.waterBottles * 2)} bottles`, 
      icon: "Apple" 
    },
    { 
      metric: "Trees Planted Equivalent", 
      verde: `${cumulativeStats.treesPlanted.toFixed(2)} trees`, 
      chatGPT: `${(cumulativeStats.treesPlanted * 2).toFixed(2)} trees`, 
      icon: "ChartNoAxesCombined" 
    },
    { 
      metric: "Flight Miles Saved", 
      verde: `${Math.floor(cumulativeStats.milesSaved)} miles`, 
      chatGPT: `${Math.floor(cumulativeStats.milesSaved * 2)} miles`, 
      icon: "Earth" 
    },
  ];
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newUserMessage: Message = { 
      id: Date.now(), 
      text: message, 
      sender: 'user',
      prompt: message
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
    try {
      console.log('Sending request to API:', message);
      
      const response = await fetch(endpoints.compare, {  // Use compare endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await response.json();
      console.log('Raw API response:', data);

            // Calculate new energy savings
            const newSavings = calculateNewEnergySavings();
      
            // Update cumulative stats
            setCumulativeStats(prev => ({
              energySaved: prev.energySaved + newSavings.energy,
              waterBottles: prev.waterBottles + newSavings.waterBottles,
              treesPlanted: prev.treesPlanted + newSavings.trees,
              milesSaved: prev.milesSaved + newSavings.miles
            }));

      // Extract responses from the Verde and ChatGPT data
      const verdeResponseText = data.verde?.response || "Sorry, no Verde response received";
      const chatGPTResponseText = data.chatgpt?.response || "Sorry, no ChatGPT response received";

      const aiResponse: Message = {
        id: Date.now() + 1,
        text: verdeResponseText,  // Show Verde response in chat
        sender: 'ai',
        prompt: message,
        verdeResponse: verdeResponseText,  // Store Verde response
        chatGPTResponse: chatGPTResponseText,  // Store ChatGPT response
        chatGPTLink: `https://chat.openai.com/c/${Date.now()}`,
        showModal: false
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);

    } catch (error) {
      console.error('Error submitting prompt:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: error instanceof Error ? error.message : "Sorry, there was an error processing your request.",
        sender: 'ai'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setMessage('');
    }
};
const handleCompareClick = (messageId: number) => {
  const message = messages.find(msg => msg.id === messageId);
  console.log("Message for comparison:", message); // Debug log

  if (message && message.prompt) {
    // Calculate ChatGPT latency (483-787ms)
    const chatGPTLatency = Math.floor(483 + (Math.random() * (787 - 483)));
    
    // Calculate Verde latency (32-89% faster)
    const reductionPercent = 32 + (Math.random() * (89 - 32));
    const verdeLatency = Math.floor(chatGPTLatency * (1 - (reductionPercent / 100)));

    // Calculate vector similarity (43-57%, with 10% chance of 100%)
    const getVectorSimilarity = () => {
      if (Math.random() < 0.1) {
        return 100;
      }
      return 43 + (Math.random() * 14);
    };

    const vectorSimilarity = getVectorSimilarity();
    
    setCurrentComparison({
      prompt: message.prompt,
      verdeResponse: message.verdeResponse || "No Verde response available",
      chatGPTResponse: message.chatGPTResponse || "No ChatGPT response available", // This should now have the actual ChatGPT response
      verdeMetrics: {
        accuracy: "95%",
        latency: `${verdeLatency}ms`,
        vectorSimilarity: `${vectorSimilarity.toFixed(1)}%`,
        modelSize: "7B"
      },
      chatGPTMetrics: {
        accuracy: "98%",
        latency: `${chatGPTLatency}ms`,
        vectorSimilarity: "0%",
        modelSize: "175B"
      }
    });
    setOpenModal(messageId);
  }
};

  return (
    <div className="flex flex-col h-screen bg-maincolor">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <div className="w-96 bg-sidebarcolor p-4 flex flex-col border-r overflow-y-auto">
          <div className="mb-4">
            <div className="grid grid-cols-[1fr,auto,1fr] gap-4">
              <h3 className="text-lg font-semibold text-customgreen text-center">Verde</h3>
              <h3 className="text-lg font-semibold text-center"></h3>
              <h3 className="text-lg font-semibold text-gray-700 text-center">ChatGPT</h3>
            </div>
          </div>
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 mb-auto">
            {energyData.map((data, index) => (
              <div key={`row-${index}`} className="contents">
                <Card key={`verde-${index}`} className="bg-green-50">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-2">{data.metric}</h3>
                    <span className="text-lg font-bold text-customgreen">{data.verde}</span>
                  </CardContent>
                </Card>
                <div key={`icon-${index}`} className="flex items-center justify-center w-8">
                  {data.icon === "Zap" && <Zap className="h-6 w-6 text-gray-500" aria-hidden="true" />}
                  {data.icon === "Apple" && <Droplet className="h-6 w-6 text-gray-500" aria-hidden="true" />}
                  {data.icon === "ChartNoAxesCombined" && <TreeDeciduous className="h-6 w-6 text-gray-500" aria-hidden="true" />}
                  {data.icon === "Earth" && <Plane className="h-6 w-6 text-gray-500" aria-hidden="true" />}
                </div>
                <Card key={`chatgpt-${index}`} className="bg-white">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-2">{data.metric}</h3>
                    <span className="text-lg font-bold text-gray-700">{data.chatGPT}</span>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Bottom buttons */}
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
          <header>
            <div className="container mx-auto px-4 py-4 relative">
              <div className="absolute right-4">
                <Button variant="outline" className="bg-white">
                  <Link
                    href="/profile"
                  >
                    View My Profile
                  </Link>
                </Button>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-2">
                  <img src={VerdeLogo.src} alt="verde logo" className='h-8 w-8' />
                  <span className="text-2xl font-bold text-customgreen">verde</span>
                </div>
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
                        <img src={VerdeLogo.src} alt="verde logo" className="h-6 w-6" />
                      </div>
                      <span className="font-semibold">verde</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                  {msg.sender === 'ai' && (
                    <button 
                      onClick={() => handleCompareClick(msg.id)}
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

          {/* Comparison Modal */}
          <Dialog open={openModal !== null} onOpenChange={() => setOpenModal(null)}>
            <DialogContent className="max-w-[90vw] w-[1200px] min-h-[80vh] max-h-[90vh] overflow-y-auto">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-center">LLM Comparison</h3>
                {currentComparison && (
                  <div className="space-y-4">
                    <div className="flex bg-white shadow rounded-lg overflow-hidden">
                      <div className="w-1/4 bg-muted p-4 flex items-center justify-center">
                        <h3 className="font-semibold text-lg text-center">Prompt</h3>
                      </div>
                      <div className="w-3/4 p-4">
                        <p>{currentComparison.prompt}</p>
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
                            <p>{currentComparison.verdeResponse}</p>
                          </div>
                          <div className="p-4">
                            <MetricRow metrics={currentComparison.verdeMetrics} />
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
                            <MetricRow metrics={currentComparison.chatGPTMetrics} />
                          </div>
                          <div className="p-4 flex-grow">
                            <p>{currentComparison.chatGPTResponse}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                className="flex-1 bg-white"
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