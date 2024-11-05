import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-purple-700 fixed top-0 left-0 right-0 z-10 ">
      <div className="px-4 sm:px-6  ">
        <div className="flex py-3 justify-between  h-16">
          <Link to="/" className="text-white font-bold text-xl no-underline" aria-label="Home">
            MajorProject
          </Link>
          <div className="flex-grow" /> {/* This div pushes the links to the right */}
          <div className="flex space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => `text-white hover:text-purple-300 no-underline ${isActive ? 'text-purple-300' : ''}`} 
              aria-label="Home"
            >
              Home
            </NavLink>
            <NavLink 
              to="/register" 
              className={({ isActive }) => `text-white hover:text-purple-300 no-underline ${isActive ? 'text-purple-300' : ''}`} 
              aria-label="Register"
            >
              Register
            </NavLink>
            <NavLink 
              to="/face-verify" 
              className={({ isActive }) => `text-white hover:text-purple-300 no-underline ${isActive ? 'text-purple-300' : ''}`} 
              aria-label="Face Recognition"
            >
              Face Recognition
            </NavLink>
            <NavLink 
              to="/docs" 
              className={({ isActive }) => `text-white hover:text-purple-300 no-underline ${isActive ? 'text-purple-300' : ''}`} 
              aria-label="Documentation"
            >
              Docs
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
