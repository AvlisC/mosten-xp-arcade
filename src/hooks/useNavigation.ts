
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, isAuthenticated } from '../services/authService';

export const useNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const isLoggedIn = isAuthenticated();

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

  return {
    mobileMenuOpen,
    currentPath,
    currentUser,
    isLoggedIn,
    toggleMobileMenu,
    handleLogout,
    handleLogoClick,
    setMobileMenuOpen
  };
};
