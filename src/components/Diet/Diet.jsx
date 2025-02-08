import { useState, useEffect } from "react";
import { Coffee, UtensilsCrossed, Cookie, Sparkles, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function DietPlan() {
  const [disease, setDisease] = useState(() => {
    return localStorage.getItem("disease") || "diabetes";
  });
  const [dietData, setDietData] = useState(() => {
    const storedDiet = localStorage.getItem("dietData");
    return storedDiet ? JSON.parse(storedDiet) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (dietData) {
      localStorage.setItem("dietData", JSON.stringify(dietData));
    }
  }, [dietData]);

  const fetchDietPlan = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/diet/get-die", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disease }),
      });

      const result = await response.json();

      if (result.success) {
        setDietData(result.data.dietPlan);
        localStorage.setItem("dietData", JSON.stringify(result.data.dietPlan));
        localStorage.setItem("disease", disease);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-[#4285f4] mb-6 relative inline-block">
          Personalized Diet Plan
          <motion.span
            className="absolute -right-8 -top-4"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.span>
        </h1>

        <div className="flex gap-4 justify-center mb-8">
          <div className="relative">
            <input
              type="text"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              placeholder="Enter disease name"
              className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285f4] transition-all duration-300 hover:shadow-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={fetchDietPlan}
            className="px-6 py-2 bg-[#4285f4] text-white rounded-md hover:bg-[#3367d6] transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 group"
          >
            Get Diet Plan
            <Check className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </motion.div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-48" />
          ))}
        </div>
      ) : dietData && Object.keys(dietData).length > 0 ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {Object.entries(dietData).map(([condition, meals]) => (
            <div key={condition}>
              <h3 className="text-2xl font-bold text-blue-600">{condition}</h3>
              {Object.entries(meals).map(([meal, details], index) => (
                <motion.div
                  key={meal}
                  className="rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="bg-[#4285f4] text-white p-4 flex items-center gap-2">
                    {meal === "Breakfast" ? <Coffee className="w-6 h-6" /> :
                      meal === "Lunch" ? <UtensilsCrossed className="w-6 h-6" /> :
                        <Cookie className="w-6 h-6" />}
                    <h2 className="text-xl font-semibold">{meal}</h2>
                  </div>
                  <div className="bg-white p-6 shadow-md rounded-b-lg grid grid-cols-2 gap-6 group">
                    <div className="transform transition-all duration-300 group-hover:scale-105">
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        Foods
                        <span className="w-2 h-2 bg-[#4285f4] rounded-full animate-pulse" />
                      </h3>
                      <p className="text-gray-600">{details.Foods?.join(", ") || "N/A"}</p>
                    </div>
                    <div className="transform transition-all duration-300 group-hover:scale-105">
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        Nutritional Benefits
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      </h3>
                      <p className="text-gray-600">{details.NutritionalBenefits || "No details available"}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      ) : (
        !isLoading && <p className="text-gray-500 text-center">No diet plan available.</p>
      )}
    </div>
  );
}
