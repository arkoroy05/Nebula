import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const projects = [
  {
    rank: 1,
    name: "Quantum Research",
    admin: "Dr. Chen",
    date: "03/15/2024",
    category: "Quantum Computing",
    status: "Funding",
    action: "Back",
  },
  {
    rank: 2,
    name: "AI Patent #347",
    admin: "Sarah Kim",
    date: "01/22/2024",
    category: "Artificial Intelligence",
    status: "Active",
    action: "View",
  },
  {
    rank: 3,
    name: "BioTech Innovation",
    admin: "Prof. Martinez",
    date: "02/08/2024",
    category: "Biotechnology",
    status: "Private",
    action: "Request",
  },
  {
    rank: 4,
    name: "Clean Energy IP",
    admin: "Tesla Labs",
    date: "12/05/2023",
    category: "Energy",
    status: "Completed",
    action: "Trade",
  },
]

export function ActiveProjects() {
  return (
    <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Active Projects</h3>
          <select className="bg-white/5 backdrop-blur-lg border border-white/10 rounded px-2 py-1 text-sm">
            <option>as List</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-white/5">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Project Name</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Backers</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.rank} className="border-b border-white/5 hover:bg-white/2">
                  <td className="py-4">#{project.rank}</td>
                  <td className="py-4 font-medium">{project.name}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={`/abstract-geometric-shapes.png?height=24&width=24&query=${project.admin}`} />
                        <AvatarFallback className="text-xs">{project.admin[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{project.admin}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-400">{project.date}</td>
                  <td className="py-4 text-sm">{project.category}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-1">
                      <div className="flex -space-x-1">
                        {[1, 2, 3].map((i) => (
                          <Avatar key={i} className="w-5 h-5 border border-gray-800">
                            <AvatarImage src={`/backer-plus.png?height=20&width=20&query=backer+${i}`} />
                            <AvatarFallback className="text-xs">B{i}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">99+</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        project.status === "Active"
                          ? "bg-green-900 text-green-300"
                          : project.status === "Funding"
                            ? "bg-blue-900 text-blue-300"
                            : project.status === "Private"
                              ? "bg-gray-700 text-gray-300"
                              : "bg-purple-900 text-purple-300"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <Button
                      size="sm"
                      variant={project.action === "Request" ? "outline" : "default"}
                      className="text-xs"
                    >
                      {project.action}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
