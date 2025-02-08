"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const CommunityAddPost = ({ isOpen, onClose }) => {
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample communities
  const communities = [
    "Technology",
    "Design",
    "Programming",
    "Gaming",
    "Music",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post creation logic here
    console.log({ selectedCommunity, title, content });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-xl w-full max-w-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Create a new post</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Community Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 text-left border-2 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              {selectedCommunity || "Select a community"}
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                {communities.map((community) => (
                  <button
                    key={community}
                    type="button"
                    onClick={() => {
                      setSelectedCommunity(community);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {community}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />

          {/* Content Textarea */}
          <textarea
            placeholder="Write your post content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border-2 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition-colors"
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0A0F1C] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Example usage component
// const CommunityAddPost = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="px-4 py-2 bg-[#0A0F1C] text-white rounded-lg"
//       >
//         Create New Post
//       </button>

//       <CreatePostModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </div>
//   );
// };

export default CommunityAddPost;
