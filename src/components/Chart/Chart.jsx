import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const HealthGraph = () => {
  const [healthData, setHealthData] = useState({});
  const [parameterRanges, setParameterRanges] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/health-data/getUser/67947f6157ad3640a7ac95d4")
      .then((response) => {
        console.log("API Response:", response.data.data); // Debug API Response

        const { healthData } = response.data.data || {};
        const range = response.data.range || []; // Access range directly here

        if (!healthData) {
          console.error("Health data not found in response.");
          return;
        }

        setHealthData(healthData);

        // Ensure `range` exists and is an array before using forEach
        if (Array.isArray(range)) {
          const ranges = {};
          range.forEach((param) => {
            ranges[param.name] = {
              safeMin: param.range.min,
              safeMax: param.range.max,
              dangerMin: param.range.min - 20, // Example buffer
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

  // Function to format data for ApexCharts
  const formatChartData = (parameter) => {
    if (!healthData[parameter] || !parameterRanges[parameter]) return null;

    const data = healthData[parameter];
    const dates = data.map((item) => item.date);
    const values = data.map((item) => parseFloat(item.value)); // Ensure values are numbers
    const ranges = parameterRanges[parameter];

    return {
      series: [{ name: parameter, data: values }],
      options: {
        chart: { type: "line", height: 350 },
        xaxis: { categories: dates, title: { text: "Date" } },
        yaxis: { 
          title: { text: parameter },
          min: ranges.dangerMin,
          max: ranges.dangerMax
        },
        stroke: { curve: "smooth" },
        markers: { size: 5 },
        annotations: {
          yaxis: [
            { y: ranges.safeMax, y2: ranges.safeMin, borderColor: "#00E396", fillColor: "rgba(0, 227, 150, 0.2)", label: { text: "Safe Zone" } },
            { y: ranges.dangerMax, y2: ranges.safeMax, borderColor: "#FF4560", fillColor: "rgba(255, 69, 96, 0.2)", label: { text: "Danger Zone (High)" } },
            { y: ranges.safeMin, y2: ranges.dangerMin, borderColor: "#FF4560", fillColor: "rgba(255, 69, 96, 0.2)", label: { text: "Danger Zone (Low)" } }
          ]
        }
      }
    };
  };

  const parameters = Object.keys(healthData);

  return (
    <div>
      <h2>Health Data Visualization</h2>
      {parameters.map((param) => {
        const chartData = formatChartData(param);
        return (
          chartData && (
            <div key={param} style={{ marginBottom: "30px" }}>
              <h3>{param}</h3>
              <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
            </div>
          )
        );
      })}
    </div>
  );
};

export default HealthGraph;
