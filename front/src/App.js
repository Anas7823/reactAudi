import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
