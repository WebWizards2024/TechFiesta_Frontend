import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homevector from '../../assets/vector@2x.png';
import homeimg from '../../assets/homeimg.png';
import { motion } from "framer-motion"
import { FileText, UserRound, Activity, Shield, Clock ,User} from "lucide-react"
import logo from '../../assets/logo.svg'
import useAuth from '../../hooks/useAuth.js'
import Slide from '../Home/Slide.jsx'
function Home() {

  const { auth } = useAuth()

  const steps = [
    {
      id: 1,
      title: "Authenticate",
      description:
        "Log in securely with your unique credentials to access your personal health locker. With cutting-edge encryption, we ensure your data is accessible only to you.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      id: 2,
      title: "Register Now",
      description:
        "Take the first step toward safeguarding your health data. Register for the locker, designed to meet stringent data security standards.",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      id: 3,
      title: "Manage Your Data",
      description:
        "Enjoy complete control over your health records. Easily create, update, or view your detailed health history in one secure platform.",
      icon: <FileText className="w-8 h-8" />,
    },
  ]

  const services = [
    {
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      title: "Manage Your Data",
      description:
        "Seamlessly organize and manage all your medical records in one secure location. Powered by MongoDB technology, our system ensures your data is stored efficiently.",
    },
    {
      icon: <UserRound className="w-12 h-12 text-blue-600" />,
      title: "Connect With Doctors",
      description:
        "Easily share your medical records with our trusted network of healthcare professionals. Gain valuable insights and receive accurate prescriptions.",
    },
    {
      icon: <Activity className="w-12 h-12 text-blue-600" />,
      title: "Disease Prediction Model",
      description:
        "Stay one step ahead of potential health issues. Using advanced Machine Learning models, our system provides quick and reliable predictions.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }


  const navigate = useNavigate();
  return (
    <div className="h-screen relative">
      <img src={homevector} alt="" className="h-screen w-screen" />
      <img src={logo} alt="" className='w-[12%] absolute transform top-5 -translate-x-1/2 left-24 text-[#4299E1] font-bold text-[24px] font-poppins'/>
      <div className="absolute top-0 mt-10 flex gap-20 w-screen justify-center">
        <img src={homeimg} alt="" className="w-[40%]" />
        <div className="mt-24 flex flex-col gap-5">
          <div className="flex flex-col leading-none">
            <h1 className="text-[#2B6CB0] font-bold text-[40px] font-albert-sans">Digital Healthcare</h1>
            <h1 className="text-[#2B6CB0] font-bold text-[40px] font-albert-sans">System</h1>
          </div>
          <div>
            <p className="font-poppins font-medium text-[14px]">Welcome to your secure online platform for storing and</p>
            <p className="font-poppins font-medium text-[14px]">sharing medical records with ease. Simplify the management</p>
            <p className="font-poppins font-medium text-[14px]">of your health information while fostering seamless</p>
            <p className="font-poppins font-medium text-[14px]">communication and coordination with your healthcare</p>
            <p className="font-poppins font-medium text-[14px]">providers. Take control of your healthcare journey with</p>
            <p className="font-poppins font-medium text-[14px]">confidence, knowing your data is safe, protected, and always</p>
            <p className="font-poppins font-medium text-[14px]">accessible when you need it.</p>
          </div>
          <div>
            <button
              className="bg-[#2B6CB0] text-white px-5 py-2 rounded-sm font-poppins font-medium cursor-pointer"
              onClick={() => navigate('/container/profile')}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Login and Register buttons */}
      <div className="absolute top-5 right-5 flex gap-4">
  {auth.accessToken ? (
    <div className="flex gap-2 text-[#2B6CB0] font-semibold justify-center">
      <User className="text-lg" />
      <h1 className="text-md">{auth.username}</h1>
    </div>
  ) : (
    <div className="flex gap-4">
      <button
        className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      <button
        className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer"
        onClick={() => navigate('/register')}
      >
        Register
      </button>
    </div>
  )}
</div>
      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 text-[#2B6CB0]"
          >
            Getting Started
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 text-[#2B6CB0]">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#2B6CB0] mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* About Us Section */}
      
      <Slide/>

      {/* Services Section */}
      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-[#2B6CB0]"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 flex items-center justify-center text-[#2B6CB0]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>

    
  );
}

export default Home;
