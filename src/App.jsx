import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import Solution from "./components/Solution/Solution";
import Community from "./components/Community/Community";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import Home from "./components/Home/Home";
import Container from "./components/Container/Container";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfileEditForm from "./components/Profile/ProfileEditForm";
import Reminders from "./components/Remainders/Reminders";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Parent Route */}
            <Route path="/container" element={<Container />}>
              {/* Child Routes (Fix: Remove leading /) */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="editprofile" element={<ProfileEditForm />} />
              <Route path="reminders" element={<Reminders />} />
              <Route path="solution" element={<Solution />} />
              <Route path="community" element={<Community />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
