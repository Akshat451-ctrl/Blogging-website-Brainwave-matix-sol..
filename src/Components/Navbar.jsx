import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 backdrop-blur-md bg-opacity-80 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <Link
            to="/"
            className="text-white text-3xl font-extrabold tracking-tight hover:text-blue-200 transition duration-300"
          >
            BlogSphere
          </Link>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-6">
            {token ? (
              <>
                <Link
                  to="/create"
                  className="text-white font-medium px-4 py-2 rounded-full bg-blue-700 bg-opacity-50 hover:bg-blue-800 hover:bg-opacity-70 transition transform hover:scale-105"
                >
                  Create Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white font-medium px-4 py-2 rounded-full bg-red-600 bg-opacity-50 hover:bg-red-700 hover:bg-opacity-70 transition transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white font-medium px-4 py-2 rounded-full bg-blue-700 bg-opacity-50 hover:bg-blue-800 hover:bg-opacity-70 transition transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white font-medium px-4 py-2 rounded-full bg-green-600 bg-opacity-50 hover:bg-green-700 hover:bg-opacity-70 transition transform hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden mt-4 pb-4 flex flex-col space-y-3">
            {token ? (
              <>
                <Link
                  to="/create"
                  className="text-white font-medium px-4 py-2 rounded-full bg-blue-700 bg-opacity-50 hover:bg-blue-800 hover:bg-opacity-70 transition text-center"
                  onClick={toggleMenu}
                >
                  Create Post
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-white font-medium px-4 py-2 rounded-full bg-red-600 bg-opacity-50 hover:bg-red-700 hover:bg-opacity-70 transition text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white font-medium px-4 py-2 rounded-full bg-blue-700 bg-opacity-50 hover:bg-blue-800 hover:bg-opacity-70 transition text-center"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white font-medium px-4 py-2 rounded-full bg-green-600 bg-opacity-50 hover:bg-green-700 hover:bg-opacity-70 transition text-center"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;