"use client"

import { useState } from "react"
import { Plus, Upload, CheckCircle, Clock, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Milestone {
  id: string
  description: string
  targetAmount: number
  verificationCriteria: string
  status: "pending" | "active" | "completed"
}

interface Project {
  id: string
  title: string
  description: string
  category: string
  fundingDeadline: string
  totalFunding: number
  currentFunding: number
  milestones: Milestone[]
  creator: string
  backers: number
  status: "active" | "funded" | "completed"
  createdAt: string
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Quantum Error Correction Research",
    description: "Developing advanced quantum error correction algorithms for stable quantum computing systems",
    category: "Quantum Computing",
    fundingDeadline: "2024-06-15",
    totalFunding: 50000,
    currentFunding: 32500,
    creator: "Dr. Sarah Chen",
    backers: 127,
    status: "active",
    createdAt: "2024-03-01",
    milestones: [
      {
        id: "m1",
        description: "Literature review and theoretical framework",
        targetAmount: 15000,
        verificationCriteria: "Published research paper draft",
        status: "completed",
      },
      {
        id: "m2",
        description: "Algorithm development and simulation",
        targetAmount: 20000,
        verificationCriteria: "Working simulation with test results",
        status: "active",
      },
      {
        id: "m3",
        description: "Hardware implementation and testing",
        targetAmount: 15000,
        verificationCriteria: "Physical prototype demonstration",
        status: "pending",
      },
    ],
  },
  {
    id: "2",
    title: "AI-Powered Drug Discovery Platform",
    description: "Machine learning platform for accelerating pharmaceutical drug discovery processes",
    category: "Biotechnology",
    fundingDeadline: "2024-07-20",
    totalFunding: 75000,
    currentFunding: 18750,
    creator: "BioTech Labs",
    backers: 89,
    status: "active",
    createdAt: "2024-03-15",
    milestones: [
      {
        id: "m1",
        description: "Data collection and preprocessing pipeline",
        targetAmount: 25000,
        verificationCriteria: "Functional data pipeline with validation",
        status: "active",
      },
      {
        id: "m2",
        description: "ML model development and training",
        targetAmount: 30000,
        verificationCriteria: "Trained model with accuracy metrics",
        status: "pending",
      },
      {
        id: "m3",
        description: "Platform integration and testing",
        targetAmount: 20000,
        verificationCriteria: "Beta platform with user testing results",
        status: "pending",
      },
    ],
  },
]

export function TheHub() {
  const [activeTab, setActiveTab] = useState<"create" | "projects">("projects")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    fundingDeadline: "",
    totalFunding: "",
  })
  const [milestones, setMilestones] = useState<Omit<Milestone, "id" | "status">[]>([
    { description: "", targetAmount: 0, verificationCriteria: "" },
  ])

  const addMilestone = () => {
    setMilestones([...milestones, { description: "", targetAmount: 0, verificationCriteria: "" }])
  }

  const updateMilestone = (index: number, field: string, value: string | number) => {
    const updated = [...milestones]
    updated[index] = { ...updated[index], [field]: value }
    setMilestones(updated)
  }

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">The Hub</h1>
          <p className="text-gray-400 mt-1">Create and manage research funding projects</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setActiveTab("projects")}
            variant={activeTab === "projects" ? "default" : "outline"}
            className={
              activeTab === "projects"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
            }
          >
            View Projects
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
            Create Project
          </Button>
        </div>
      </div>

      {activeTab === "create" ? (
        /* Create Project Form */
        <div
          className="p-8 rounded-xl border"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 className="text-2xl font-bold mb-6">Create New Research Project</h2>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <Input
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                >
                  <option value="" className="bg-black">
                    Select category
                  </option>
                  <option value="AI/ML" className="bg-black">
                    AI/ML
                  </option>
                  <option value="Quantum Computing" className="bg-black">
                    Quantum Computing
                  </option>
                  <option value="Biotechnology" className="bg-black">
                    Biotechnology
                  </option>
                  <option value="Clean Energy" className="bg-black">
                    Clean Energy
                  </option>
                  <option value="Blockchain" className="bg-black">
                    Blockchain
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Describe your research project in detail"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Funding Deadline</label>
                <Input
                  type="date"
                  value={formData.fundingDeadline}
                  onChange={(e) => setFormData({ ...formData, fundingDeadline: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Total Funding Goal (AVAX)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.totalFunding}
                  onChange={(e) => setFormData({ ...formData, totalFunding: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Project Files</label>
              <div
                className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/30 transition-colors cursor-pointer"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PDF, DOC, or ZIP files up to 10MB</p>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium">Project Milestones</label>
                <Button
                  onClick={addMilestone}
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10 text-gray-300 hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Milestone
                </Button>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Milestone {index + 1}</h4>
                      {milestones.length > 1 && (
                        <Button
                          onClick={() => removeMilestone(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Description</label>
                        <Input
                          placeholder="Milestone description"
                          value={milestone.description}
                          onChange={(e) => updateMilestone(index, "description", e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Target Amount (AVAX)</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={milestone.targetAmount || ""}
                          onChange={(e) =>
                            updateMilestone(index, "targetAmount", Number.parseFloat(e.target.value) || 0)
                          }
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-400">Verification Criteria</label>
                      <Textarea
                        placeholder="How will this milestone be verified?"
                        value={milestone.verificationCriteria}
                        onChange={(e) => updateMilestone(index, "verificationCriteria", e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium">
              Create Project
            </Button>
          </div>
        </div>
      ) : (
        /* Projects List */
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Active Projects", value: "24", icon: Clock, color: "text-blue-400" },
              { label: "Total Funding", value: "1,247 AVAX", icon: DollarSign, color: "text-green-400" },
              { label: "Total Backers", value: "3,421", icon: Users, color: "text-purple-400" },
              { label: "Completed", value: "18", icon: CheckCircle, color: "text-orange-400" },
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
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-xl border"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                        {project.category}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          project.status === "active"
                            ? "bg-green-600/20 text-green-400 border border-green-500/30"
                            : project.status === "funded"
                              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                              : "bg-gray-600/20 text-gray-400 border border-gray-500/30"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{project.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span>By {project.creator}</span>
                      <span>{project.backers} backers</span>
                      <span>Deadline: {new Date(project.fundingDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Funding Progress</span>
                    <span className="text-sm text-white">
                      {project.currentFunding.toLocaleString()} / {project.totalFunding.toLocaleString()} AVAX
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(project.currentFunding / project.totalFunding) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((project.currentFunding / project.totalFunding) * 100)}% funded
                  </p>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="font-medium mb-3">Milestones</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {project.milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="p-3 rounded-lg border"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          borderColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              milestone.status === "completed"
                                ? "bg-green-500"
                                : milestone.status === "active"
                                  ? "bg-blue-500"
                                  : "bg-gray-500"
                            }`}
                          ></div>
                          <span className="text-sm font-medium">Milestone {index + 1}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{milestone.description}</p>
                        <p className="text-xs text-blue-400">{milestone.targetAmount} AVAX</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
