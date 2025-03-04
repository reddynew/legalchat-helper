
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: <MessageSquare className="w-4 h-4 mr-1.5" /> },
    { name: 'FAQs', path: '/faqs', icon: <HelpCircle className="w-4 h-4 mr-1.5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-serif font-semibold text-legal-700">LegalAssist</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
                  location.pathname === item.path
                    ? 'text-legal-700 bg-legal-50'
                    : 'text-gray-600 hover:text-legal-700 hover:bg-legal-50/50'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <div className="ml-4 pl-4 border-l border-gray-200">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-legal-700 hover:bg-legal-50/50 transition-colors"
                  >
                    <User className="w-4 h-4 mr-1.5" />
                    {user?.name}
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="text-sm border-legal-200 text-legal-700 hover:bg-legal-50"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="text-sm border-legal-200 text-legal-700 hover:bg-legal-50"
                >
                  Sign In / Register
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-legal-700 hover:bg-legal-50/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-3 rounded-lg text-base font-medium flex items-center ${
                  location.pathname === item.path
                    ? 'text-legal-700 bg-legal-50'
                    : 'text-gray-600 hover:text-legal-700 hover:bg-legal-50/50'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/profile"
                    className="px-4 py-3 rounded-lg text-base font-medium flex items-center text-gray-600 hover:text-legal-700 hover:bg-legal-50/50"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile ({user?.name})
                  </Link>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="w-full justify-start border-legal-200 text-legal-700 hover:bg-legal-50"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start border-legal-200 text-legal-700 hover:bg-legal-50"
                >
                  Sign In / Register
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
