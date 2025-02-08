import { useState, useEffect } from "react";
import {
  Dumbbell,
  HeartPulse,
  Timer,
  Shield,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ExercisePlan() {
  const [disease, setDisease] = useState(
    () => localStorage.getItem("disease") || "hypertension"
  );
  const [exerciseData, setExerciseData] = useState(() => {
    const storedExercise = localStorage.getItem("exerciseData");
    return storedExercise ? JSON.parse(storedExercise) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (exerciseData) {
      localStorage.setItem("exerciseData", JSON.stringify(exerciseData));
    }
  }, [exerciseData]);

  const fetchExercisePlan = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/exercise/get-exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disease }),
      });

      const result = await response.json();

      if (result.success) {
        const plan = result.data.exercisePlan;
        setExerciseData(plan);
        localStorage.setItem("exerciseData", JSON.stringify(plan));
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

  console.log("Exercise Data:", exerciseData); // Debugging

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-blue-500 mb-6 relative inline-block">
          Personalized Exercise Plan
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
              className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={fetchExercisePlan}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 group"
          >
            Get Exercise Plan
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
      ) : exerciseData ? (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-blue-500 text-white p-4 rounded-lg flex items-center gap-2">
            <HeartPulse className="w-6 h-6" />
            <h2 className="text-xl font-semibold">{exerciseData.title}</h2>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Benefits</h3>
            <p className="text-gray-700">{exerciseData.benefits}</p>
          </div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {exerciseData.exercises.map((exercise, index) => (
              <motion.div
                key={exercise.name}
                className="rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-blue-500 text-white p-4 flex items-center gap-2">
                  <Dumbbell className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">{exercise.name}</h2>
                </div>
                <div className="bg-white p-6 shadow-md rounded-b-lg grid grid-cols-2 gap-6 group">
                  <div className="transform transition-all duration-300 group-hover:scale-105">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      Duration
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    </h3>
                    <p className="text-gray-600">{exercise.duration}</p>
                  </div>
                  <div className="transform transition-all duration-300 group-hover:scale-105">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      Instructions
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    </h3>
                    <p className="text-gray-600">{exercise.instructions}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Precautions <Shield className="w-5 h-5 text-red-500" />
            </h3>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
              {Array.isArray(exerciseData.precautions) ? (
                exerciseData.precautions.map((precaution, index) => (
                  <li key={index} className="text-gray-600">
                    {precaution}
                  </li>
                ))
              ) : (
                <li className="text-gray-600">
                  No specific precautions available.
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      ) : (
        !isLoading && (
          <p className="text-gray-500 text-center">
            No exercise plan available.
          </p>
        )
      )}
    </div>
  );
}
