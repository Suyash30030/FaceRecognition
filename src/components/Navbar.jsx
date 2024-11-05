// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-purple-500 font-bold text-xl">FaceAuth</Link>
          <div className="flex space-x-4">
            <Link to="/register" className="text-gray-300 hover:text-purple-500">Register</Link>
            <Link to="/face-verify" className="text-gray-300 hover:text-purple-500">Face Verify</Link>
            <Link to="/docs" className="text-gray-300 hover:text-purple-500">Docs</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;