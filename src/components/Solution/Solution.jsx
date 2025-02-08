import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const Solution = () => {
  const [disease, setDisease] = useState("");
  const [videoUrls, setVideoUrls] = useState({});
  const [videoTitles, setVideoTitles] = useState({});
  const [videoDescriptions, setVideoDescriptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Retrieve stored video data when component mounts
  useEffect(() => {
    const storedVideos = localStorage.getItem("videoSolutions");
    if (storedVideos) {
      const parsedData = JSON.parse(storedVideos);
      setVideoUrls(parsedData.videoUrls);
      setVideoTitles(parsedData.videoTitles);
      setVideoDescriptions(parsedData.videoDescriptions);
    }
  }, []);

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:watch\?v=))([a-zA-Z0-9_-]{11}))/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Fetch video solutions
  const fetchVideoSolutions = async () => {
    if (!disease.trim()) {
      setError("Please enter a disease name.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/v1/video-generator", { disease });

      const videos = res.data.data.videos || [];
      if (videos.length > 0) {
        const newVideoUrls = {
          video1: videos[0]?.url || "",
          video2: videos[1]?.url || "",
          video3: videos[2]?.url || "",
          video4: videos[3]?.url || "",
          video5: videos[4]?.url || "",
          video6: videos[5]?.url || "",
        };

        const newVideoTitles = {
          video1: videos[0]?.title || "",
          video2: videos[1]?.title || "",
          video3: videos[2]?.title || "",
          video4: videos[3]?.title || "",
          video5: videos[4]?.title || "",
          video6: videos[5]?.title || "",
        };

        const newVideoDescriptions = {
          video1: videos[0]?.description || "",
          video2: videos[1]?.description || "",
          video3: videos[2]?.description || "",
          video4: videos[3]?.description || "",
          video5: videos[4]?.description || "",
          video6: videos[5]?.description || "",
        };

        setVideoUrls(newVideoUrls);
        setVideoTitles(newVideoTitles);
        setVideoDescriptions(newVideoDescriptions);

        // Save to localStorage
        localStorage.setItem(
          "videoSolutions",
          JSON.stringify({ videoUrls: newVideoUrls, videoTitles: newVideoTitles, videoDescriptions: newVideoDescriptions })
        );
      }
    } catch (error) {
      setError("Failed to fetch video solutions.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#4285f4]">
          Video Solutions for Your Condition
        </h1>
      </div>

      <div className="flex justify-center gap-4 mb-6">
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
          onClick={fetchVideoSolutions}
          className="px-6 py-2 bg-[#4285f4] text-white rounded-md hover:bg-[#3367d6] transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 group"
        >
          Get Videos
          <Check className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {isLoading ? (
        <p className="text-center text-gray-500">Loading video solutions...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {Object.keys(videoUrls).map((key, index) =>
            videoUrls[key] ? (
              <motion.div
                key={key}
                className="rounded-xl shadow-xl overflow-hidden bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoUrls[key])}`}
                    title="YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
                <h3 className="p-4 text-slate-800 font-semibold hover:text-blue-500 cursor-pointer transition-colors duration-200">
                  {videoTitles[key]}
                </h3>
              </motion.div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Solution;
