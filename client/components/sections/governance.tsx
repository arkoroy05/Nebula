"use client"

import { useState } from "react"
import { Vote, Plus, CheckCircle, XCircle, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Proposal {
  id: string
  title: string
  description: string
  targetContract: string
  functionSignature: string
  parameters: string
  creator: string
  votesFor: number
  votesAgainst: number
  totalVotes: number
  status: "active" | "passed" | "rejected" | "executed"
  endTime: string
  createdAt: string
}

const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Increase Research Funding Pool",
    description: "Proposal to increase the research funding pool allocation from 15% to 20% of total treasury",
    targetContract: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C89",
    functionSignature: "updateFundingAllocation(uint256)",
    parameters: "20",
    creator: "0x1234...5678",
    votesFor: 15420,
    votesAgainst: 3280,
    totalVotes: 18700,
    status: "active",
    endTime: "2024-04-15T23:59:59Z",
    createdAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Add New IP Category: Renewable Energy",
    description: "Proposal to add Renewable Energy as a new category for IP tokens and research projects",
    targetContract: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C89",
    functionSignature: "addCategory(string)",
    parameters: "Renewable Energy",
    creator: "0x9876...4321",
    votesFor: 22150,
    votesAgainst: 1850,
    totalVotes: 24000,
    status: "passed",
    endTime: "2024-03-30T23:59:59Z",
    createdAt: "2024-03-15T14:30:00Z",
  },
  {
    id: "3",
    title: "Reduce Minimum Staking Period",
    description: "Proposal to reduce the minimum staking period from 30 days to 14 days to improve liquidity",
    targetContract: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C89",
    functionSignature: "updateMinStakingPeriod(uint256)",
    parameters: "14",
    creator: "0x5555...7777",
    votesFor: 8920,
    votesAgainst: 12080,
    totalVotes: 21000,
    status: "rejected",
    endTime: "2024-03-25T23:59:59Z",
    createdAt: "2024-03-10T09:15:00Z",
  },
]

export function Governance() {
  const [activeTab, setActiveTab] = useState<"proposals" | "create">("proposals")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetContract: "",
    functionSignature: "",
    parameters: "",
  })

  // Mock user voting power data
  const userVotingPower = {
    totalPower: 2847,
    stakedTokens: 15420,
    delegatedPower: 1205,
    availableVotes: 2847,
  }

  const handleVote = (proposalId: string, support: boolean) => {
    console.log(`Voting ${support ? "for" : "against"} proposal ${proposalId}`)
    // Implement voting logic
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30"
      case "passed":
        return "bg-green-600/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-600/20 text-red-400 border-red-500/30"
      case "executed":
        return "bg-purple-600/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "passed":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      case "executed":
        return <Zap className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Governance</h1>
          <p className="text-gray-400 mt-1">Participate in protocol governance and decision making</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setActiveTab("proposals")}
            variant={activeTab === "proposals" ? "default" : "outline"}
            className={
              activeTab === "proposals"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
            }
          >
            <Vote className="w-4 h-4 mr-2" />
            Proposals
          </Button>
          <Button
            onClick={() => setActiveTab("create")}
            variant={activeTab === "create" ? "default" : "outline"}
            className={
              activeTab === "create"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Proposal
          </Button>
        </div>
      </div>

      {/* Voting Power Card */}
      <div
        className="p-6 rounded-xl border"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Voting Power</h2>
          <div className="flex items-center gap-2 text-blue-400">
            <Vote className="w-5 h-5" />
            <span className="font-bold">{userVotingPower.totalPower.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{userVotingPower.stakedTokens.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Staked NEBL</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{userVotingPower.delegatedPower.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Delegated Power</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{userVotingPower.availableVotes.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Available Votes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">0.12%</p>
            <p className="text-sm text-gray-400">Total Influence</p>
          </div>
        </div>
      </div>

      {activeTab === "create" ? (
        /* Create Proposal Form */
        <div
          className="p-8 rounded-xl border"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 className="text-2xl font-bold mb-6">Create New Proposal</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Proposal Title</label>
              <Input
                placeholder="Enter proposal title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Provide a detailed description of your proposal"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[120px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Contract Address</label>
              <Input
                placeholder="0x..."
                value={formData.targetContract}
                onChange={(e) => setFormData({ ...formData, targetContract: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Function Signature</label>
              <Input
                placeholder="functionName(type1,type2)"
                value={formData.functionSignature}
                onChange={(e) => setFormData({ ...formData, functionSignature: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Parameters</label>
              <Textarea
                placeholder="Enter function parameters (comma-separated)"
                value={formData.parameters}
                onChange={(e) => setFormData({ ...formData, parameters: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 font-mono"
                rows={3}
              />
            </div>

            <div
              className="p-4 rounded-lg border"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3 className="font-medium mb-2">Proposal Requirements</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Minimum 1,000 NEBL voting power required to create proposals</li>
                <li>• Proposals have a 7-day voting period</li>
                <li>• Minimum 10% quorum required for proposal to pass</li>
                <li>• 24-hour delay before execution after passing</li>
              </ul>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium">
              Submit Proposal
            </Button>
          </div>
        </div>
      ) : (
        /* Proposals List */
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Active Proposals", value: "12", color: "text-blue-400" },
              { label: "Total Proposals", value: "89", color: "text-green-400" },
              { label: "Your Votes Cast", value: "24", color: "text-purple-400" },
              { label: "Participation Rate", value: "67%", color: "text-orange-400" },
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
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Proposals */}
          <div className="space-y-4">
            {mockProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="p-6 rounded-xl border"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full border flex items-center gap-1 ${getStatusColor(proposal.status)}`}
                      >
                        {getStatusIcon(proposal.status)}
                        {proposal.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{proposal.description}</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Target Contract:</p>
                        <p className="font-mono text-blue-400">{proposal.targetContract}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Function:</p>
                        <p className="font-mono text-green-400">{proposal.functionSignature}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Parameters:</p>
                        <p className="font-mono text-yellow-400">{proposal.parameters}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Created by:</p>
                        <p className="font-mono text-gray-300">{proposal.creator}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voting Results */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Voting Results</span>
                    <span className="text-sm text-white">{proposal.totalVotes.toLocaleString()} total votes</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">For</span>
                      </div>
                      <span className="text-sm text-white">{proposal.votesFor.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400">Against</span>
                      </div>
                      <span className="text-sm text-white">{proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Voting Actions */}
                {proposal.status === "active" && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleVote(proposal.id, true)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Vote For
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal.id, false)}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Vote Against
                    </Button>
                    <div className="flex-1 text-right">
                      <p className="text-xs text-gray-500">Ends: {new Date(proposal.endTime).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
