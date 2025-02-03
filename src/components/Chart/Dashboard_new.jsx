import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Initial data for the graph
const initialData = [
  { date: "2025-02-02T11:53:32.001Z", value: 380 },
  { date: "2025-02-02T11:53:32.079Z", value: 400 },
  { date: "2025-02-02T11:53:32.176Z", value: 680 },
  { date: "2025-02-02T11:54:17.184Z", value: 670 },
  { date: "2025-02-02T11:54:20.068Z", value: 675 },
  { date: "2025-02-02T11:55:16.669Z", value: 500 },
]

export default function HealthGraph() {
  const [data, setData] = useState(initialData)
  const [showForm, setShowForm] = useState(false)
  const [healthData, setHealthData] = useState({
    bloodPressure: "",
    bloodSugar: "",
    peakFlow: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDataPoint = {
      date: new Date().toISOString(),
      value: Number.parseInt(healthData.peakFlow) || 0,
    }
    setData([...data, newDataPoint])
    setShowForm(false)
    setHealthData({ bloodPressure: "", bloodSugar: "", peakFlow: "" })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
     
   
      
    </div>
  )
}