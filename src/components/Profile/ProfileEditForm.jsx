import { useState } from "react"
import {
  Phone,
  Mail,
  User,
  Calendar,
  Weight,
  Ruler,
  MapPin,
  Droplet,
  FileText,
  AlertCircle,
  Edit,
  Save,
} from "lucide-react"

import { useNavigate } from "react-router-dom"

function ProfileEditForm() {
  const [formData, setFormData] = useState({
    firstName: "Chaitanya",
    middleName: "Laxmikant",
    lastName: "Girgaonkar",
    phone: "8788352998",
    email: "girgaonkar.chaitanya@gmail.com",
    gender: "Male",
    birthDate: "2005-10-24",
    weight: "68",
    height: "123",
    address: "Aurangabad",
    bloodGroup: "A-",
    medicalHistory: "Cold",
    emergencyName: "Chaitanya",
    emergencyPhone: "8149420182",
  })

  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to a server
  }

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=120&width=120"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white bg-white"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            {/* Basic Info */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-full">
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Middle Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last Name"
                  />
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-600" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-gray-600" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-gray-600" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User size={20} className="mr-2 text-blue-500" />
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center">
                  <Calendar size={20} className="text-blue-500 mr-3" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Birth Date</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <Weight size={20} className="text-blue-500 mr-3" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler size={20} className="text-blue-500 mr-3" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="text-blue-500 mr-3" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Details */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText size={20} className="mr-2 text-blue-500" />
                Medical Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center">
                  <Droplet size={20} className="text-blue-500 mr-3" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText size={20} className="text-blue-500 mr-3" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Medical History</label>
                    <input
                      type="text"
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle size={20} className="mr-2 text-blue-500" />
                Emergency Contact
              </h2>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <User size={20} className="text-red-500 mr-3" />
                    <div className="flex-1">
                      <label className="text-sm text-gray-500">Name</label>
                      <input
                        type="text"
                        name="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={20} className="text-red-500 mr-3" />
                    <div className="flex-1">
                      <label className="text-sm text-gray-500">Phone</label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center" onClick={() => navigate('/container/profile')}
              >
                <Save size={20} className="mr-2" />
                Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEditForm

