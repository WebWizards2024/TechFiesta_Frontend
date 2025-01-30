import './App.css'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider'
import Login from './components/Login';
import Register from './components/Register';
import Solution from './components/Solution/Solution'
import Community from  './components/Community/Community'
import Container from './components/Container/Container';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile'


function App() {
  return (
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
            <Route path="solution" element={<Solution />} />
            <Route path="community" element={<Community />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
