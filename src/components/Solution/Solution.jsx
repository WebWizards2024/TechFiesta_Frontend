import {
  Play,
  Sparkles,
} from "lucide-react"

const Solution = () => {
  return (
    <div className="flex h-screen bg-gray-100">
  

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Section */}
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=600"
                  alt="Meditation video thumbnail"
                  className="w-full h-[300px] object-cover"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                  <Play size={48} className="text-white" />
                </button>
              </div>

              {/* Food Image Section */}
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=600"
                  alt="Healthy food collection"
                  className="w-full h-[300px] object-cover"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                  <Play size={48} className="text-white" />
                </button>
              </div>

              {/* Article Section */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Green apple"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <h2 className="text-xl font-semibold mb-3">Title of an Article</h2>
                    <p className="text-gray-600 text-sm">
                      Seamlessly organize and manage all your medical records in one secure location. Powered by MongDB
                      technology, our system ensures your data is stored securely, accessible at any time, and always
                      protected with up-to-date security measures. Easily share your medical records with our trusted
                      network of healthcare professionals. Gain valuable insights and receive accurate analyses that you
                      can rely on, from our qualified medical experts that you entrust with your health journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - AI Suggestions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">AI Generated Suggestions</h3>
                  <Sparkles className="text-[#2E66E5]" />
                </div>
                <ul className="space-y-4">
                  {[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Integer vitae libero ac risus varius elementum non in lorem.",
                    "Curabitur ultrices lacus vel nulla tristique finibus.",
                    "Sed id nunc et nibh faucibus scelerisque.",
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
                    "Nunc feugiat turpis sed magna dictum malesuada.",
                    "Sed id nunc et nibh faucibus scelerisque.",
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
                    "Nunc feugiat turpis sed magna dictum malesuada.",
                  ].map((text, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-[#2E66E5] mt-1.5 mr-2 shrink-0"></span>
                      <span className="text-sm text-gray-600">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Navigation Item Component
const NavItem = ({ icon, label, active = false }) => (
  <li>
    <a
      href="#"
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
        active ? "bg-[#E5F0FF] text-[#2E66E5]" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  </li>
)

export default Solution