
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-game-darkPurple px-4">
      <div className="text-center">
        <h1 className="font-pixel text-6xl text-game-lightPurple mb-4">404</h1>
        <div className="pixel-border bg-game-purple p-6 max-w-md mx-auto">
          <p className="text-white font-pixel mb-4">GAME OVER</p>
          <p className="text-white mb-6">A página que você está procurando não existe ou foi movida.</p>
          <Link to="/" className="pixel-button inline-block">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
