import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { motion } from 'framer-motion';
import { Menu, X, BarChart3, DollarSign, PieChart, TrendingUp, LineChart, GitCompare, Moon, Sun, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/use-theme';
=======
import { Menu, X, BarChart3, DollarSign, PieChart, TrendingUp, LineChart, GitCompare } from 'lucide-react';
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
<<<<<<< HEAD
  const { theme, setTheme } = useTheme();
=======
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { path: '/', label: 'Home', icon: <DollarSign size={18} /> },
    { path: '/dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
<<<<<<< HEAD
    { path: '/risk-assessment', label: 'Risk Assessment', icon: <Shield size={18} /> },
=======
    { path: '/risk-assessment', label: 'Risk Assessment', icon: <TrendingUp size={18} /> },
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53
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
<<<<<<< HEAD
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm py-0' 
        : 'bg-background/80 backdrop-blur-sm py-2'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <DollarSign size={28} className="text-primary transition-transform duration-300 group-hover:scale-110" />
              <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 bg-primary text-primary-foreground border-0">
                AI
              </Badge>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              InvestWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
=======
    <header className={`fixed top-0 w-full z-30 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-2xl">
            <DollarSign size={28} />
            <span>InvestWise</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
<<<<<<< HEAD
                className={`flex items-center space-x-2 py-2.5 px-4 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'text-primary bg-primary/10 font-medium shadow-sm' 
                    : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
                }`}
              >
                {React.cloneElement(item.icon, {
                  className: `w-5 h-5 ${location.pathname === item.path ? 'scale-110' : 'scale-100'} transition-transform duration-200`
                })}
                <span className="text-sm font-medium">{item.label}</span>
=======
                className={`flex items-center space-x-1 py-2 transition-colors ${
                  location.pathname === item.path 
                    ? 'text-indigo-600 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53
              </Link>
            ))}
          </nav>

<<<<<<< HEAD
          {/* Right side controls */}
          <div className="flex items-center space-x-1">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-full hover:bg-accent/50 transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden h-10 w-10 rounded-full hover:bg-accent/50 transition-colors duration-200" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
=======
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53
        </div>
      </div>

      {/* Mobile Navigation */}
<<<<<<< HEAD
      <motion.div 
        initial={false}
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0, overflow: 'hidden' }
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm"
      >
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col space-y-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {React.cloneElement(item.icon, {
                  className: `w-5 h-5 ${location.pathname === item.path ? 'scale-110' : 'scale-100'} transition-transform duration-200`
                })}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
=======
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
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53
    </header>
  );
};

export default Navbar;