import { Phone, Mail, User, Calendar, Weight, Ruler, MapPin, Droplet, FileText, AlertCircle, Edit } from "lucide-react"
import profileimg from '../../assets/profileimg.png'
import { useNavigate } from "react-router-dom"

function Profile() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen overflow-auto bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={profileimg}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white bg-white"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            {/* Basic Info */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chaitanya Laxmikant Girgaonkar</h1>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span>8788352998</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span>girgaonkar.chaitanya@gmail.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User size={16} className="mr-2" />
                    <span>Male</span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center" onClick={() => navigate('/container/editprofile')}>
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
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
                  <div>
                    <p className="text-sm text-gray-500">Birth Date</p>
                    <p className="font-medium">2005-10-24</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Weight size={20} className="text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">68 kg</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler size={20} className="text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="font-medium">123 cm</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">Aurangabad</p>
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
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium">A-</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText size={20} className="text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Medical History</p>
                    <p className="font-medium">Cold</p>
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
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">Chaitanya</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={20} className="text-red-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">8149420182</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile