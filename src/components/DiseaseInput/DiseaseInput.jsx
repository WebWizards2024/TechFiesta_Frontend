import { useState } from "react";
import { PlusCircle, X } from "lucide-react";

export default function DiseaseInput() {
  const [disease, setDisease] = useState("");
  const [healthData, setHealthData] = useState({});
  const [symptoms, setSymptoms] = useState("");
  const [medications, setMedications] = useState([{ name: "", dosage: "", frequency: "" }]);

  const diseaseParameters = {
    Diabetes: ["Blood Sugar", "HbA1c", "Blood Pressure"],
    Hypertension: ["Systolic BP", "Diastolic BP", "Heart Rate"],
    Asthma: ["Peak Flow", "FEV1", "Inhaler Usage"],
    COPD: ["FEV1", "Oxygen Saturation", "Dyspnea Scale"],
  };

  const handleInputChange = (param, value) => {
    if (value.trim() === "" || isNaN(value)) {
      return; // Don't update if value is empty or non-numeric
    }
    
    setHealthData((prevData) => ({
      ...prevData,
      [param]: [...(prevData[param] || []), { date: new Date().toISOString(), value }]
    }));
  };
  

  const handleMedicationChange = (index, field, value) => {
    setMedications((prevMeds) => {
      const updatedMeds = [...prevMeds];
      updatedMeds[index] = { ...updatedMeds[index], [field]: value };
      return updatedMeds;
    });
  };

  const addMedication = () => {
    setMedications((prevMeds) => [...prevMeds, { name: "", dosage: "", frequency: "" }]);
  };

  const removeMedication = (index) => {
    setMedications((prevMeds) => prevMeds.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you get patientId from user authentication
    const patientId = "67947f6157ad3640a7ac95d4";

    const formData = { disease, healthData, symptoms, medications, patientId };

    try {
      const response = await fetch("http://localhost:8000/api/v1/health-data/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Health data submitted successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit health data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">Health Data Input</h2>

        {/* Disease Selection */}
        <div className="space-y-2">
          <label htmlFor="disease" className="block text-sm font-medium text-gray-700">
            Select Disease:
          </label>
          <select
            id="disease"
            value={disease}
            onChange={(e) => {
              setDisease(e.target.value);
              setHealthData({}); // Reset healthData when disease changes
            }}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          >
            <option value="">-- Select --</option>
            {Object.keys(diseaseParameters).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamically Render Health Parameters */}
        {disease && diseaseParameters[disease].length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Health Parameters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {diseaseParameters[disease].map((param) => (
                <div key={param} className="space-y-1">
                  <label htmlFor={param} className="block text-sm font-medium text-gray-700">
                    {param}:
                  </label>
                  <input
                    type="number"
                    id={param}
                    placeholder={`Enter ${param}`}
                    onChange={(e) => handleInputChange(param, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Symptoms Input */}
        {/* <div className="space-y-2">
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
            Symptoms:
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter symptoms (comma separated)"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 h-24"
          />
        </div> */}

        {/* Medication Inputs
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Medications</h3>
          {medications.map((med, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 items-center bg-gray-50 p-4 rounded-lg">
              <input
                type="text"
                placeholder="Medication Name"
                value={med.name}
                onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Dosage"
                value={med.dosage}
                onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Frequency"
                value={med.frequency}
                onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
                className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
              <button
                type="button"
                onClick={() => removeMedication(index)}
                className="w-full sm:w-auto mt-2 sm:mt-0 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                <X size={20} className="mx-auto" />
              </button>
            </div>
          ))}
          <button type="button" onClick={addMedication} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
            <PlusCircle size={20} className="mr-2" />
            Add Medication
          </button>
        </div> */}

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-200">
          Submit Health Data
        </button>
      </form>
    </div>
  );
}
