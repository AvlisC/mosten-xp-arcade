
import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { getVisibleNavItems, getAuthItem, getNotificationItem } from './navigation/NavItems';
import Logo from './navigation/Logo';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';
import MobileMenuButton from './navigation/MobileMenuButton';
import NotificationsButton from './navigation/NotificationsButton';
import { isConsultant } from '../services/authService';

const Navigation: React.FC = () => {
  const { 
    mobileMenuOpen, 
    currentPath, 
    currentUser, 
    isLoggedIn,
    toggleMobileMenu, 
    handleLogout, 
    handleLogoClick,
    setMobileMenuOpen
  } = useNavigation();

  const navItems = getVisibleNavItems();
  const authItem = getAuthItem(isLoggedIn);
  const showNotifications = isLoggedIn && isConsultant();
  
  return (
    <nav className="bg-game-darkPurple px-3 py-3 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Logo onClick={handleLogoClick} />
        <div className="flex items-center gap-3">
          {showNotifications && <NotificationsButton />}
          <MobileMenuButton onClick={toggleMobileMenu} />
          <DesktopNav 
            navItems={navItems} 
            currentPath={currentPath} 
            authItem={authItem} 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
          />
        </div>
      </div>
      
      <MobileNav 
        isOpen={mobileMenuOpen}
        navItems={navItems}
        currentPath={currentPath}
        authItem={authItem}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onItemClick={() => setMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navigation;
