"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ArrowRight } from "lucide-react"

export function PremiumSidebar() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("premiumSidebarDismissed") : null
    if (saved === "true") setDismissed(true)
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem("premiumSidebarDismissed", "true")
    } catch {}
  }

  const handleRestore = () => {
    setDismissed(false)
    try {
      localStorage.removeItem("premiumSidebarDismissed")
    } catch {}
  }

  if (dismissed) {
    return (
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-4 text-sm text-gray-300">
        Exclusive Access card dismissed. {" "}
        <button onClick={handleRestore} className="text-blue-300 hover:text-blue-200 underline">
          Show again
        </button>
      </div>
    )
  }

  return (
    <Card className="bg-blue-500/10 backdrop-blur-2xl border border-blue-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-300">Exclusive Access!</h3>
          <button aria-label="Dismiss premium card" onClick={handleDismiss}>
            <X className="w-4 h-4 text-gray-400 cursor-pointer" />
          </button>
        </div>

        <h4 className="text-xl font-bold mb-3">
          Unlock <span className="text-blue-300">Premium Research</span> with NEBL Staking
        </h4>

        <p className="text-sm text-gray-300 mb-4">Stake your tokens and access exclusive IP deals!</p>

        <div className="text-sm text-gray-300 mb-6 space-y-2">
          <p>• Access to premium research projects</p>
          <p>• Higher staking rewards and governance rights</p>
          <p>• Early access to new IP opportunities</p>
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Stake Now</Button>
          <button className="flex items-center text-sm text-blue-300 hover:text-blue-200">
            Learn more <ArrowRight className="w-3 h-3 ml-1" />
          </button>
          <button className="text-xs text-gray-400 hover:text-gray-300" onClick={handleDismiss}>Don't show again</button>
        </div>
      </CardContent>
    </Card>
  )
}
