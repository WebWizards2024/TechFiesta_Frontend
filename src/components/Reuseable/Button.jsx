import React from 'react';
import { useNavigate } from 'react-router-dom';
import homevector from '../../assets/vector@2x.png';
import homeimg from '../../assets/homeimg.png';
import Button from './Button'; // Assuming the Button component is in the same directory

function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-screen relative">
      <img src={homevector} alt="" className="h-screen w-screen" />
      <h1 className="absolute transform top-3 -translate-x-1/2 left-20 text-[#4299E1] font-bold text-[24px] font-poppins">
        Chronic
      </h1>
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
            <Button
              type="primary"
              onClick={() => navigate('/container/dashboard')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Login and Register buttons */}
      <div className="absolute top-5 right-5 flex gap-4">
        <Button
          type="secondary"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button
          type="secondary"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Home;
