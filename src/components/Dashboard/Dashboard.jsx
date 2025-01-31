import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { AlertTriangle } from "lucide-react"

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
    <div className="h-screen  overflow-auto bg-gray-50 p-6">
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

      <div className="space-y-6">
        {/* Blood Pressure Card */}
        <div className="bg-white rounded-lg border border-[#2E66E5] p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Blood Pressure</h2>
              <p className="text-sm text-gray-500">Normal range: 90-120 mmHg</p>
            </div>
            <AlertTriangle className="text-red-500 w-6 h-6" />
          </div>

          {/* Blood Pressure Chart */}
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodPressureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 140]} ticks={[0, 35, 70, 105, 140]} />
                <Tooltip />
                <Line type="monotone" dataKey="systolic" stroke="#2E66E5" dot={{ fill: "#2E66E5" }} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#4ADE80" dot={{ fill: "#4ADE80" }} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-600 text-sm">
              High blood pressure detected. Consider lifestyle changes and consult your doctor.
            </p>
          </div>

          {/* Precautions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Precautions:</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#2E66E5] mr-2"></div>
                Monitor salt intake
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#2E66E5] mr-2"></div>
                Regular exercise
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#2E66E5] mr-2"></div>
                Stress management
              </li>
            </ul>
          </div>
        </div>

        {/* Blood Sugar Card */}
        <div className="bg-white rounded-lg border border-[#2E66E5] p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Blood Sugar</h2>
              <p className="text-sm text-gray-500">Normal range: 70-100 mg/dL</p>
            </div>
            <AlertTriangle className="text-red-500 w-6 h-6" />
          </div>

          {/* Blood Sugar Chart */}
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodSugarData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 120]} ticks={[0, 30, 60, 90, 120]} />
                <Tooltip />
                <Line type="monotone" dataKey="sugar" stroke="#EF4444" dot={{ fill: "#EF4444" }} name="Blood Sugar" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-600 text-sm">Blood sugar levels are above normal range.</p>
          </div>

          {/* Precautions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Precautions:</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#2E66E5] mr-2"></div>
                Monitor carbohydrate intake
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#2E66E5] mr-2"></div>
                Regular meals
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#2E66E5] mr-2"></div>
                Stay hydrated
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard