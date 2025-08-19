"use client"

import { useState } from "react"
import { Plus, Upload, FileText, Shield, Zap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface IPToken {
  id: string
  title: string
  description: string
  category: string
  licenseType: string
  licenseTerms: string
  price: number
  royaltyPercentage: number
  files: string[]
  creator: string
  status: "draft" | "pending" | "approved" | "rejected"
  createdAt: string
}

const licenseTypes = [
  {
    id: "commercial",
    name: "Commercial License",
    description: "Full commercial rights with unlimited usage",
    icon: "💼",
  },
  {
    id: "research",
    name: "Research License",
    description: "Academic and research use only",
    icon: "🔬",
  },
  {
    id: "open-source",
    name: "Open Source License",
    description: "Open source with attribution requirements",
    icon: "🌐",
  },
  {
    id: "exclusive",
    name: "Exclusive License",
    description: "Single buyer exclusive rights",
    icon: "👑",
  },
  {
    id: "royalty-free",
    name: "Royalty-Free License",
    description: "One-time payment, no ongoing royalties",
    icon: "🆓",
  },
]

const categories = [
  "AI/Machine Learning",
  "Biotechnology",
  "Quantum Computing",
  "Clean Energy",
  "Blockchain/Crypto",
  "Medical Devices",
  "Software/Algorithms",
  "Materials Science",
  "Robotics",
  "Nanotechnology",
]

const mockCreatedIPs: IPToken[] = [
  {
    id: "1",
    title: "Advanced Neural Network Architecture",
    description: "Revolutionary deep learning architecture for computer vision applications",
    category: "AI/Machine Learning",
    licenseType: "commercial",
    licenseTerms: "Full commercial rights with 5% royalty on revenue",
    price: 25.5,
    royaltyPercentage: 5,
    files: ["neural_network_paper.pdf", "implementation_code.zip"],
    creator: "0x1234...5678",
    status: "approved",
    createdAt: "2024-03-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Quantum Error Correction Protocol",
    description: "Novel approach to quantum error correction for stable quantum computing",
    category: "Quantum Computing",
    licenseType: "research",
    licenseTerms: "Academic use only, attribution required",
    price: 15.0,
    royaltyPercentage: 0,
    files: ["quantum_protocol.pdf", "simulation_results.zip"],
    creator: "0x1234...5678",
    status: "pending",
    createdAt: "2024-04-01T14:20:00Z",
  },
]

export function CreateIP() {
  const [activeTab, setActiveTab] = useState<"create" | "my-ips">("create")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    licenseType: "",
    customLicenseTerms: "",
    price: "",
    royaltyPercentage: "",
    enableRoyalties: false,
  })
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const selectedLicense = licenseTypes.find((license) => license.id === formData.licenseType)

  const handleSubmit = () => {
    console.log("Creating IP token:", formData)
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      licenseType: "",
      customLicenseTerms: "",
      price: "",
      royaltyPercentage: "",
      enableRoyalties: false,
    })
    setUploadedFiles([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-600/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
      case "rejected":
        return "bg-red-600/20 text-red-400 border-red-500/30"
      case "draft":
        return "bg-gray-600/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create IP Token</h1>
          <p className="text-gray-400 mt-1">Tokenize your intellectual property and license it to others</p>
        </div>
        <div className="flex gap-3">
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
            Create IP
          </Button>
          <Button
            onClick={() => setActiveTab("my-ips")}
            variant={activeTab === "my-ips" ? "default" : "outline"}
            className={
              activeTab === "my-ips"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
            }
          >
            <Eye className="w-4 h-4 mr-2" />
            My IP Tokens
          </Button>
        </div>
      </div>

      {activeTab === "create" ? (
        /* Create IP Form */
        <div
          className="p-8 rounded-xl border"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 className="text-2xl font-bold mb-6">Create New IP Token</h2>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">IP Title *</label>
                <Input
                  placeholder="Enter your IP title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                >
                  <option value="" className="bg-black">
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-black">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Textarea
                placeholder="Provide a detailed description of your intellectual property"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[120px]"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Supporting Files</label>
              <div
                className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/30 transition-colors cursor-pointer"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-2">Upload research papers, code, documentation</p>
                <p className="text-sm text-gray-500">PDF, DOC, ZIP files up to 50MB each</p>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* License Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">License Type *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {licenseTypes.map((license) => (
                  <button
                    key={license.id}
                    onClick={() => setFormData({ ...formData, licenseType: license.id })}
                    className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                      formData.licenseType === license.id
                        ? "bg-blue-600/20 border-blue-500/50 text-blue-400"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{license.icon}</span>
                      <span className="font-medium text-sm">{license.name}</span>
                    </div>
                    <p className="text-xs text-gray-400">{license.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom License Terms */}
            <div>
              <label className="block text-sm font-medium mb-2">License Terms *</label>
              <Textarea
                placeholder={
                  selectedLicense
                    ? `Define specific terms for ${selectedLicense.name}...`
                    : "Define your license terms and conditions"
                }
                value={formData.customLicenseTerms}
                onChange={(e) => setFormData({ ...formData, customLicenseTerms: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[100px]"
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Initial Price (AVAX) *</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1">
                  ≈ ${formData.price ? (Number(formData.price) * 35.42).toFixed(2) : "0.00"} USD
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="enableRoyalties"
                    checked={formData.enableRoyalties}
                    onChange={(e) => setFormData({ ...formData, enableRoyalties: e.target.checked })}
                    className="rounded border-white/10 bg-white/5"
                  />
                  <label htmlFor="enableRoyalties" className="text-sm font-medium">
                    Enable Royalties
                  </label>
                </div>
                {formData.enableRoyalties && (
                  <Input
                    type="number"
                    placeholder="5.0"
                    value={formData.royaltyPercentage}
                    onChange={(e) => setFormData({ ...formData, royaltyPercentage: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    min="0"
                    max="50"
                    step="0.1"
                  />
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {formData.enableRoyalties ? "Percentage of future revenue" : "One-time payment only"}
                </p>
              </div>
            </div>

            {/* Preview */}
            {formData.title && formData.description && (
              <div
                className="p-4 rounded-lg border"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Title:</span>
                    <span className="text-white">{formData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{formData.category || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">License:</span>
                    <span className="text-white">{selectedLicense?.name || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white">{formData.price || "0"} AVAX</span>
                  </div>
                  {formData.enableRoyalties && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Royalties:</span>
                      <span className="text-white">{formData.royaltyPercentage || "0"}%</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div
              className="p-4 rounded-lg border"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Important Information
              </h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Your IP will be reviewed before being listed on the marketplace</li>
                <li>• You retain ownership rights as specified in your license terms</li>
                <li>• A 2.5% platform fee applies to all sales</li>
                <li>• Ensure you have the legal right to license this intellectual property</li>
                <li>• False or misleading information may result in account suspension</li>
              </ul>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!formData.title || !formData.description || !formData.category || !formData.licenseType}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium disabled:opacity-50"
            >
              <Zap className="w-4 h-4 mr-2" />
              Create IP Token
            </Button>
          </div>
        </div>
      ) : (
        /* My IP Tokens */
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total IP Tokens", value: "12", color: "text-blue-400" },
              { label: "Total Revenue", value: "156.8 AVAX", color: "text-green-400" },
              { label: "Active Licenses", value: "34", color: "text-purple-400" },
              { label: "Pending Review", value: "2", color: "text-yellow-400" },
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

          {/* IP Tokens List */}
          <div className="space-y-4">
            {mockCreatedIPs.map((ip) => (
              <div
                key={ip.id}
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
                      <h3 className="text-xl font-bold text-white">{ip.title}</h3>
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                        {ip.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(ip.status)}`}>
                        {ip.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{ip.description}</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">License Type:</p>
                        <p className="text-white capitalize">{ip.licenseType.replace("-", " ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Price:</p>
                        <p className="text-green-400">{ip.price} AVAX</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Royalties:</p>
                        <p className="text-purple-400">{ip.royaltyPercentage}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">Created: {new Date(ip.createdAt).toLocaleDateString()}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-300">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-300">
                      View Analytics
                    </Button>
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
