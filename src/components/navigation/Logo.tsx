
import React from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  onClick: (e: React.MouseEvent) => void;
};

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Link to="/" className="flex items-center gap-2" onClick={onClick}>
      <span className="font-pixel text-lg text-game-lightPurple">MOSTEN</span>
      <span className="font-pixel text-[10px] text-game-purple">GAME CENTER</span>
    </Link>
  );
};

export default Logo;
