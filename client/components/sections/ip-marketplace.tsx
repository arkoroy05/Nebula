"use client"

import { useState } from "react"
import { Search, ShoppingCart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface IPToken {
  id: string
  title: string
  description: string
  price: number
  category: string
  creator: string
  rating: number
  views: number
  image: string
  license: string
}

const mockIPTokens: IPToken[] = [
  {
    id: "1",
    title: "Advanced AI Algorithm",
    description: "Revolutionary machine learning algorithm for predictive analytics",
    price: 15.5,
    category: "AI/ML",
    creator: "Dr. Sarah Chen",
    rating: 4.8,
    views: 1250,
    image: "/ai-algorithm-visualization.png",
    license: "Commercial Use",
  },
  {
    id: "2",
    title: "Quantum Computing Protocol",
    description: "Novel quantum error correction protocol for stable quantum computing",
    price: 28.3,
    category: "Quantum",
    creator: "Prof. Michael Torres",
    rating: 4.9,
    views: 890,
    image: "/placeholder-n2qyu.png",
    license: "Research & Commercial",
  },
  {
    id: "3",
    title: "Biotech Gene Therapy",
    description: "Innovative gene therapy approach for treating rare genetic disorders",
    price: 42.1,
    category: "Biotech",
    creator: "Dr. Emily Watson",
    rating: 4.7,
    views: 2100,
    image: "/placeholder-ampxs.png",
    license: "Medical License",
  },
  {
    id: "4",
    title: "Clean Energy Storage",
    description: "Next-generation battery technology for renewable energy storage",
    price: 19.8,
    category: "Energy",
    creator: "Green Tech Labs",
    rating: 4.6,
    views: 1680,
    image: "/battery-energy-storage.png",
    license: "Commercial Use",
  },
  {
    id: "5",
    title: "Blockchain Security Protocol",
    description: "Advanced cryptographic protocol for enhanced blockchain security",
    price: 12.7,
    category: "Blockchain",
    creator: "CryptoSec Team",
    rating: 4.5,
    views: 950,
    image: "/blockchain-security-cryptography.png",
    license: "Open Source",
  },
  {
    id: "6",
    title: "Neural Interface Design",
    description: "Brain-computer interface technology for medical applications",
    price: 35.2,
    category: "Neurotechnology",
    creator: "NeuroLink Research",
    rating: 4.8,
    views: 1420,
    image: "/brain-computer-interface-neural.png",
    license: "Medical License",
  },
]

export function IPMarketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const categories = ["All", "AI/ML", "Quantum", "Biotech", "Energy", "Blockchain", "Neurotechnology"]

  const filteredTokens = mockIPTokens.filter((token) => {
    const matchesSearch =
      token.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || token.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">IP Marketplace</h1>
          <p className="text-gray-400 mt-1">Discover and purchase intellectual property tokens</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Available IP Tokens</p>
          <p className="text-2xl font-bold text-blue-400">{filteredTokens.length}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div
        className="p-6 rounded-xl border"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search IP tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-black">
                  {category}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
            >
              <option value="newest" className="bg-black">
                Newest
              </option>
              <option value="price-low" className="bg-black">
                Price: Low to High
              </option>
              <option value="price-high" className="bg-black">
                Price: High to Low
              </option>
              <option value="rating" className="bg-black">
                Highest Rated
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* IP Tokens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.map((token) => (
          <div
            key={token.id}
            className="group rounded-xl border overflow-hidden hover:scale-[1.02] transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={token.image || "/placeholder.svg"}
                alt={token.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-blue-600/80 backdrop-blur-sm text-xs rounded-full text-white">
                  {token.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                <Eye className="w-3 h-3" />
                {token.views}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                  {token.title}
                </h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{token.rating}</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{token.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500">Created by</p>
                  <p className="text-sm text-white">{token.creator}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">License</p>
                  <p className="text-sm text-blue-400">{token.license}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{token.price} AVAX</p>
                  <p className="text-xs text-gray-500">≈ ${(token.price * 35).toFixed(2)} USD</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200">
                  <ShoppingCart className="w-4 h-4" />
                  Purchase
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div
        className="p-6 rounded-xl border"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-400">1,247</p>
            <p className="text-sm text-gray-400">Total IP Tokens</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">892</p>
            <p className="text-sm text-gray-400">Active Licenses</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">156.8K</p>
            <p className="text-sm text-gray-400">Total Volume (AVAX)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-400">3,421</p>
            <p className="text-sm text-gray-400">Active Traders</p>
          </div>
        </div>
      </div>
    </div>
  )
}
