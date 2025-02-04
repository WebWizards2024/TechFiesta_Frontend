import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { AlertTriangle } from "lucide-react"
import Chart from '../Chart/Chart'


const bloodPressureData = [
  { date: "1/1/2024", systolic: 120, diastolic: 80 },
  { date: "1/2/2024", systolic: 115, diastolic: 78 },
  { date: "1/3/2024", systolic: 129, diastolic: 82 },
  { date: "1/4/2024", systolic: 125, diastolic: 79 },
]

const bloodSugarData = [
  { date: "1/1/2024", sugar: 95 },
  { date: "1/2/2024", sugar: 98 },
  { date: "1/3/2024", sugar: 92 },
  { date: "1/4/2024", sugar: 105 },
]

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("7days")

  return (
    <div className="h-screen  overflow-auto bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeFilter("7days")}
            className={`px-4 py-2 rounded-full text-sm ${
              timeFilter === "7days" ? "bg-[#2E66E5] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Last 7 days
          </button>
          <button
            onClick={() => setTimeFilter("30days")}
            className={`px-4 py-2 rounded-full text-sm ${
              timeFilter === "30days" ? "bg-[#2E66E5] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Last 30 days
          </button>
          <button
            onClick={() => setTimeFilter("90days")}
            className={`px-4 py-2 rounded-full text-sm ${
              timeFilter === "90days" ? "bg-[#2E66E5] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Last 90 days
          </button>
        </div>
      </div>

      <div className="space-y-6 bg-white">
       
        <Chart/>
      </div>
    </div>
  )
}

export default Dashboard