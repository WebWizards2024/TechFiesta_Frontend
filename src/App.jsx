
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider'
import Solution from './components/Solution/Solution'
import Community from './components/Community/Community'
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import Home from "./components/Home/Home";
import Container from "./components/Container/Container";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfileEditForm from './components/Profile/ProfileEditForm'
import DiseaseInput from './components/DiseaseInput/DiseaseInput';
import Chart from './components/Chart/Chart';
import Dashboard_new from './components/Chart/Dashboard_new';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin'
import Diet from './components/Diet/Diet';
import SolutionContainer from './components/Solution/SolutionContainer';
import Share from './components/Share/Share';
import SendEmail from './components/Share/sendEmail';
import Documentation from './components/Solution/Documentation';



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
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new" element={< Dashboard_new/>} />
            <Route path="/share/:userId" element={<Share />} />

            <Route path="/share" element={<Chart />} />
            {/* Parent Route */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path="/container" element={<Container />}>
                  {/* Child Routes (Fix: Remove leading /) */}
                  {/* <Route path="dashboard" element={<Dashboard />} /> */}
                  <Route path="profile" element={<Profile />} />
                  <Route path="editprofile" element={<ProfileEditForm />} />
                  <Route path="diagnostic" element={<DiseaseInput />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="container_sol" element={<SolutionContainer />} >
                    <Route path="video" element={<Solution />} />
                    {/* <Route path="diet" element={<Diet />} />
                    <Route path="document" element={<Documentation />} /> */}
                  </Route>
                  <Route path="community" element={<Community />} />
                  <Route path="share" element={<SendEmail />} />
                </Route>
              </Route>
            </Route>


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>

  );
}

export default App;
