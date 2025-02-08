import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const HealthGraph = () => {
  const [healthData, setHealthData] = useState({});
  const [inputData, setInputData] = useState({});
  const [parameterRanges, setParameterRanges] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const { setAuth } = useAuth()

  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const userId = auth.user_id;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/health-data/getUser/${userId}`)
      .then((response) => {
        // console.log("API Response:", response.data.data.disease);
        const disease = response.data.data.disease;
        setAuth((prevAuth) => ({
          ...prevAuth,
          disease,
        }));
        

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

  const handleInputChange = (param, value) => {
    if (value.trim() === "" || isNaN(value)) return;

    setFormData((prevData) => ({
      ...prevData,
      [param]: [{ value }],
    }));
  };

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

      setHealthData((prevData) => {
        const newData = { ...prevData };
        Object.keys(formData).forEach((param) => {
          newData[param] = [...(prevData[param] || []), ...formData[param]];
        });

        return newData;
      });
    } catch (error) {
      console.error("Error updating health data:", error);
      alert("Failed to update health data.");
    }
  };

  const formatChartData = (parameter) => {
    if (!healthData[parameter] || !parameterRanges[parameter]) return null;

    const data = healthData[parameter];

    const dates = data.map((item) =>
      item.date ? new Date(item.date).toLocaleDateString("en-GB") : "Unknown Date"
    );

    const values = data.map((item) => parseFloat(item.value));
    const ranges = parameterRanges[parameter];

    return {
      series: [{ name: parameter, data: values }],
      options: {
        chart: { type: "line", height: 350 },
        xaxis: {
          categories: dates,
          title: { text: "Date" },
          labels: { rotate: -45 },
        },
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
              fillColor: "rgba(22, 255, 149, 0.8)",
            },
            {
              y: ranges.dangerMax,
              y2: ranges.safeMax,
              borderColor: "#FF4560",
              fillColor: "rgba(255, 0, 0, 1)",
            },
            {
              y: ranges.safeMin,
              y2: ranges.dangerMin,
              borderColor: "#FF4560",
              fillColor: "rgba(255, 0, 0, 1)",
            },
          ],
        },
      },
    };
  };

  const parameters = Object.keys(inputData);

  return (
    <div className="bg-white p-10">
      {/* <div className="flex justify-between items-center mb-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Health Data Visualization</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({});
          }}
          className="px-4 py-2 bg-[#4082ca] text-white rounded hover:bg-[#2b6cb0] hover:cursor-pointer transition-colors"
        >
          Add Values
        </button>
      </div> */}

      {/* {showForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parameters.map((param) => (
              <div key={param}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{param}</label>
                <input
                  type="number"
                  value={formData[param]?.[0]?.value || ""}
                  onChange={(e) => handleInputChange(param, e.target.value)}
                  placeholder={`Enter value for ${param}`}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-[#2B6CB0] text-white py-2 rounded hover:bg-[#1E4D79] transition-colors"
          >
            Submit Values
          </button>
        </form>
      )} */}

      {/* Dynamically generate MetricCard components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {parameters.map((param, index) => {
          const data = healthData[param];
          if (!data || data.length === 0) return null; // Skip if no data

          const latestValue = data[data.length - 1]?.value || "N/A";
          return (
            <MetricCard
              key={param}
              icon={<span className="text-blue-500">🫀</span>} // You can customize this based on the parameter
              label={param}
              value={latestValue}
              subtext="Latest recorded value"
              delay={index * 0.1}
            />
          );
        })}
      </div>

      {parameters.map((param) => {
        const chartData = formatChartData(param);
        return (
          chartData && (
            <div key={param} className="bg-white shadow-md p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold">{param}</h3>
              <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
            </div>
          )
        );
      })}
    </div>
  );
};

const MetricCard = ({ icon, label, value, subtext, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="metric-card"
  >
    <div className="flex items-center gap-4 rounded-xl p-2 shadow-md">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtext}</p>
      </div>
    </div>
  </motion.div>
);

export default HealthGraph;
