import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

export function TopHoldings() {
  return (
    <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">My Top Holdings</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">03 of 7</span>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/3 backdrop-blur-lg border border-white/5 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-semibold">NEBL Token</span>
              </div>
              <Plus className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-sm text-gray-400 mb-3">12,450 NEBL Staked</div>
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="w-6 h-6 border-2 border-gray-800">
                    <AvatarImage src={`/diverse-avatars.png?height=24&width=24&query=avatar+${i}`} />
                    <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-gray-400">120+</span>
            </div>
          </div>

          <div className="bg-white/3 backdrop-blur-lg border border-white/5 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold">Research NFTs</span>
              </div>
              <Plus className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-sm text-gray-400 mb-3">8 IP Assets Owned</div>
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="w-6 h-6 border-2 border-gray-800">
                    <AvatarImage src={`/abstract-nft-concept.png?height=24&width=24&query=nft+${i}`} />
                    <AvatarFallback className="text-xs">N{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-gray-400">45+</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
