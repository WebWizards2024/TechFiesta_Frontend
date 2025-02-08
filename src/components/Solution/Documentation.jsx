import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Download, Search, WormIcon as Virus, Heart, Shield, ChevronRight, ChevronDown } from "lucide-react";

export default function DiseaseDocs() {
  const [disease, setDisease] = useState(() => {
    return localStorage.getItem("disease") || "hypertension";
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedRemedy, setExpandedRemedy] = useState(null);
  const [article, setArticle] = useState(() => {
    const storedArticle = localStorage.getItem("diseaseArticle");
    return storedArticle
      ? JSON.parse(storedArticle)
      : {
          title: "Enter a disease and click Generate",
          about: "Waiting for input...",
          remedies: [],
          future_threats: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("disease", disease);
  }, [disease]);

  useEffect(() => {
    if (article.title !== "Enter a disease and click Generate") {
      localStorage.setItem("diseaseArticle", JSON.stringify(article));
    }
  }, [article]);

  const fetchDocumentation = () => {
    setIsGenerating(true);
    axios
      .post(
        "/api/v1/document/generate-documentation",
        { disease },
        { withCredentials: true }
      )
      .then((res) => {
        const data = res.data.data.document;
        const newArticle = {
          title: data.title,
          about: data.about,
          remedies: data.remedies,
          future_threats: data.future_threats,
        };

        setArticle(newArticle);
        localStorage.setItem("diseaseArticle", JSON.stringify(newArticle));
      })
      .catch(() => {
        setArticle({
          title: "Error fetching data",
          about: "There was an error retrieving the data.",
          remedies: [],
          future_threats: "",
        });
      })
      .finally(() => setIsGenerating(false));
  };

  const handleDownload = () => {
    const content = `
      Disease Documentation: ${article.title}
      
      About
      ${article.about}
      
      Remedies
      ${article.remedies.map((remedy) =>`- ${remedy.name}: ${remedy.description}`).join("\n")}
      
      Future Threats
      ${article.future_threats}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${article.title}-documentation.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Disease Documentation Generator
          </motion.h1>
          <p className="text-gray-600">Get comprehensive information about any disease instantly</p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter disease name..."
            />
          </div>
          <button
            onClick={fetchDocumentation}
            disabled={isGenerating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isGenerating ? "Generating..." : "Generate Documentation"}
          </button>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Report
            </button>
          </div>

          <div className="p-6 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Virus className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">About</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{article.about}</p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Remedies</h3>
              </div>
              <div className="grid gap-3">
                {article.remedies.map((remedy, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedRemedy(expandedRemedy === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-gray-700">{remedy.name}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                          expandedRemedy === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedRemedy === index && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-purple-50 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed">{remedy.description}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Future Threats</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{article.future_threats}</p>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}