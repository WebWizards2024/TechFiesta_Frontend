
import './App.css'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProfile from './components/Profile/AddProfile';
import Container from './components/Container/Container';
import { AuthProvider } from './context/AuthProvider'
import Login from './components/Login';
import Register from './components/Register';

function App() {


  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

        <Route path="/container" element={<Container />}>
          <Route path="profile" element={<AddProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
