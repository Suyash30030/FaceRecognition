import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-white font-bold text-xl no-underline" aria-label="Home">
              MajorProject
            </Link>

            {/* Hamburger menu button */}
            <button
              className="md:hidden text-white hover:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => `text-white hover:text-gray-300 no-underline ${isActive ? 'text-gray-300' : ''}`} 
                aria-label="Home"
              >
                Home
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => `text-white hover:text-gray-300 no-underline ${isActive ? 'text-gray-300' : ''}`} 
                aria-label="Register"
              >
                Register
              </NavLink>
              <NavLink 
                to="/face-verify" 
                className={({ isActive }) => `text-white hover:text-gray-300 no-underline ${isActive ? 'text-gray-300' : ''}`} 
                aria-label="Face Recognition"
              >
                Face Recognition
              </NavLink>
              <NavLink 
                to="/docs" 
                className={({ isActive }) => `text-white hover:text-gray-300 no-underline ${isActive ? 'text-gray-300' : ''}`} 
                aria-label="Documentation"
              >
                Docs
              </NavLink>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } md:hidden pb-4 absolute bg-black w-full left-0 shadow-lg`}
          >
            <div className="flex flex-col space-y-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => `text-white hover:text-gray-300 no-underline px-2 py-1 rounded ${isActive ? 'text-gray-300' : ''}`}
                onClick={toggleMenu}
                aria-label="Home"
              >
                Home
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => `text-white hover:text-gray-300 no-underline px-2 py-1 rounded ${isActive ? 'text-gray-300' : ''}`}
                onClick={toggleMenu}
                aria-label="Register"
              >
                Register
              </NavLink>
              <NavLink 
                to="/face-verify" 
                className={({ isActive }) => `text-white hover:text-gray-300 no-underline px-2 py-1 rounded ${isActive ? 'text-gray-300' : ''}`}
                onClick={toggleMenu}
                aria-label="Face Recognition"
              >
                Face Recognition
              </NavLink>
              <NavLink 
                to="/docs" 
                className={({ isActive }) => `text-white hover:text-gray-300 no-underline px-2 py-1 rounded ${isActive ? 'text-gray-300' : ''}`}
                onClick={toggleMenu}
                aria-label="Documentation"
              >
                Docs
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
