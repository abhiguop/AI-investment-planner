import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, DollarSign, PieChart, TrendingUp, LineChart, GitCompare } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { path: '/', label: 'Home', icon: <DollarSign size={18} /> },
    { path: '/dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { path: '/risk-assessment', label: 'Risk Assessment', icon: <TrendingUp size={18} /> },
    { path: '/investment-plan', label: 'Investment Plan', icon: <PieChart size={18} /> },
    { path: '/historical-simulation', label: 'Historical Simulation', icon: <LineChart size={18} /> },
    { path: '/comparison', label: 'Plan Comparison', icon: <GitCompare size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-30 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-2xl">
            <DollarSign size={28} />
            <span>InvestWise</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 py-2 transition-colors ${
                  location.pathname === item.path 
                    ? 'text-indigo-600 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    location.pathname === item.path 
                      ? 'bg-indigo-50 text-indigo-600 font-medium' 
                      : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;