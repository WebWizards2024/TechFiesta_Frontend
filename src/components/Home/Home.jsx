import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import homevector from "../../assets/vector@2x.png";
import homeimg from "../../assets/homeimg.png";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";

function Home() {
  const navigate = useNavigate();
  const session = useSession();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  console.log(session);
  useEffect(() => {
    queryClient.setQueryData(
      ["googleAuthUser"],
      session ? session?.user.user_metadata : null
    );
  }, [queryClient, session]);

  async function logOut() {
    await supabase.auth.signOut();
  }

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
            <h1 className="text-[#2B6CB0] font-bold text-[40px] font-albert-sans">
              Digital Healthcare
            </h1>
            <h1 className="text-[#2B6CB0] font-bold text-[40px] font-albert-sans">
              System
            </h1>
          </div>
          <div>
            <p className="font-poppins font-medium text-[14px]">
              Welcome to your secure online platform for storing and
            </p>
            <p className="font-poppins font-medium text-[14px]">
              sharing medical records with ease. Simplify the management
            </p>
            <p className="font-poppins font-medium text-[14px]">
              of your health information while fostering seamless
            </p>
            <p className="font-poppins font-medium text-[14px]">
              communication and coordination with your healthcare
            </p>
            <p className="font-poppins font-medium text-[14px]">
              providers. Take control of your healthcare journey with
            </p>
            <p className="font-poppins font-medium text-[14px]">
              confidence, knowing your data is safe, protected, and always
            </p>
            <p className="font-poppins font-medium text-[14px]">
              accessible when you need it.
            </p>
          </div>
          <div>
            <button
              className="bg-[#2B6CB0] text-white px-5 py-2 rounded-sm font-poppins font-medium cursor-pointer"
              onClick={() => navigate("/container/dashboard")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Login and Register buttons */}
      <div className="absolute top-5 right-5 ">
        {!session ? (
          <div className="flex gap-4">
            <button
              className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            {/* <img
              src="https://lh3.googleusercontent.com/a/ACg8ocLbDJ69sPEk-hbx9Zj3O_H4rAhmcnoofBXCu6Zal1rS63niQsr8NA=s96-c"
              alt="someimg"
              className=""
            /> */}
            <h1 className="text-[#2B6CB0] px-4 py-2 rounded-sm font-poppins font-medium">
              {session.user.user_metadata.full_name}
            </h1>
            <button
              className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer"
              onClick={() => logOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
