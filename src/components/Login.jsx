import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticateUser, signInWithGoogle } from "../services/apiUsers";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const queryClient = useQueryClient();

  const { mutate: loginUser } = useMutation({
    mutationFn: (user) => authenticateUser(user),
    onSuccess: (data) => {
      console.log("spdjpondfoidnfv", data);
      toast.success("User Login Successfully!");
      console.log(data.data);
      queryClient.setQueryData(["user"], data.data.user);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
      setEmail("");
      setPassword("");
    },
    onError: (err) => {
      if (!err) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.response?.status === 401) {
        toast.error("Invalid User Credentials.");
      } else if (err.response?.status === 404) {
        toast.error("Unauthorized request!");
      }
    },
  });

  const session = useSession();
  const supabase = useSupabaseClient();
  const { mutate: googleSignIn } = useMutation({
    mutationFn: (supabase) => signInWithGoogle(supabase),
    onSuccess: () => {},
    onError: () => {},
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  function loginWithGoogle(e) {
    e.preventDefault();
    googleSignIn(supabase);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF2F7] ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm m-10">
        <h1 className="text-3xl font-semibold text-[#2E66E5] mb-8">
          Welcome Back!
        </h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={userRef}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E66E5] focus:shadow-lg transition-all duration-300"
            />
          </div>

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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E66E5] focus:shadow-lg transition-all duration-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300"
              >
                {showPassword ? "🙈" : "👁"}
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
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
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
            onClick={loginWithGoogle}
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
            Do nott have an account?{" "}
            <Link to="/register" className="text-[#2E66E5] hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
