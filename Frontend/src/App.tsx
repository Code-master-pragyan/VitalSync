import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Features from './components/Features';
import UserRatings from './components/UserRatings';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null); // Authenticated user

  const navigate = useNavigate();
  const location = useLocation();
  const showAuthModal = location.pathname === '/auth';
  const authMode = location.state?.mode || 'login';

  // Theme and user session load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Auto fetch current user if session exists
    fetch(`${import.meta.env.VITE_API_BASE_URL}/current-user`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch(err => console.error('User fetch error:', err));
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(null);
          toast.success("Logged out successfully");
          navigate('/');
        }
      })
      .catch(err => {
        toast.error("Logout failed");
      });
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        user={user}
        setUser={setUser}
        toast={toast}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        setUser={setUser}
        toast={toast}
        onLogout={handleLogout}
      />

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <AboutUs />
              <Features />
              <UserRatings />
            </>
          } />
        </Routes>

        {showAuthModal && (
          <AuthModal
            isOpen={true}
            onClose={() => navigate('/')}
            initialMode={authMode}
            setUser={setUser}
            toast={toast}
          />
        )}
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
