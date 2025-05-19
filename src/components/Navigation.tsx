
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, User, Medal, ShoppingCart, Users, Settings, Calendar, Quiz as QuizIcon } from 'lucide-react';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Perfil', icon: <User className="w-6 h-6" />, href: '/profile' },
    { name: 'Conquistas', icon: <Medal className="w-6 h-6" />, href: '/achievements' },
    { name: 'Passe Mensal', icon: <Trophy className="w-6 h-6" />, href: '/monthly-pass' },
    { name: 'Loja', icon: <ShoppingCart className="w-6 h-6" />, href: '/store' },
    { name: 'Ranking', icon: <Users className="w-6 h-6" />, href: '/ranking' },
    { name: 'Quiz', icon: <QuizIcon className="w-6 h-6" />, href: '/quiz' },
    { name: 'Check-in', icon: <Calendar className="w-6 h-6" />, href: '/daily-checkin' },
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Verificar se é uma rota que requer autenticação
  useEffect(() => {
    const protectedRoutes = ['/profile', '/admin'];
    const isAdmin = currentPath === '/admin';
    const isUserRoute = currentPath === '/profile';
    
    if (protectedRoutes.includes(currentPath)) {
      const adminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
      const userAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
      
      if ((isAdmin && !adminAuthenticated) || (isUserRoute && !userAuthenticated)) {
        // Redirecionar para a página de login apropriada
        // Em uma aplicação real, usaríamos React Router para isso
        if (isAdmin) {
          window.location.href = '/admin-login';
        } else {
          window.location.href = '/user-login';
        }
      }
    }
  }, [currentPath]);

  return (
    <nav className="bg-game-darkPurple px-4 py-3 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
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
        <div className="hidden md:flex items-center gap-6">
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
          
          <Link 
            to="/admin-login" 
            className={`flex flex-col items-center transition-colors ${
              currentPath === '/admin' || currentPath === '/admin-login'
                ? 'text-game-yellow' 
                : 'text-game-purple hover:text-game-lightPurple'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1 font-pixel">Admin</span>
          </Link>
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
            <Link 
              to="/admin-login" 
              className={`flex items-center gap-2 p-2 rounded transition-colors ${
                currentPath === '/admin' || currentPath === '/admin-login'
                  ? 'bg-game-purple text-game-yellow'
                  : 'text-game-purple hover:bg-game-purple/50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings className="w-6 h-6" />
              <span className="font-pixel">Admin</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
