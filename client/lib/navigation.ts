export type NavigationSection = "dashboard" | "marketplace" | "hub" | "governance" | "stake" | "swap" | "create-ip"

export interface NavigationItem {
  id: NavigationSection
  label: string
  icon: string
}

export const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "Home" },
  { id: "marketplace", label: "IP Marketplace", icon: "ShoppingCart" },
  { id: "hub", label: "The Hub", icon: "Rocket" },
  { id: "governance", label: "Governance", icon: "Vote" },
  { id: "stake", label: "Stake", icon: "Lock" },
  { id: "swap", label: "Swap", icon: "ArrowLeftRight" },
  { id: "create-ip", label: "Create IP", icon: "Plus" },
]
