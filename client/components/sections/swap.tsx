"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, Settings, RefreshCw, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Token {
  symbol: string
  name: string
  balance: number
  price: number
  icon: string
}

interface SwapTransaction {
  id: string
  fromToken: string
  toToken: string
  fromAmount: number
  toAmount: number
  rate: number
  timestamp: string
  status: "pending" | "completed" | "failed"
  txHash: string
}

const tokens: Token[] = [
  {
    symbol: "AVAX",
    name: "Avalanche",
    balance: 125.5,
    price: 35.42,
    icon: "🔺",
  },
  {
    symbol: "NEBL",
    name: "Nebula Token",
    balance: 15420.0,
    price: 0.85,
    icon: "🌌",
  },
]

const mockTransactions: SwapTransaction[] = [
  {
    id: "1",
    fromToken: "AVAX",
    toToken: "NEBL",
    fromAmount: 10.0,
    toAmount: 416.47,
    rate: 41.647,
    timestamp: "2024-04-08T14:30:00Z",
    status: "completed",
    txHash: "0x1234...5678",
  },
  {
    id: "2",
    fromToken: "NEBL",
    toToken: "AVAX",
    fromAmount: 1000.0,
    toAmount: 24.12,
    rate: 0.02412,
    timestamp: "2024-04-07T09:15:00Z",
    status: "completed",
    txHash: "0x9876...4321",
  },
  {
    id: "3",
    fromToken: "AVAX",
    toToken: "NEBL",
    fromAmount: 5.0,
    toAmount: 208.33,
    rate: 41.666,
    timestamp: "2024-04-06T16:45:00Z",
    status: "pending",
    txHash: "0x5555...7777",
  },
]

