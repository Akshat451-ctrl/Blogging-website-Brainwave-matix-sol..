import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken, user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white font-medium hover:underline transition"
            >
              Home
            </Link>
            <Link
              to="/posts"
              className="text-white font-medium hover:underline transition"
            >
              Posts
            </Link>
            <Link
              to="/about"
              className="text-white font-medium hover:underline transition"
            >
              About
            </Link>
            {token ? (
              <>
                <Link
                  to="/create"
                  className="text-white font-medium px-4 py-2 rounded-full bg-blue-700 bg-opacity-50 hover:bg-blue-800 hover:bg-opacity-70 transition transform hover:scale-105"
                >
                  Create Post
                </Link>
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-white font-medium px-4 py-2 rounded-full bg-gray-700 bg-opacity-50 hover:bg-gray-800 hover:bg-opacity-70 transition"
                  >
                    <span className="mr-2">
                      {user?.username || "Account"}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden mt-4 pb-4 flex flex-col space-y-3">
            <Link
              to="/"
              className="text-white font-medium hover:underline transition"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/posts"
              className="text-white font-medium hover:underline transition"
              onClick={toggleMenu}
            >
              Posts
            </Link>
            <Link
              to="/about"
              className="text-white font-medium hover:underline transition"
              onClick={toggleMenu}
            >
              About
            </Link>
            {token ? (
              <>
                <Link
                  to="/create"
                  className="text-white font-medium px-4 py-2 rounded-full bg-blue-700 bg-opacity-50 hover:bg-blue-800 hover:bg-opacity-70 transition text-center"
                  onClick={toggleMenu}
                >
                  Create Post
                </Link>
                <Link
                  to="/profile"
                  className="text-white font-medium px-4 py-2 rounded-full bg-gray-700 bg-opacity-50 hover:bg-gray-800 hover:bg-opacity-70 transition text-center"
                  onClick={toggleMenu}
                >
                  Profile
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