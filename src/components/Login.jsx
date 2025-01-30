
import { useState } from "react"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 m-10">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl font-semibold text-[#2E66E5] mb-8">Welcome Back!</h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E66E5] focus:shadow-lg transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E66E5] focus:shadow-lg transition-all duration-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-[#2E66E5] focus:ring-[#2E66E5] border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember for 30 days
              </label>
            </div>
            <a href="#" className="text-sm text-[#2E66E5] hover:underline">
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E66E5] hover:bg-[#2E66E5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E66E5] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Sign in
          </button>

          <button
            type="button"
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E66E5] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </div>
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-[#2E66E5] hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
=======
import login from "../assets/login.svg";
import { CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiUsers.js";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  function handleUser() {}

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/user/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const accessToken = response?.data?.accessToken;
      setAuth({ email, accessToken });
      console.log(response.data);
      // toast.success("User Login Successfully !")
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized request");
      } else if (err.response?.status === 404) {
        toast.error("Invalid User Credentials.");
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-[#f5f5f5] flex justify-center items-center sm:p-10 p-0 ">
      <div className="bg-white grid sm:grid-cols-2 grid-cols-1 rounded-xl  w-[80%] shadow-xl items-center">
        <div className="hidden sm:block ">
          <img src={login} alt="" className="" />
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col p-3 sm:p-5 gap-5 items-center ">
            <div>
              <h1 className="text-2xl font-bold text-blue-500">Login</h1>
            </div>
            <div className="flex flex-col justify-center mt-5 w-[90%]  ">
              <input
                type="username"
                ref={userRef}
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500"
              />
              <CiUser size={24} className="absolute text-blue-500 ml-2" />
            </div>

            <div className="flex flex-col justify-center  w-[90%]  ">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="new-password"
                required
                className="cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500"
              />
              <IoKeyOutline size={24} className="absolute text-blue-500 ml-2" />
            </div>
            <button className="bg-blue-700 mt-5 py-4 w-[90%]  text-white rounded-lg hover:bg-blue-800">
              Login
            </button>

            <p>
              Do not have an account?
              <Link to="/register" className="text-blue-500 underline">
                {" "}
                Register{" "}
              </Link>
            </p>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default Login;
