const Solution = () => {
  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl overflow-auto h-screen">
      {/* Video Cards Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg shadow-lg overflow-hidden bg-white">
          <div className="relative aspect-video">
            <img
              src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=600"
              alt="Meditation in nature"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-black border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-lg overflow-hidden bg-white">
          <div className="relative aspect-video">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600"
              alt="Fresh produce"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-black border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
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
          <li>• Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>• Integer vitae libero ac risus varius venenatis non ut lorem.</li>
          <li>• Curabitur ultricies lacus vel nulla interdum tincidunt.</li>
          <li>• Sed id nunc et nibh faucibus scelerisque.</li>
          <li>• Pellentesque habitant morbi tristique senectus et netus et malesuada fames.</li>
          <li>• Nunc feugiat turpis sed magna dictum malesuada.</li>
          <li>• Sed id nunc et nibh faucibus scelerisque.</li>
          <li>• Pellentesque habitant morbi tristique senectus et netus et malesuada fames.</li>
          <li>• Nunc feugiat turpis sed magna dictum malesuada.</li>
        </ul>
      </div>

      {/* Article Section */}
      <div className="rounded-lg shadow-lg bg-white p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=300"
              alt="Medical illustration"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Title of an Article</h2>
            <p className="text-gray-600">
              Seamlessly organize and manage all your medical records in one secure location. Powered by MongoDB
              technology, our system ensures your data is stored efficiently, accessible at any time, and always
              protected with state-of-the-art security measures. Easily share your medical records with our trusted
              network of healthcare professionals. Gain valuable insights through our innovative features tailored to
              your needs by qualified medical experts Log in securely with your unique credentials to access your
              complete medical history.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Solution

/* Add these styles to your index.css or App.css file */
/* 
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .border-l-12 {
    border-left-width: 12px;
  }
}
*/