"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  User,
  Search,
  Bell,
  MessageSquare,
  ThumbsUp,
  Share2,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CommunityForum = () => {
  const [votes, setVotes] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  const handleUpvote = () => setVotes((prev) => prev + 1);
  const handleDownvote = () => setVotes((prev) => prev - 1);

  useEffect(() => {
    axios
      .get("/api/v1/community/")
      .then((res) => {
        console.log(res.data);
        setCommunities(res.data); // Store the communities from API response
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-white dark:to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-blue-800 shadow-sm border-b border-gray-200 dark:border-blue-700">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
              Community Forum
            </h1>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}

              <button className="p-2 hover:bg-gray-100 dark:hover:bg-blue-700 rounded-full transition-all">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-blue-700 rounded-full transition-all">
                <User className="w-5 h-5 text-blue-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          {/* Communities Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-blue-800 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-700 transition-all"
            >
              All Communities
              <ChevronDown className="w-4 h-4 text-blue-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white dark:bg-blue-800 border border-blue-200 dark:border-blue-700 rounded-lg shadow-lg z-10">
                {communities.map((community) => (
                  <button
                    key={community._id}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-blue-700 transition-all first:rounded-t-lg last:rounded-b-lg"
                  >
                    {community.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:ml-auto">
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg">
              <Plus className="w-4 h-4" />
              New Post
            </button>
            <button className="flex items-center gap-2 border border-gray-200 dark:border-blue-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-blue-700 transition-all">
              <Plus className="w-4 h-4" />
              New Community
            </button>
          </div>
        </div>

        {/* Display Communities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div
              key={community._id}
              className="bg-white dark:bg-blue-300 border border-gray-200 dark:border-blue-500 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                {community.name}
              </h2>
              <p className="text-stone-900">{community.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Members: {community.members.length}
              </p>

              {/* <button className="cursor" >JOIN</button> */}
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E66E5] hover:bg-[#2E66E5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E66E5] transition-all duration-300 transform hover:scale-105 active:scale-95 mt-4"
                onClick={() => navigate(`/container/post/${community._id}`)}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CommunityForum;
