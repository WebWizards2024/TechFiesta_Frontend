import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
function Post() {
  const [posts, setPosts] = useState([]);
  const { communityId } = useParams();
  console.log(communityId);
  useEffect(() => {
    axios
      .get(`/api/v1/post/community/${communityId}`)
      .then((res) => {
        console.log(res.data); // Store API response in state
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Community Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white dark:bg-blue-300 p-4 rounded-lg shadow-md mb-4 border"
          >
            <h2 className="text-xl font-semibold text-stone-900">{post.title}</h2>
            <p className="text-black dark:text-black mt-2">{post.content}</p>

            <div className="mt-3 flex items-center justify-between text-gray-600">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-green-600 hover:text-green-800">
                  <ThumbsUp className="w-5 h-5" />
                  <span>{post.upvotes.length}</span>
                </button>

                <button className="flex items-center space-x-1 text-red-600 hover:text-red-800">
                  <ThumbsDown className="w-5 h-5" />
                  <span>{post.downvotes.length}</span>
                </button>

                <div className="flex items-center space-x-1 text-gray-500">
                  <MessageSquare className="w-5 h-5" />
                  <span>{post.comments.length}</span>
                </div>
              </div>

              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Post;
