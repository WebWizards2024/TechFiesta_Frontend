import { MessageCircle } from "lucide-react"

const DiscussionItem = ({ title, author, replies }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center hover:bg-blue-100 transition-colors duration-200">
      <div>
        <h3 className="text-gray-900 font-medium text-base">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{author}</p>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">{replies}</span>
      </div>
    </div>
  )
}

const Community = () => {
  const discussions = [
    {
      title: "Tips and Suggestions (title)",
      author: "Author name",
      replies: 14,
    },
    {
      title: "Tips and Suggestions (title)",
      author: "Author name",
      replies: 14,
    },
    {
      title: "Tips and Suggestions (title)",
      author: "Author name",
      replies: 14,
    },
    {
      title: "Tips and Suggestions (title)",
      author: "Author name",
      replies: 14,
    },
  ]

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans w-screen h-screen overflow-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Community Discussions</h1>

      <div className="space-y-4">
        {discussions.map((discussion, index) => (
          <DiscussionItem
            key={index}
            title={discussion.title}
            author={discussion.author}
            replies={discussion.replies}
          />
        ))}
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        View More Discussions
      </button>
    </div>
  )
}

export default Community