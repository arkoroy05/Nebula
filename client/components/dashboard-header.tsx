import { Search, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects, IP..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <ChevronLeft className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Today, Apr 8</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="text-white">Hossein</div>
              <div className="text-gray-400">@user680523</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
