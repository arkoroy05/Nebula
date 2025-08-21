import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function PortfolioSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* AI Assistant first (after graph in layout) */}
      <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">AI Assistant</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full opacity-80 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            AI is analyzing your portfolio performance...
          </div>
        </CardContent>
      </Card>

      {/* Portfolio value card with inline metrics */}
      <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Portfolio Value</h3>
          <div className="text-4xl font-bold mb-4">$47,832.45</div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              Compared to last month +12.8%
            </div>
            <div className="text-sm text-gray-400">
              Yearly performance: <span className="text-green-400">$52,104.33 ↗</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
