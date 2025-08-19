"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import type { NavigationSection } from "@/lib/navigation"

// Section Components
import { DashboardOverview } from "@/components/sections/dashboard-overview"
import { IPMarketplace } from "@/components/sections/ip-marketplace"
import { TheHub } from "@/components/sections/the-hub"
import { Governance } from "@/components/sections/governance"
import { Stake } from "@/components/sections/stake"
import { Swap } from "@/components/sections/swap"
import { CreateIP } from "@/components/sections/create-ip"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<NavigationSection>("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "marketplace":
        return <IPMarketplace />
      case "hub":
        return <TheHub />
      case "governance":
        return <Governance />
      case "stake":
        return <Stake />
      case "swap":
        return <Swap />
      case "create-ip":
        return <CreateIP />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader />
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">{renderSection()}</main>
      </div>
    </div>
  )
}
