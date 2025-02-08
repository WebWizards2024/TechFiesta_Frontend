"use client";

import { useState } from "react";
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
import CommunityAddPost from "./CommunityAddPost";

const Community = () => {
  const [votes, setVotes] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample communities data
  const communities = [
    "Technology",
    "Design",
    "Programming",
    "Gaming",
    "Music",
  ];

  const handleUpvote = () => setVotes((prev) => prev + 1);
  const handleDownvote = () => setVotes((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Community Forum
            </h1>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-64 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div>
        <CommunityAddPost
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          {/* Communities Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              All Communities
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                {communities.map((community, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all first:rounded-t-lg last:rounded-b-lg"
                  >
                    {community}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:ml-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
            <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Plus className="w-4 h-4" />
              New Community
            </button>
          </div>
        </div>

        {/* Post Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
          <div className="flex gap-4">
            {/* Voting */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleUpvote}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
              >
                <ChevronUp className="w-5 h-5 text-gray-500 hover:text-blue-500" />
              </button>
              <span
                className={`font-medium text-lg ${
                  votes > 0
                    ? "text-blue-500"
                    : votes < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {votes}
              </span>
              <button
                onClick={handleDownvote}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
              >
                <ChevronDown className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>
            </div>

            {/* Post Content */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                hello
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <span className="hover:text-gray-700 cursor-pointer">
                  Posted by @username
                </span>
                <span>•</span>
                <span>3 minutes ago</span>
                <span>•</span>
                <div className="flex items-center gap-1 hover:text-gray-700 cursor-pointer">
                  <MessageSquare className="w-4 h-4" />
                  <span>0 comments</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">nothing</p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-all">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-all">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Like</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-purple-500 transition-all">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
