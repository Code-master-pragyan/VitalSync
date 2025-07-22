import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, Menu, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  user: any;
  setUser: (user: any) => void;
  toast: any;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isDarkMode, onToggleDarkMode, user, setUser, toast }) => {

  const navigate = useNavigate();


  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50 border-b border-blue-100 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <a href="/" className="flex items-center space-x-2">
                <img src="/vitalsync logo.png" alt="logo" height={35} width={35} />
                <span className="text-xl font-bold text-gray-900 dark:text-white">VitalSync</span>
              </a>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                About Us
              </a>
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                Features
              </a>
              <a href="#ratings" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                Reviews
              </a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                Contact
              </a>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Auth Buttons */}
              {!user ? (
                <div className="hidden sm:flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/auth', { state: { mode: 'login' } })}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate('/auth', { state: { mode: 'signup' } })}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <span className="hidden sm:inline text-gray-700 dark:text-gray-300 font-medium">
                  Hello, {user.fullName.split(' ')[0]}
                </span>
              )}


              {/* User Profile Button */}
              <button
                onClick={onToggleSidebar}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <User className="h-6 w-6" />
              </button>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;