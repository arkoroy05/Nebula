"use client"

import { Home, ShoppingCart, Rocket, Vote, Lock, ArrowLeftRight, Plus } from "lucide-react"
import type { NavigationSection } from "@/lib/navigation"

interface SidebarProps {
  activeSection: NavigationSection
  onSectionChange: (section: NavigationSection) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as NavigationSection, icon: Home, label: "Dashboard" },
    { id: "marketplace" as NavigationSection, icon: ShoppingCart, label: "IP Marketplace" },
    { id: "hub" as NavigationSection, icon: Rocket, label: "The Hub" },
    { id: "governance" as NavigationSection, icon: Vote, label: "Governance" },
    { id: "stake" as NavigationSection, icon: Lock, label: "Stake" },
    { id: "swap" as NavigationSection, icon: ArrowLeftRight, label: "Swap" },
    { id: "create-ip" as NavigationSection, icon: Plus, label: "Create IP" },
  ]

  return (
    <aside className="w-16 bg-black border-r border-white/10 py-6 sticky top-0 h-[calc(100vh-0px)] z-40">
      <div className="flex flex-col items-center space-y-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`p-3 rounded-lg transition-all duration-200 group relative ${
              activeSection === item.id
                ? "bg-blue-600/20 text-blue-400 backdrop-blur-sm border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5 hover:backdrop-blur-sm"
            }`}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 backdrop-blur-sm border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}
