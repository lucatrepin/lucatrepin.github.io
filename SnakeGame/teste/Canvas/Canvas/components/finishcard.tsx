import {ArrowRight} from "lucide-react"

export default function FinishedFlashcard() {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden border-l-[8px] border-gray-300">
      {/* Top row */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="Japanese Flag">
            🇯🇵
          </span>
          <span className="text-gray-600 font-medium">Japanese</span>
        </div>
        <span className="text-gray-400 font-mono text-sm">1/100</span>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Word */}
        <div className="flex items-baseline gap-2">
          <p className="text-orange-500 text-2xl font-medium">Word:</p>
          <p className="text-2xl text-gray-800">元気 (Energetic)</p>
        </div>

        {/* Sentence */}
        <div className="space-y-4">
          <p className="text-3xl text-gray-800 font-semibold">田中さんはいつも元気で活発です。</p>
          <p className="text-lg text-gray-500 flex items-center">
            <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            Tanaka-san wa itsumo genki de kappatsu desu.
          </p>
        </div>

        {/* Translation */}
        <p className="text-xl text-gray-700 flex items-center">
          <ArrowRight className="mr-2 text-orange-500" />
          Mr. Tanaka is always energetic and lively.
        </p>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <p className="text-xs text-gray-400">© Copyright</p>

          {/* Progress dots */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full dot dot-1"/>
            <div className="w-3 h-3 rounded-full dot dot-2"/>
            <div className="w-3 h-3 rounded-full dot dot-3"/>
          </div>
        </div>
      </div>
    </div>
  )
}

