import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/HomePage';
import Register from './pages/Register';
import FaceVerification from './pages/FaceVerification';
// import Documentation from './pages/Documentation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/face-verify" element={<FaceVerification />} />
          {/* <Route path="/docs" element={<Documentation />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;