import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser } from "../services/apiUsers";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [errMsg, setErrMsg] = useState("");

  const { mutate: createNewUser } = useMutation({
    mutationFn: (newUser) => createUser(newUser),
    onSuccess: () => {
      toast.success("User Registered Successfully");
      setFullName("");
      setPwd("");
      setEmail("");
      navigate("/login");
    },
    onError: (err) => {
      if (!err) {
        return err;
      } else if (err.response?.status === 409) {
        toast.error("User with email or username already exists");
        return err;
      }
    },
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleRegister = async () => {
    // Password Validation
    if (!PWD_REGEX.test(pwd)) {
      toast.error(
        "Password must be 8-24 characters, containing uppercase and lowercase letters, a number, and a special character."
      );
      return;
    }

    // Email Validation
    if (!EMAIL_REGEX.test(email)) {
      toast.error("Enter Valid Email");
      return;
    }

    createNewUser({ email, fullName, pwd });
  };

  return (
    <div className="min-h-screen bg-[#EDF2F7] flex flex-col items-center justify-center">
      {/* Logo (if needed) */}

      {/* Sign Up Form */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm m-10">
        <h1 className="text-2xl font-semibold text-[#2E66E5] mb-8 font-poppins">
          Sign Up
        </h1>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                placeholder="John Sarfare"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                ref={userRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E66E5] transition-transform duration-200 ease-in-out focus:scale-105"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E66E5] transition-transform duration-200 ease-in-out focus:scale-105"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password input types
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="********"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E66E5] transition-transform duration-200 ease-in-out focus:scale-105"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-[#2E66E5] transition"
              >
                {showPassword ? "🙈" : "👁"} {/* Show/Hide password button */}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-[#2E66E5] focus:ring-[#2E66E5] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Accept terms and conditions
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E66E5] hover:bg-[#2E66E5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E66E5] transform transition-transform duration-200 ease-in-out hover:scale-105"
          >
            Sign Up
          </button>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E66E5] flex items-center justify-center transform transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
        </form>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Register;
