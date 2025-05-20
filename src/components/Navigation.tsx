
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Trophy, User, Medal, ShoppingCart, Users, Settings, Calendar, FileQuestion, LogOut, Code } from 'lucide-react';
import { getCurrentUser, logoutUser, isAuthenticated } from '../services/authService';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const isLoggedIn = isAuthenticated();

  // Public routes that are always visible
  const publicNavItems = [
    { name: 'Loja', icon: <ShoppingCart className="w-4 h-4" />, href: '/store' },
    { name: 'Passe Mensal', icon: <Trophy className="w-4 h-4" />, href: '/monthly-pass' },
    { name: 'Ranking', icon: <Users className="w-4 h-4" />, href: '/ranking' },
  ];
  
  // Routes visible to logged-in consultants
  const consultantNavItems = [
    { name: 'Perfil', icon: <User className="w-4 h-4" />, href: '/profile' },
    { name: 'Conquistas', icon: <Medal className="w-4 h-4" />, href: '/achievements' },
    { name: 'Quiz', icon: <FileQuestion className="w-4 h-4" />, href: '/quiz' },
    { name: 'Check-in', icon: <Calendar className="w-4 h-4" />, href: '/daily-checkin' },
    { name: 'Códigos', icon: <Code className="w-4 h-4" />, href: '/code-redemption' },
  ];
  
  // Routes visible only to admins
  const adminNavItems = [
    { name: 'Admin', icon: <Settings className="w-4 h-4" />, href: '/admin' },
  ];
  
  // Determine which nav items should be visible based on user role
  const getVisibleNavItems = () => {
    let items = [...publicNavItems];
    
    if (currentUser) {
      items = [...items, ...consultantNavItems];
      
      if (currentUser.role === 'admin') {
        items = [...items, ...adminNavItems];
      }
    }
    
    return items;
  };
  
  const navItems = getVisibleNavItems();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    navigate('/');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/user-login');
    }
  };

  // Update current user when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      setCurrentUser(getCurrentUser());
    };
    
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Check if route is protected
  useEffect(() => {
    const consultantProtectedRoutes = ['/profile', '/achievements', '/quiz', '/daily-checkin', '/code-redemption'];
    const adminProtectedRoutes = ['/admin'];
    
    const isConsultantProtectedRoute = consultantProtectedRoutes.includes(currentPath);
    const isAdminProtectedRoute = adminProtectedRoutes.includes(currentPath);
    
    if (isConsultantProtectedRoute && !currentUser) {
      navigate('/user-login');
      return;
    }
    
    if (isAdminProtectedRoute && (!currentUser || currentUser.role !== 'admin')) {
      navigate('/admin-login');
    }
  }, [currentPath, currentUser, navigate]);

  return (
    <nav className="bg-game-darkPurple px-4 py-3 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={handleLogoClick}>
          <span className="font-pixel text-xl text-game-lightPurple">MOSTEN</span>
          <span className="font-pixel text-sm text-game-purple">GAME CENTER</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden bg-game-purple p-2 rounded"
          onClick={toggleMobileMenu}
        >
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.href} 
              className={`text-white flex flex-col items-center transition-colors ${
                currentPath === item.href 
                  ? 'text-game-yellow' 
                  : 'hover:text-game-lightPurple'
              }`}
            >
              <div className={`${currentPath === item.href ? 'text-game-yellow' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-xs mt-1 font-pixel ${currentPath === item.href ? 'text-game-yellow' : ''}`}>
                {item.name}
              </span>
            </Link>
          ))}
          
          {!currentUser ? (
            <Link 
              to="/user-login" 
              className="text-white flex flex-col items-center transition-colors hover:text-game-lightPurple"
            >
              <User className="w-5 h-5" />
              <span className="text-xs mt-1 font-pixel">Login</span>
            </Link>
          ) : (
            <button 
              onClick={handleLogout}
              className="text-white flex flex-col items-center transition-colors hover:text-game-lightPurple"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs mt-1 font-pixel">Logout</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-pixel-fade-in">
          <div className="flex flex-col gap-4 p-4 mt-2 bg-game-darkPurple/95 border-t border-game-purple">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className={`flex items-center gap-2 p-2 rounded transition-colors ${
                  currentPath === item.href
                    ? 'bg-game-purple text-game-yellow'
                    : 'text-white hover:bg-game-purple/50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="font-pixel">{item.name}</span>
              </Link>
            ))}
            
            {!currentUser ? (
              <Link 
                to="/user-login" 
                className="flex items-center gap-2 p-2 rounded transition-colors text-white hover:bg-game-purple/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-pixel">Login</span>
              </Link>
            ) : (
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2 rounded transition-colors text-white hover:bg-game-purple/50"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-pixel">Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