export function Swap() {
  const [fromToken, setFromToken] = useState<Token>(tokens[0])
  const [toToken, setToToken] = useState<Token>(tokens[1])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState(0.5)
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock exchange rate (in real app, this would come from an API)
  const exchangeRate = fromToken.symbol === "AVAX" ? 41.647 : 0.02412

  // Calculate amounts based on exchange rate
  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      const calculated = (Number(fromAmount) * exchangeRate).toFixed(6)
      setToAmount(calculated)
    } else if (toAmount && !isNaN(Number(toAmount))) {
      const calculated = (Number(toAmount) / exchangeRate).toFixed(6)
      setFromAmount(calculated)
    }
  }, [fromAmount, toAmount, exchangeRate])

  const handleSwapTokens = () => {
    const tempToken = fromToken
    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount("")
    setToAmount("")
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    if (value && !isNaN(Number(value))) {
      const calculated = (Number(value) * exchangeRate).toFixed(6)
      setToAmount(calculated)
    } else {
      setToAmount("")
    }
  }

  const handleToAmountChange = (value: string) => {
    setToAmount(value)
    if (value && !isNaN(Number(value))) {
      const calculated = (Number(value) / exchangeRate).toFixed(6)
      setFromAmount(calculated)
    } else {
      setFromAmount("")
    }
  }

  const handleSwap = async () => {
    setIsLoading(true)
    // Simulate swap transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setFromAmount("")
    setToAmount("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "pending":
        return "text-yellow-400"
      case "failed":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "failed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const canSwap = fromAmount && Number(fromAmount) > 0 && Number(fromAmount) <= fromToken.balance

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Token Swap</h1>
          <p className="text-gray-400 mt-1">Exchange AVAX and NEBL tokens instantly</p>
        </div>
        <Button
          onClick={() => setShowSettings(!showSettings)}
          variant="outline"
          className="bg-white/5 border-white/10 text-gray-300 hover:text-white"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Swap Interface */}
        <div className="lg:col-span-2">
          <div
            className="p-6 rounded-xl border"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="space-y-4">
              {/* From Token */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">From</label>
                  <span className="text-sm text-gray-400">
                    Balance: {fromToken.balance.toLocaleString()} {fromToken.symbol}
                  </span>
                </div>
                <div
                  className="p-4 rounded-lg border"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                        {fromToken.icon}
                      </div>
                      <div>
                        <p className="font-medium">{fromToken.symbol}</p>
                        <p className="text-sm text-gray-400">{fromToken.name}</p>
                      </div>
                    </div>
                    <div className="text-right flex-1 ml-4">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={fromAmount}
                        onChange={(e) => handleFromAmountChange(e.target.value)}
                        className="bg-transparent border-none text-right text-xl font-bold p-0 h-auto focus:ring-0"
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        ≈ ${fromAmount ? (Number(fromAmount) * fromToken.price).toFixed(2) : "0.00"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      onClick={() => handleFromAmountChange(fromToken.balance.toString())}
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                    >
                      Max
                    </Button>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleSwapTokens}
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10 text-gray-300 hover:text-white rounded-full p-2"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>

              {/* To Token */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">To</label>
                  <span className="text-sm text-gray-400">
                    Balance: {toToken.balance.toLocaleString()} {toToken.symbol}
                  </span>
                </div>
                <div
                  className="p-4 rounded-lg border"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                        {toToken.icon}
                      </div>
                      <div>
                        <p className="font-medium">{toToken.symbol}</p>
                        <p className="text-sm text-gray-400">{toToken.name}</p>
                      </div>
                    </div>
                    <div className="text-right flex-1 ml-4">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={toAmount}
                        onChange={(e) => handleToAmountChange(e.target.value)}
                        className="bg-transparent border-none text-right text-xl font-bold p-0 h-auto focus:ring-0"
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        ≈ ${toAmount ? (Number(toAmount) * toToken.price).toFixed(2) : "0.00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exchange Rate */}
              {fromAmount && toAmount && (
                <div
                  className="p-3 rounded-lg border"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Exchange Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">
                        1 {fromToken.symbol} = {exchangeRate.toFixed(6)} {toToken.symbol}
                      </span>
                      <RefreshCw className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-400">Slippage Tolerance</span>
                    <span className="text-white">{slippage}%</span>
                  </div>
                </div>
              )}

              {/* Swap Button */}
              <Button
                onClick={handleSwap}
                disabled={!canSwap || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Swapping...
                  </div>
                ) : !fromAmount ? (
                  "Enter Amount"
                ) : Number(fromAmount) > fromToken.balance ? (
                  "Insufficient Balance"
                ) : (
                  `Swap ${fromToken.symbol} for ${toToken.symbol}`
                )}
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div
              className="mt-4 p-4 rounded-xl border"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3 className="font-medium mb-3">Swap Settings</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Slippage Tolerance</label>
                <div className="flex gap-2">
                  {[0.1, 0.5, 1.0, 3.0].map((value) => (
                    <Button
                      key={value}
                      onClick={() => setSlippage(value)}
                      variant={slippage === value ? "default" : "outline"}
                      size="sm"
                      className={
                        slippage === value
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
                      }
                    >
                      {value}%
                    </Button>
                  ))}
                  <Input
                    type="number"
                    placeholder="Custom"
                    value={slippage}
                    onChange={(e) => setSlippage(Number(e.target.value))}
                    className="w-20 bg-white/5 border-white/10 text-white text-center"
                    step="0.1"
                    min="0.1"
                    max="50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div>
          <div
            className="p-6 rounded-xl border"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3 className="font-bold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {mockTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-lg border"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {tx.fromToken} → {tx.toToken}
                      </span>
                      <div className={`flex items-center gap-1 ${getStatusColor(tx.status)}`}>
                        {getStatusIcon(tx.status)}
                        <span className="text-xs capitalize">{tx.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>
                      {tx.fromAmount} {tx.fromToken} → {tx.toAmount.toFixed(2)} {tx.toToken}
                    </p>
                    <p className="text-xs mt-1">{new Date(tx.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Stats */}
          <div
            className="mt-4 p-6 rounded-xl border"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3 className="font-bold mb-4">Market Stats</h3>
            <div className="space-y-3">
              {tokens.map((token) => (
                <div key={token.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                      {token.icon}
                    </div>
                    <span className="font-medium">{token.symbol}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${token.price.toFixed(2)}</p>
                    <p className="text-xs text-green-400">+2.4%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
