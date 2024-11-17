'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Leaf, Droplet, Wind, Award, Share2, Download, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { div } from 'framer-motion/client'

export default function Profile() {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'lifetime'>('monthly')
  const [showShareOptions, setShowShareOptions] = useState(false)

  const impactData = {
    daily: { trees: 2, bottles: 15, co2: 5 },
    monthly: { trees: 60, bottles: 450, co2: 150 },
    lifetime: { trees: 720, bottles: 5400, co2: 1800 }
  }

  const currentImpact = impactData[timeframe]

  const badges = [
    { name: 'Carbon Hero', achieved: true },
    { name: 'Plastic Warrior', achieved: true },
    { name: 'Tree Hugger', achieved: false }
  ]
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-maincolor to-sidebarcolor p-8">
        <Button variant="outline" className="bg-white">
            <Link
             href="/"
            >
            Back to Chat
            </Link>
        </Button>
     
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <header className="bg-customgreen text-white p-6">
          <h1 className="text-3xl font-bold">Welcome back, Eco Warrior!</h1>
          <p className="text-lg mt-2">Making the planet greener <strong>one query at a time...</strong></p>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ImpactCard
              icon={<Leaf className="w-8 h-8 text-green-600" />}
              title="Trees Saved"
              value={currentImpact.trees}
              unit="trees"
            />
            <ImpactCard
              icon={<Droplet className="w-8 h-8 text-blue-600" />}
              title="Bottles Saved"
              value={currentImpact.bottles}
              unit="bottles"
            />
            <ImpactCard
              icon={<Wind className="w-8 h-8 text-gray-600" />}
              title="CO2 Offset"
              value={currentImpact.co2}
              unit="kg"
            />
          </div>

          <div className="flex justify-center mb-8 drop-shadow">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as 'daily' | 'monthly' | 'lifetime')}
              className="bg-green-100 text-green-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="daily">Daily Impact</option>
              <option value="monthly">Monthly Impact</option>
              <option value="lifetime">Lifetime Impact</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8 drop-shadow">
            {badges.map((badge) => (
              <Badge key={badge.name} name={badge.name} achieved={badge.achieved} />
            ))}
          </div>

          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Green Progress</h2>
            <div className="flex items-center">
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={75}
                  text="75%"
                  styles={buildStyles({
                    textColor: '#059669',
                    pathColor: '#059669',
                    trailColor: '#D1FAE5'
                  })}
                />
              </div>
              <p className="ml-6 text-gray-600">
                You're 75% of the way to your next milestone! Keep up the great work!
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Eco Fact</h2>
            <p className="text-gray-600">
              By saving {currentImpact.trees} trees, you've offset {currentImpact.co2 * 20} kg of CO2—equivalent to
              driving {(currentImpact.co2 * 20 * 2.5).toFixed(0)} fewer miles!
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="bg-customgreen text-white px-4 py-2 rounded-full flex items-center hover:bg-green-700 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Your Impact
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Download Report
            </button>
          </div>

          {showShareOptions && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-4 bg-gray-100 rounded-lg"
            >
              <h3 className="font-semibold mb-2">Share on:</h3>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Twitter</button>
                <button className="bg-blue-700 text-white px-3 py-1 rounded">Facebook</button>
                <button className="bg-green-600 text-white px-3 py-1 rounded">WhatsApp</button>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
 
interface ImpactCardProps{
        icon: React.ReactNode;
        title: string;
        value: number;
        unit: string;
    }

function ImpactCard({ icon, title, value, unit }: ImpactCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      {icon}
      <h2 className="text-xl font-semibold mt-4 mb-2">{title}</h2>
      <p className="text-3xl font-bold text-green-600">
        {value} <span className="text-sm text-gray-500">{unit}</span>
      </p>
    </div>
  )
}

interface BadgeProps{
    name: string;
    achieved: boolean;
}

function Badge({ name, achieved }: BadgeProps) {
  return (
    <div
      className={`flex items-center ${
        achieved ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
      } rounded-full px-4 py-2`}
    >
      <Award className={`w-5 h-5 mr-2 ${achieved ? 'text-yellow-500' : 'text-gray-400'}`} />
      <span className="font-medium">{name}</span>
    </div>
  )
}