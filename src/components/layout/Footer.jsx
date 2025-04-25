import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Heart, Shield, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-10 bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-white mb-4">
              <DollarSign size={24} />
              <span className="text-xl font-bold">InvestWise</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Smart investment planning powered by AI to help you build wealth and secure your financial future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/risk-assessment" className="text-gray-400 hover:text-white transition-colors">Risk Assessment</Link></li>
              <li><Link to="/investment-plan" className="text-gray-400 hover:text-white transition-colors">Investment Plan</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investment Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Market Insights</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={18} />
                <span>contact@investwise.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-6 flex items-center space-x-2 text-gray-400">
              <Shield size={18} />
              <span>Your data is always protected</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} InvestWise. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <p className="text-gray-500 text-xs mt-4 md:mt-0 flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for a secure financial future
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;