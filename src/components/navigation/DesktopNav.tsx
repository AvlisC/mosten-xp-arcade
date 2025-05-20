
import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItems';

type DesktopNavProps = {
  navItems: NavItem[];
  currentPath: string;
  authItem: NavItem;
  isLoggedIn: boolean;
  onLogout: () => void;
};

const DesktopNav: React.FC<DesktopNavProps> = ({ 
  navItems, 
  currentPath, 
  authItem, 
  isLoggedIn, 
  onLogout 
}) => {
  return (
    <div className="hidden md:flex items-center gap-3">
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
          <span className={`text-xs mt-1 font-pixel text-[10px] ${currentPath === item.href ? 'text-game-yellow' : ''}`}>
            {item.name}
          </span>
        </Link>
      ))}
      
      {!isLoggedIn ? (
        <Link 
          to={authItem.href}
          className="text-white flex flex-col items-center transition-colors hover:text-game-lightPurple"
        >
          {authItem.icon}
          <span className="text-xs mt-1 font-pixel text-[10px]">{authItem.name}</span>
        </Link>
      ) : (
        <button 
          onClick={onLogout}
          className="text-white flex flex-col items-center transition-colors hover:text-game-lightPurple"
        >
          {authItem.icon}
          <span className="text-xs mt-1 font-pixel text-[10px]">{authItem.name}</span>
        </button>
      )}
    </div>
  );
};

export default DesktopNav;
