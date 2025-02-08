"use client";

import { useState } from "react";

const CommunityCreator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const maxDescriptionLength = 500;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Community name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Community name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Community description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Community created:", formData);
      setIsModalOpen(false);
      setFormData({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating community:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const Modal = ({ children }) => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsModalOpen(false)}
        aria-hidden="true"
      />
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg transform rounded-xl bg-white shadow-2xl transition-all duration-300 ease-in-out"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create New Community
        </button>

        {isModalOpen && (
          <Modal>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Close modal"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-6">
              <h2
                id="modal-title"
                className="text-2xl font-semibold text-gray-900 mb-6"
              >
                Create a new community
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Community name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors`}
                    placeholder="Enter community name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Community description
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      maxLength={maxDescriptionLength}
                      rows={4}
                      className={`w-full rounded-lg border ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors`}
                      placeholder="Describe your community..."
                    />
                    <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                      {formData.description.length}/{maxDescriptionLength}
                    </div>
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all
                      ${
                        isLoading
                          ? "cursor-not-allowed opacity-70"
                          : "hover:bg-indigo-700 active:bg-indigo-800"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      "Create Community"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CommunityCreator;
