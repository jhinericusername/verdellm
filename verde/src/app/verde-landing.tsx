import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Component() {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the query, perhaps by redirecting to the chat page
    console.log('Query submitted:', query)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFAF0] p-4">
      <h1 className="text-6xl font-bold mb-8">
        <span className="text-[#2E8B57]">verde</span>
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative">
          <Input
            type="text"
            placeholder="Ask Verde anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-4 pr-11 py-3 text-lg border-2 border-[#2E8B57] focus:outline-none focus:border-[#228B22] bg-white placeholder-gray-400"
          />
          <Link href="/chat" passHref>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#2E8B57] text-white rounded-full p-1.5 hover:bg-[#228B22] transition-colors duration-200"
              aria-label="Submit query"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}