import React from 'react';
import Navigation from '../components/Navigation';
import { getCurrentMonthlyPass, getCurrentUserMonthlyPassProgress } from '../services/dataService';
import { Trophy, Gift, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { isAuthenticated } from '../services/authService';

const MonthlyPass = () => {
  const isLoggedIn = isAuthenticated();
  const monthlyPass = getCurrentMonthlyPass();
  const userProgress = isLoggedIn ? getCurrentUserMonthlyPassProgress() : null;
  
  // Only show next level info if user is logged in
  const nextLevel = isLoggedIn && userProgress 
    ? userProgress.levels.find(level => level.level > userProgress.currentLevel) 
    : null;
  
  // Calculate progress percentage to the next level (only for logged in users)
  const calculateProgress = () => {
    if (!isLoggedIn || !userProgress || !nextLevel) return 0;
    
    const currentLevelXp = userProgress.levels.find(level => level.level === userProgress.currentLevel)?.xpRequired || 0;
    const nextLevelXp = nextLevel.xpRequired;
    
    const xpForCurrentLevel = userProgress.currentXp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
    
    return Math.min(Math.round((xpForCurrentLevel / xpNeededForNextLevel) * 100), 100);
  };
  
  // Function to claim a reward
  const claimReward = (level: number) => {
    if (!isLoggedIn) {
      toast.error("Acesso negado", {
        description: "Você precisa estar logado para resgatar recompensas."
      });
      return;
    }
    
    toast.success("Recompensa resgatada com sucesso!", {
      description: "A recompensa será enviada para você em breve."
    });
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Passe Mensal</h1>
        
        {/* Only show user progress if logged in */}
        {isLoggedIn && userProgress && (
          <div className="pixel-card mb-8 animate-pixel-fade-in">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="bg-game-darkPurple rounded-lg p-6 flex flex-col items-center">
                <Trophy className="w-12 h-12 text-game-yellow mb-2" />
                <h2 className="font-pixel text-white">NÍVEL</h2>
                <p className="font-pixel text-game-yellow text-4xl">{userProgress.currentLevel}</p>
                <p className="text-white/70 mt-1">{userProgress.month}/{userProgress.year}</p>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>XP Atual: {userProgress.currentXp}</span>
                    {nextLevel && <span>Próximo Nível: {nextLevel.xpRequired} XP</span>}
                  </div>
                  <div className="h-4 bg-game-darkPurple rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-game-yellow" 
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>
                
                {nextLevel ? (
                  <div className="bg-game-darkPurple rounded-lg p-4 flex items-center">
                    <div>
                      <p className="text-white font-pixel">Próxima Recompensa:</p>
                      <p className="text-white/70">{nextLevel.reward.name}</p>
                      <p className="text-xs text-white/50">{nextLevel.reward.description}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-white/70">
                        {nextLevel.xpRequired - userProgress.currentXp} XP para desbloquear
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-game-darkPurple rounded-lg p-4">
                    <p className="text-white font-pixel text-center">Parabéns! Você atingiu o nível máximo deste mês.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="pixel-card animate-pixel-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Gift className="w-5 h-5 text-game-yellow" />
            <h2 className="text-lg">{isLoggedIn ? 'Recompensas do Passe' : `Recompensas do Passe - ${monthlyPass.month}/${monthlyPass.year}`}</h2>
          </div>
          
          <div className="space-y-6">
            {monthlyPass.levels.map((level) => {
              const isLocked = isLoggedIn && userProgress ? level.level > userProgress.currentLevel : false;
              const isUnlocked = isLoggedIn && userProgress ? level.level <= userProgress.currentLevel : false;
              const isClaimed = isLoggedIn && userProgress ? userProgress.claimedRewards.includes(level.level) : false;
              
              return (
                <div 
                  key={level.level}
                  className={`relative flex flex-col md:flex-row items-center p-4 rounded-lg
                    ${isLoggedIn && isLocked ? 'bg-game-darkPurple/30 text-white/50' : 'bg-game-darkPurple'}
                    ${level.level % 2 === 0 ? 'md:flex-row-reverse' : ''}
                  `}
                >
                  {/* Level indicator */}
                  <div className={`absolute top-0 left-1/2 md:left-auto md:top-1/2 transform -translate-y-1/2 ${level.level % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'} -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center
                    ${isLoggedIn && isLocked ? 'bg-game-darkPurple text-white/50' : 'bg-game-yellow text-game-darkPurple'}`}
                  >
                    <span className="font-pixel text-sm">{level.level}</span>
                  </div>
                  
                  {/* Reward image/icon */}
                  <div className={`w-16 h-16 min-w-16 flex items-center justify-center rounded-full bg-game-purple/30 mb-4 md:mb-0 
                    ${level.level % 2 === 0 ? 'md:ml-4' : 'md:mr-4'}`}
                  >
                    {level.reward.type === "badge" && (
                      <Trophy className="w-8 h-8 text-badge-gold" />
                    )}
                    {level.reward.type === "item" && (
                      <Gift className="w-8 h-8 text-game-lightPurple" />
                    )}
                    {level.reward.type === "money" && (
                      <div className="font-pixel text-game-yellow">
                        R$
                      </div>
                    )}
                  </div>
                  
                  {/* Reward details */}
                  <div className={`flex-1 text-center md:text-left mx-4 flex flex-col justify-center ${level.level % 2 === 0 ? 'md:text-right' : ''}`}>
                    <h3 className={`font-pixel ${isLoggedIn && isLocked ? 'text-white/70' : 'text-white'}`}>
                      {level.reward.name}
                    </h3>
                    <p className={`text-sm ${isLoggedIn && isLocked ? 'text-white/50' : 'text-white/70'}`}>
                      {level.reward.description}
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      Nível {level.level} - {level.xpRequired} XP necessários
                    </p>
                  </div>
                  
                  {/* Action button - only show if logged in */}
                  {isLoggedIn && (
                    <div>
                      {isLocked ? (
                        <div className="pixel-button opacity-50 cursor-not-allowed">
                          <span className="flex items-center gap-1">
                            <ArrowRight className="w-4 h-4" />
                            Bloqueado
                          </span>
                        </div>
                      ) : isClaimed ? (
                        <div className="pixel-button bg-game-green cursor-default">
                          <span className="flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Resgatado
                          </span>
                        </div>
                      ) : (
                        <button 
                          className="pixel-button"
                          onClick={() => claimReward(level.level)}
                        >
                          <span className="flex items-center gap-1">
                            <Gift className="w-4 h-4" />
                            Resgatar
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MonthlyPass;
