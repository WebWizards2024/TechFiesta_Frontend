
import React from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import homevector from '../../assets/vector@2x.png'
import homeimg from '../../assets/homeimg.png'

=======
import { Link, useNavigate } from "react-router-dom";
import Input from "../Reuseable/Input";
import Button from "../Reuseable/Button";


function Home() {
  const navigate = useNavigate();
  return (

    <div className=' h-screen relative'>
      <img src={homevector} alt="" className='h-screen w-screen  ' />
      <h1 className='absolute transform top-3 -translate-x-1/2 left-20 text-[#4299E1] font-bold text-[24px] font-poppins'>
        LOGO
      </h1>
      <div className='absolute top-0    mt-10 flex gap-20 w-screen justify-center'>
        <img src={homeimg} alt="" className='w-[40%]' />
        <div className='mt-24 flex flex-col gap-5'>
          <div className='flex flex-col leading-none'>
            
            <h1 className='text-[#2B6CB0] font-bold text-[40px] font-albert-sans'>Digital Healthcare</h1>
            <h1 className='text-[#2B6CB0] font-bold text-[40px] font-albert-sans'>System</h1>
          </div>
          <div>
            <p className='font-poppins font-medium text-[14px] '>Welcome to your secure online platform for storing and</p>
            <p className='font-poppins font-medium text-[14px] '>sharing medical records with ease. Simplify the management</p>
            <p className='font-poppins font-medium text-[14px] '>of your health information while fostering seamless</p>
            <p className='font-poppins font-medium text-[14px] '>communication and coordination with your healthcare</p>
            <p className='font-poppins font-medium text-[14px] '>providers. Take control of your healthcare journey with</p>
            <p className='font-poppins font-medium text-[14px] '>confidence, knowing your data is safe, protected, and always</p>
            <p className='font-poppins font-medium text-[14px] '>accessible when you need it.</p>
            </div>
            <div>
            <button className='bg-[#2B6CB0] text-white px-5 py-2 rounded-sm font-poppins font-medium cursor-pointer' onClick={() => navigate('/container/dashboard')}>Get Started</button>
            </div>
=======
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            YourApp
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome to YourApp
                </h1>
                <p className="text-xl mb-6">
                  Discover amazing features that will revolutionize your
                  workflow.
                </p>
              </div>
              <div className="md:w-1/2">
                {/* Replace with an actual image */}
                <img
                  src="/hero-image.jpg"
                  alt="Hero image"
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
            </div>
            <button onClick={() => navigate("/container/profile")}>
              Dashboard
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8"></div>
          </div>
          <form className="bg-white m-4 p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-[#012d61] text-xl font-bold mb-4">
              Upload Form
            </h2>

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              // value={formData.email}
              // onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              // value={formData.password}
              // onChange={handleChange}
              extraStyles="mt-3"
            />

            <Input
              label="Upload Document"
              type="file"
              name="file"
              // onChange={handleChange}
              extraStyles="mt-3"
            />

            <Button type="primary" extraStyles="w-full mt-4">
              Submit
            </Button>
          </form>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Join thousands of satisfied users and take your productivity to
              the next level.
            </p>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">YourApp</h3>
              <p className="text-sm">Empowering your workflow since 2023.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="text-sm">
                <li>
                  <Link to="/about" className="hover:text-blue-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-blue-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-blue-400">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons */}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} YourApp. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
