import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
const HealthGraph = () => {
  const [healthData, setHealthData] = useState({});
  const [inputData, setInputData] = useState({});
  const [parameterRanges, setParameterRanges] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({}); // Stores updated values in required format

  const { auth } = useAuth()

  const queryClient = useQueryClient();
  const myState = queryClient.getQueryData(["user"]);

  const userId = auth.user_id;
  console.log(userId) // Hardcoded user ID

  // Fetch existing health data
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/health-data/getUser/${userId}`)
      .then((response) => {
        console.log("API Response:", response.data.data);
        const { healthData } = response.data.data || {};
        const range = response.data.range || [];

        if (!healthData) {
          console.error("Health data not found in response.");
          return;
        }

        setInputData(healthData);
        setHealthData(healthData);

        if (Array.isArray(range)) {
          const ranges = {};
          range.forEach((param) => {
            ranges[param.name] = {
              safeMin: param.range.min,
              safeMax: param.range.max,
              dangerMin: param.range.min - 20,
              dangerMax: param.range.max + 20,
            };
          });
          setParameterRanges(ranges);
        } else {
          console.warn("No range data found in API response.");
        }
      })
      .catch((error) => console.error("Error fetching health data:", error));
  }, []);

  // Handle input change and store in required format
  const handleInputChange = (param, value) => {
    if (value.trim() === "" || isNaN(value)) {
      return; // Ignore empty or non-numeric values
    }

    setFormData((prevData) => ({
      ...prevData,
      [param]: [{ value }], // Store as an array with an object { value: "new value" }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedHealthData = { healthData: formData };
  
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/health-data/update/${userId}`,
        updatedHealthData
      );
  
      console.log("Update Response:", response.data);
      alert("Health data updated successfully!");
  
      setShowForm(false);
      setFormData({});
  
      // Merge old and new values
      setHealthData((prevData) => {
        const newData = { ...prevData };
        Object.keys(formData).forEach((param) => {
          // Append new value to existing array
          newData[param] = [...(prevData[param] || []), ...formData[param]];
        });
  
        return newData;
      });
  
    } catch (error) {
      console.error("Error updating health data:", error);
      alert("Failed to update health data.");
    }
  };
  

  // Format data for ApexCharts
  const formatChartData = (parameter) => {
    if (!healthData[parameter] || !parameterRanges[parameter]) return null;

    const data = healthData[parameter];
    const dates = data.map((item, index) => `Entry ${index + 1}`); // Use index as date
    const values = data.map((item) => parseFloat(item.value));
    const ranges = parameterRanges[parameter];

    return {
      series: [{ name: parameter, data: values }],
      options: {
        chart: { type: "line", height: 350 },
        xaxis: { categories: dates, title: { text: "Entries" } },
        yaxis: {
          title: { text: parameter },
          min: ranges.dangerMin,
          max: ranges.dangerMax,
        },
        stroke: { curve: "smooth" },
        markers: { size: 5 },
        annotations: {
          yaxis: [
            {
              y: ranges.safeMax,
              y2: ranges.safeMin,
              borderColor: "#00E396",
              fillColor: "rgba(0, 227, 150, 0.2)",
              label: { text: "Safe Zone" },
            },
            {
              y: ranges.dangerMax,
              y2: ranges.safeMax,
              borderColor: "#FF4560",
              fillColor: "rgba(255, 69, 96, 0.2)",
              label: { text: "Danger Zone (High)" },
            },
            {
              y: ranges.safeMin,
              y2: ranges.dangerMin,
              borderColor: "#FF4560",
              fillColor: "rgba(255, 69, 96, 0.2)",
              label: { text: "Danger Zone (Low)" },
            },
          ],
        },
      },
    };
  };

  const parameters = Object.keys(inputData);

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Health Data Visualization</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({}); // Reset form when opening
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Update Disease Values
        </button>
      </div>

      {/* Form for updating health data */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parameters.map((param) => (
              <div key={param}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{param}</label>
                <input
                  type="number"
                  value={formData[param]?.[0]?.value || ""} // Show latest value correctly
                  onChange={(e) => handleInputChange(param, e.target.value)}
                  placeholder={`Enter value for ${param}`}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-[#2B6CB0] text-white py-2 rounded hover:bg-[#1E4D79] transition-colors"
          >
            Submit Values
          </button>
        </form>
      )}

      {/* Graphs for Health Data */}
      <h2 className="text-xl font-semibold text-gray-800 mt-6">Health Data Visualization</h2>
      {parameters.map((param) => {
        const chartData = formatChartData(param);
        return (
          chartData && (
            <div key={param} style={{ marginBottom: "30px" }}>
              <h3 className="text-lg font-semibold">{param}</h3>
              <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
            </div>
          )
        );
      })}
    </div>
  );
};

export default HealthGraph;
