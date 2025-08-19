import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const data = [
  { date: "Mar 8", value: 42000 },
  { date: "Mar 12", value: 43500 },
  { date: "Mar 16", value: 41800 },
  { date: "Mar 20", value: 44200 },
  { date: "Mar 24", value: 46100 },
  { date: "Mar 29", value: 45231 },
  { date: "Apr 2", value: 46800 },
  { date: "Apr 8", value: 47832 },
]

export function AnalyticsOverview() {
  return (
    <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Overview</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">24h</button>
            <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">Week</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">Month</button>
          </div>
        </div>

        <div className="h-64 mb-4 bg-gradient-to-br from-black/80 to-[#1a1a2e]/80 rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis hide />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-green-400">+15.67%</div>
            <div className="text-sm text-gray-400">Last updated: Today, 08:42 AM</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Mar 29</div>
            <div className="text-sm">$45,231.87</div>
            <div className="text-sm text-green-400">+8.2%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
