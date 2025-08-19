import { PortfolioSection } from "@/components/portfolio-section"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { TopHoldings } from "@/components/top-holdings"
import { ActiveProjects } from "@/components/active-projects"
import { PremiumSidebar } from "@/components/premium-sidebar"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Portfolio</h1>
          <p className="text-gray-400">Connected wallet: 0x7a2f...b8c9</p>
        </div>
        <select className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-sm">
          <option>Avalanche</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioSection />
          <AnalyticsOverview />
          <TopHoldings />
          <ActiveProjects />
        </div>
        <div className="space-y-6">
          <PremiumSidebar />
        </div>
      </div>
    </div>
  )
}
