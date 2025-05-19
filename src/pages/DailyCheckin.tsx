
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Calendar, Check } from 'lucide-react';

const DailyCheckin = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [lastCheckin, setLastCheckin] = useState<string | null>(null);
  const [checkinStreak, setCheckinStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    // Verificar o último checkin do localStorage
    const storedLastCheckin = localStorage.getItem('lastCheckin');
    const storedStreak = localStorage.getItem('checkinStreak');
    
    if (storedLastCheckin) {
      setLastCheckin(storedLastCheckin);
      
      // Verificar se o checkin já foi feito hoje
      const today = new Date().toLocaleDateString();
      if (storedLastCheckin === today) {
        setHasCheckedIn(true);
      }
    }
    
    if (storedStreak) {
      setCheckinStreak(parseInt(storedStreak));
    }
  }, []);

  const handleCheckin = () => {
    if (hasCheckedIn) return;
    
    const today = new Date().toLocaleDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString();
    
    let newStreak = checkinStreak;
    
    // Verificar se o último checkin foi ontem para manter a streak
    if (lastCheckin === yesterdayStr) {
      newStreak += 1;
    } else if (lastCheckin !== today) {
      // Se não foi ontem e não foi hoje, resetar a streak
      newStreak = 1;
    }
    
    // Calcular XP baseado na streak
    let earnedXP = 10; // XP base
    if (newStreak >= 7) earnedXP = 25; // 1 semana
    if (newStreak >= 30) earnedXP = 50; // 1 mês
    
    // Salvar no localStorage
    localStorage.setItem('lastCheckin', today);
    localStorage.setItem('checkinStreak', newStreak.toString());
    
    // Atualizar estado
    setLastCheckin(today);
    setCheckinStreak(newStreak);
    setHasCheckedIn(true);
    setXpEarned(earnedXP);
    setAnimation(true);
    
    // Em uma aplicação real, enviaríamos esses dados para o backend
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Check-in Diário</h1>
        
        <div className="max-w-md mx-auto">
          <div className="pixel-card animate-pixel-fade-in">
            <div className="flex justify-center mb-8">
              <div className={`w-32 h-32 rounded-full bg-game-darkPurple flex items-center justify-center transition-all duration-500 ${animation ? 'scale-110' : ''}`}>
                <Calendar className="w-16 h-16 text-game-lightPurple" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-xl mb-2">Check-in Diário</h2>
              <p className="text-muted-foreground">Faça login todos os dias para ganhar XP e recompensas!</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Sequência atual</span>
                <span className="font-pixel text-game-yellow">{checkinStreak} dias</span>
              </div>
              
              <div className="w-full h-3 bg-game-darkPurple rounded-full overflow-hidden">
                <div 
                  className="h-full bg-game-lightPurple transition-all duration-500" 
                  style={{ width: `${Math.min(100, (checkinStreak % 7) / 7 * 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>1 dia</span>
                <span>7 dias</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="bg-game-darkPurple/50 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-pixel">Próxima recompensa:</p>
                    <p className="text-xs text-muted-foreground">
                      {checkinStreak < 7 ? `${7 - (checkinStreak % 7)} dias para +25 XP` :
                       checkinStreak < 30 ? `${30 - checkinStreak} dias para +50 XP` : 
                       "Você atingiu a maior recompensa!"}
                    </p>
                  </div>
                  <div className="text-game-yellow font-pixel text-lg">
                    {checkinStreak < 7 ? "+10 XP" : checkinStreak < 30 ? "+25 XP" : "+50 XP"}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCheckin}
              disabled={hasCheckedIn}
              className={`pixel-button w-full flex items-center justify-center gap-2 ${
                hasCheckedIn ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {hasCheckedIn ? (
                <>
                  <Check className="w-5 h-5" /> Check-in Realizado
                </>
              ) : (
                'Fazer Check-in Hoje'
              )}
            </button>
            
            {animation && (
              <div className="text-center mt-4 animate-pixel-fade-in text-game-green">
                +{xpEarned} XP adicionado!
              </div>
            )}
            
            {lastCheckin && (
              <div className="text-center mt-4 text-xs text-muted-foreground">
                Último check-in: {lastCheckin}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyCheckin;
