"use client"

import { useState } from "react"
import { Lock, Unlock, TrendingUp, Calendar, Coins, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StakePosition {
  id: string
  amount: number
  lockPeriod: number
  startDate: string
  endDate: string
  apy: number
  status: "active" | "unlocked" | "pending"
  rewards: number
}

const mockStakePositions: StakePosition[] = [
  {
    id: "1",
    amount: 5000,
    lockPeriod: 90,
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    apy: 12.5,
    status: "active",
    rewards: 156.25,
  },
  {
    id: "2",
    amount: 2500,
    lockPeriod: 30,
    startDate: "2024-02-01",
    endDate: "2024-03-03",
    apy: 8.0,
    status: "unlocked",
    rewards: 16.44,
  },
  {
    id: "3",
    amount: 10000,
    lockPeriod: 180,
    startDate: "2024-03-01",
    endDate: "2024-08-28",
    apy: 18.5,
    status: "active",
    rewards: 462.33,
  },
]

const lockPeriodOptions = [
  { days: 14, apy: 5.5, multiplier: 1.0 },
  { days: 30, apy: 8.0, multiplier: 1.2 },
  { days: 90, apy: 12.5, multiplier: 1.5 },
  { days: 180, apy: 18.5, multiplier: 2.0 },
  { days: 365, apy: 25.0, multiplier: 3.0 },
]

export function Stake() {
  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedLockPeriod, setSelectedLockPeriod] = useState(30)
  const [showNewStake, setShowNewStake] = useState(false)

  // Mock user balance
  const userBalance = 25000

  // Calculate totals
  const totalStaked = mockStakePositions.reduce((sum, position) => sum + position.amount, 0)
  const totalRewards = mockStakePositions.reduce((sum, position) => sum + position.rewards, 0)
  const activeStakes = mockStakePositions.filter((position) => position.status === "active").length

  const selectedOption = lockPeriodOptions.find((option) => option.days === selectedLockPeriod)
  const estimatedRewards = stakeAmount
    ? (Number.parseFloat(stakeAmount) * (selectedOption?.apy || 0)) / 100 / (365 / selectedLockPeriod)
    : 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600/20 text-green-400 border-green-500/30"
      case "unlocked":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Lock className="w-4 h-4" />
      case "unlocked":
        return <Unlock className="w-4 h-4" />
      case "pending":
        return <Calendar className="w-4 h-4" />
      default:
        return <Lock className="w-4 h-4" />
    }
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const getProgressPercent = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = Date.now()
    if (end <= start) return 0
    const raw = ((now - start) / (end - start)) * 100
    return Math.max(0, Math.min(100, Math.round(raw)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staking</h1>
          <p className="text-gray-400 mt-1">Stake NEBL tokens to earn rewards and governance power</p>
        </div>
        <Button
          onClick={() => setShowNewStake(!showNewStake)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Stake
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Staked", value: `${totalStaked.toLocaleString()} NEBL`, icon: Lock, color: "text-blue-400" },
          {
            label: "Total Rewards",
            value: `${totalRewards.toFixed(2)} NEBL`,
            icon: TrendingUp,
            color: "text-green-400",
          },
          { label: "Active Stakes", value: activeStakes.toString(), icon: Coins, color: "text-purple-400" },
          {
            label: "Available Balance",
            value: `${userBalance.toLocaleString()} NEBL`,
            icon: Unlock,
            color: "text-orange-400",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border text-center"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* New Stake Form */}
      {showNewStake && (
        <div
          className="p-6 rounded-xl border"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 className="text-xl font-bold mb-6">Create New Stake</h2>

          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Stake Amount</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 pr-16"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">NEBL</div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-400">Available: {userBalance.toLocaleString()} NEBL</span>
                <Button
                  onClick={() => setStakeAmount(userBalance.toString())}
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                >
                  Max
                </Button>
              </div>
            </div>

            {/* Lock Period Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Lock Period</label>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {lockPeriodOptions.map((option) => (
                  <button
                    key={option.days}
                    onClick={() => setSelectedLockPeriod(option.days)}
                    className={`p-4 rounded-lg border text-center transition-all duration-200 ${
                      selectedLockPeriod === option.days
                        ? "bg-blue-600/20 border-blue-500/50 text-blue-400"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                    }`}
                  >
                    <p className="font-bold text-lg">{option.days}d</p>
                    <p className="text-sm text-green-400">{option.apy}% APY</p>
                    <p className="text-xs text-gray-400">{option.multiplier}x voting</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Stake Summary */}
            {stakeAmount && (
              <div
                className="p-4 rounded-lg border"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <h3 className="font-medium mb-3">Stake Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stake Amount:</span>
                    <span className="text-white">{Number.parseFloat(stakeAmount).toLocaleString()} NEBL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lock Period:</span>
                    <span className="text-white">{selectedLockPeriod} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">APY:</span>
                    <span className="text-green-400">{selectedOption?.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Rewards:</span>
                    <span className="text-green-400">{estimatedRewards.toFixed(2)} NEBL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Voting Multiplier:</span>
                    <span className="text-purple-400">{selectedOption?.multiplier}x</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="text-gray-400">Unlock Date:</span>
                    <span className="text-white">
                      {new Date(Date.now() + selectedLockPeriod * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              disabled={!stakeAmount || Number.parseFloat(stakeAmount) <= 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium disabled:opacity-50"
            >
              Stake Tokens
            </Button>
          </div>
        </div>
      )}

      {/* Active Stakes */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Stakes</h2>
        <div className="space-y-4">
          {mockStakePositions.map((position) => (
            <div
              key={position.id}
              className="p-6 rounded-xl border"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{position.amount.toLocaleString()} NEBL</h3>
                    <p className="text-sm text-gray-400">
                      Staked on {new Date(position.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full border flex items-center gap-2 ${getStatusColor(position.status)}`}
                  >
                    {getStatusIcon(position.status)}
                    {position.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">{position.apy}% APY</p>
                  <p className="text-sm text-gray-400">{position.lockPeriod} day lock</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Rewards Earned</p>
                  <p className="text-lg font-bold text-green-400">{position.rewards.toFixed(2)} NEBL</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Lock Period</p>
                  <p className="text-lg font-bold text-white">{position.lockPeriod} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">End Date</p>
                  <p className="text-lg font-bold text-white">{new Date(position.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Days Remaining</p>
                  <p className="text-lg font-bold text-blue-400">
                    {position.status === "active" ? getDaysRemaining(position.endDate) : "0"}
                  </p>
                </div>
              </div>

              {/* Progress Bar for Active Stakes */}
              {position.status === "active" && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Lock Progress</span>
                    <span className="text-sm text-white">{getProgressPercent(position.startDate, position.endDate)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercent(position.startDate, position.endDate)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {position.status === "unlocked" && (
                  <>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Claim Rewards ({position.rewards.toFixed(2)} NEBL)
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Unstake ({position.amount.toLocaleString()} NEBL)
                    </Button>
                  </>
                )}
                {position.status === "active" && (
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Claim Rewards ({position.rewards.toFixed(2)} NEBL)
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staking Info */}
      <div
        className="p-6 rounded-xl border"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h3 className="font-bold mb-4">Staking Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2 text-blue-400">Benefits</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Earn passive rewards on your NEBL tokens</li>
              <li>• Gain voting power in governance proposals</li>
              <li>• Longer locks provide higher APY and voting multipliers</li>
              <li>• Rewards are automatically compounded</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-yellow-400">Important Notes</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Tokens are locked for the selected period</li>
              <li>• Early unstaking incurs a 10% penalty</li>
              <li>• Rewards can be claimed at any time</li>
              <li>• Minimum stake amount is 100 NEBL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
