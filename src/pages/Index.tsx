
import React from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { Trophy, Medal, User, Users, ShoppingCart } from 'lucide-react';
import BadgeDisplay from '../components/BadgeDisplay';
import { mockCurrentUser, getUserBadges } from '../services/dataService';

const Index = () => {
  const userBadges = getUserBadges(mockCurrentUser.id);
  const recentBadges = userBadges.slice(0, 3);
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <section className="animate-pixel-fade-in mb-8">
          <div className="pixel-card bg-game-purple mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="bg-game-darkPurple rounded-full w-24 h-24 flex items-center justify-center border-4 border-game-lightPurple">
                <User className="w-12 h-12 text-game-lightPurple" />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-white mb-2">{mockCurrentUser.name}</h1>
                <p className="text-white/70">Time: {mockCurrentUser.team === "team1" ? "Frontend" : mockCurrentUser.team}</p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  {recentBadges.map((badge) => (
                    <BadgeDisplay key={badge.id} badge={badge} size="sm" />
                  ))}
                  {userBadges.length > 3 && (
                    <Link to="/profile" className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                      <span className="text-white">+{userBadges.length - 3}</span>
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="ml-auto mt-4 md:mt-0 flex flex-col items-center">
                <div className="bg-game-darkPurple rounded-lg px-4 py-2 text-center">
                  <p className="text-white/70 text-sm">XP Total</p>
                  <p className="text-white font-pixel text-2xl">{mockCurrentUser.totalXp}</p>
                </div>
                
                <div className="mt-3 bg-game-darkPurple rounded-lg px-4 py-2 text-center">
                  <p className="text-white/70 text-sm">Pontos Disponíveis</p>
                  <p className="text-game-yellow font-pixel text-2xl">{mockCurrentUser.availablePoints}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pixel-fade-in">
          {/* Monthly Pass Card */}
          <Link to="/monthly-pass" className="pixel-card bg-gradient-to-br from-game-purple to-game-darkPurple hover:from-game-lightPurple hover:to-game-purple transition-all duration-300">
            <div className="flex items-center justify-between">
              <Trophy className="w-16 h-16 text-game-yellow animate-pixel-pulse" />
              <div className="text-right">
                <h2 className="text-white">Passe Mensal</h2>
                <p className="text-white/70">Nível {mockCurrentUser.monthlyPassProgress.currentLevel}</p>
                <p className="text-xs text-white/50 mt-1">
                  {mockCurrentUser.monthlyPassProgress.currentXp} XP este mês
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-game-lightPurple" 
                style={{ width: `${Math.min((mockCurrentUser.monthlyPassProgress.currentXp / 1200) * 100, 100)}%` }}
              ></div>
            </div>
          </Link>

          {/* Achievements Card */}
          <Link to="/achievements" className="pixel-card bg-gradient-to-br from-game-purple to-game-darkPurple hover:from-game-lightPurple hover:to-game-purple transition-all duration-300">
            <div className="flex items-center justify-between">
              <Medal className="w-16 h-16 text-badge-silver animate-pixel-pulse" />
              <div className="text-right">
                <h2 className="text-white">Conquistas</h2>
                <p className="text-white/70">{mockCurrentUser.achievements.length} desbloqueadas</p>
                <p className="text-xs text-white/50 mt-1">
                  Veja suas conquistas
                </p>
              </div>
            </div>
          </Link>

          {/* Store Card */}
          <Link to="/store" className="pixel-card bg-gradient-to-br from-game-purple to-game-darkPurple hover:from-game-lightPurple hover:to-game-purple transition-all duration-300">
            <div className="flex items-center justify-between">
              <ShoppingCart className="w-16 h-16 text-game-green animate-pixel-pulse" />
              <div className="text-right">
                <h2 className="text-white">Loja</h2>
                <p className="text-white/70">{mockCurrentUser.availablePoints} pontos disponíveis</p>
                <p className="text-xs text-white/50 mt-1">
                  Troque por recompensas
                </p>
              </div>
            </div>
          </Link>

          {/* Ranking Card */}
          <Link to="/ranking" className="pixel-card bg-gradient-to-br from-game-purple to-game-darkPurple hover:from-game-lightPurple hover:to-game-purple transition-all duration-300 md:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between">
              <Users className="w-16 h-16 text-game-blue animate-pixel-pulse" />
              <div className="text-right">
                <h2 className="text-white">Rankings</h2>
                <p className="text-white/70">Veja como você está se saindo</p>
                <p className="text-xs text-white/50 mt-1">
                  Individual e Times
                </p>
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Index;
