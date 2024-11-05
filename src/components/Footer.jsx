import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 flex flex-col">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold mb-2">Face Recognition App</h3>
          <p className="text-gray-400">Face detection and matching using TensorFlow.js</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 px-4">Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white no-underline">Home</Link>
            </li>
            <li>
              <Link to="/register" className="text-gray-400 hover:text-white no-underline">Register</Link>
            </li>
            <li>
              <Link to="/face-verify" className="text-gray-400 hover:text-white no-underline">Face Verification</Link>
            </li>
            <li>
              <Link to="/docs" className="text-gray-400 hover:text-white no-underline">Documentation</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm">&copy; 2024 Face Recognition App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
