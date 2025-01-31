import { useEffect, useState } from "react";
import axios from "axios";

const Solution = () => {
  const [article, setArticle] = useState({
    title: "Loading...",
    description: "Fetching AI-generated content...",
  });
  const [videoUrls, setVideoUrls] = useState({ video1: "", video2: "" }); // Store two video URLs

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:watch\?v=))([a-zA-Z0-9_-]{11}))/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    axios
      .post(
        "/api/v1/document/generate-documentation",
        { disease: "hypertension" },
        { withCredentials: true }
      )
      .then((res) => {
        const generatedData = res.data.data.generatedResponse;

        console.log("API Response:", generatedData); // Debugging

        let title = "AI Generated Title"; // Default title
        let description = "AI Generated Description";

        const titleMatch = generatedData.match(/\*\*Title:\s*(.*?)\*\*/);
        if (titleMatch) {
          title = titleMatch[1].trim();
        } else {
          const boldMatches = generatedData.match(/\*\*(.*?)\*\*/);
          if (boldMatches) {
            title = boldMatches[1].trim();
          } else {
            const firstLine = generatedData.split("\n")[0].trim();
            if (firstLine.length > 3) title = firstLine;
          }
        }

        description = generatedData.replace(`**${title}**`, "").trim();

        setArticle({ title, description });
      })
      .catch((error) => {
        console.error(error);
        setArticle({
          title: "Error fetching data",
          description: "There was an error retrieving the data.",
        });
      });
  }, []);

  useEffect(() => {
    axios
      .post("/api/v1/video-generator", { disease: "hypertension" }, { withCredentials: true })
      .then((res) => {
        const videos = res.data.data.videos;
        if (videos.length > 0) {
          setVideoUrls({
            video1: videos[0].url,
            video2: videos[1]?.url || "", // Fallback to empty string if second video is not available
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl overflow-auto h-screen">
      {/* Video Cards Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* First Video Card */}
        <div className="rounded-lg shadow-lg overflow-hidden bg-white">
          <div className="relative aspect-video">
            {videoUrls.video1 ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoUrls.video1)}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=600"
                alt="Meditation in nature"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Second Video Card */}
        <div className="rounded-lg shadow-lg overflow-hidden bg-white">
          <div className="relative aspect-video">
            {videoUrls.video2 ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoUrls.video2)}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600"
                alt="Fresh produce"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* AI Suggestions Card */}
      <div className="rounded-lg shadow-lg bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">AI Generated Suggestions</h2>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3L20 7.5L12 12L4 7.5L12 3Z" />
            <path d="M20 16.5L12 21L4 16.5" />
            <path d="M20 12L12 16.5L4 12" />
          </svg>
        </div>
        <ul className="space-y-3">
          <li>• Reduce sodium intake and eat a balanced diet.</li>
          <li>• Engage in regular physical activity.</li>
          <li>• Manage stress levels effectively.</li>
          <li>• Monitor blood pressure regularly.</li>
          <li>• Maintain a healthy weight.</li>
        </ul>
      </div>

      {/* Article Section */}
      <div className="rounded-lg shadow-lg bg-white p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=300"
              alt="Medical illustration"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
            <div
              className="text-gray-700 space-y-3"
              dangerouslySetInnerHTML={{
                __html: article.description
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
                  .replace(/\n/g, "<br/>"), // Preserve line breaks
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
