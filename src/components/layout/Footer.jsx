import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { DollarSign, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Risk Assessment', href: '/risk-assessment' },
      { name: 'Investment Plan', href: '/investment-plan' },
      { name: 'Historical Simulation', href: '/historical-simulation' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Support', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@investwise.app' },
  ];

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">InvestWise</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              AI-powered investment planning platform that helps you make informed financial decisions 
              and build wealth through personalized portfolio strategies.
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                AI Powered
              </Badge>
              <Badge variant="outline">Secure</Badge>
              <Badge variant="outline">Free</Badge>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-9 w-9"
                >
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} InvestWise. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for smart investors.</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Built with React & AI</span>
            </div>
          </div>
=======
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
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53
        </div>
      </div>
    </footer>
  );
};

export default Footer;