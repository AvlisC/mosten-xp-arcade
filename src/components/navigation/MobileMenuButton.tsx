
import React from 'react';

type MobileMenuButtonProps = {
  onClick: () => void;
};

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="md:hidden bg-game-purple p-2 rounded"
      onClick={onClick}
    >
      <div className="w-5 h-0.5 bg-white mb-1"></div>
      <div className="w-5 h-0.5 bg-white mb-1"></div>
      <div className="w-5 h-0.5 bg-white"></div>
    </button>
  );
};

export default MobileMenuButton;
