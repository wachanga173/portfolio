import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaEnvelope,
  FaFileAlt,
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'About', path: '/about', icon: FaUser },
    { name: 'Projects', path: '/projects', icon: FaProjectDiagram },
    { name: 'Resume', path: '/resume', icon: FaFileAlt },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-display font-bold gradient-text">
            Peter Wachanga
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary-500'
                    : 'text-gray-300 hover:text-primary-400'
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-gray-300 hover:text-primary-500 transition-colors"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-dark-800 rounded-lg my-4 py-4 animate-slide-down">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-6 py-3 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary-500 bg-dark-700'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-dark-700'
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
