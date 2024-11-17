import Image from "next/image"

export default function Component() {
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

  const MetricRow: React.FC<{ metrics: Record<string, string> }> = ({ metrics }) => (
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

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">LLM Comparison</h1>
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
            <div className="flex bg-white shadow rounded-lg overflow-hidden">
              <div className="w-1/4 bg-muted p-4 flex flex-col justify-center items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Verde Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h3 className="font-semibold text-lg text-center">Verde</h3>
              </div>
              <div className="w-3/4 flex flex-col">
                <div className="p-4 flex-grow">
                  <p>{item.verdeResponse}</p>
                </div>
                <div className="p-4">
                  <MetricRow metrics={item.verdeMetrics} />
                </div>
              </div>
            </div>
            <div className="flex bg-white shadow rounded-lg overflow-hidden">
              <div className="w-1/4 bg-muted p-4 flex flex-col justify-center items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="ChatGPT Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
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
  )
}