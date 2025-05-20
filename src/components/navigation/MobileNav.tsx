
import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItems';

type MobileNavProps = {
  isOpen: boolean;
  navItems: NavItem[];
  currentPath: string;
  authItem: NavItem;
  isLoggedIn: boolean;
  onLogout: () => void;
  onItemClick: () => void;
};

const MobileNav: React.FC<MobileNavProps> = ({ 
  isOpen, 
  navItems, 
  currentPath, 
  authItem, 
  isLoggedIn, 
  onLogout,
  onItemClick 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden animate-pixel-fade-in">
      <div className="flex flex-col gap-3 p-3 mt-2 bg-game-darkPurple/95 border-t border-game-purple">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.href} 
            className={`flex items-center gap-2 p-1.5 rounded transition-colors ${
              currentPath === item.href
                ? 'bg-game-purple text-game-yellow'
                : 'text-white hover:bg-game-purple/50'
            }`}
            onClick={onItemClick}
          >
            {item.icon}
            <span className="font-pixel text-xs">{item.name}</span>
          </Link>
        ))}
        
        {!isLoggedIn ? (
          <Link 
            to={authItem.href} 
            className="flex items-center gap-2 p-1.5 rounded transition-colors text-white hover:bg-game-purple/50"
            onClick={onItemClick}
          >
            {authItem.icon}
            <span className="font-pixel text-xs">{authItem.name}</span>
          </Link>
        ) : (
          <button 
            onClick={() => {
              onLogout();
              onItemClick();
            }}
            className="flex items-center gap-2 p-1.5 rounded transition-colors text-white hover:bg-game-purple/50"
          >
            {authItem.icon}
            <span className="font-pixel text-xs">{authItem.name}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
