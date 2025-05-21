
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { checkInCalendar } from '../mocks/eventsMocks';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DailyCheckin = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [lastCheckin, setLastCheckin] = useState<string | null>(null);
  const [checkinStreak, setCheckinStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Convert checkInCalendar to Date objects for the calendar
  const checkedDates = checkInCalendar.filter(c => c.checked).map(c => new Date(c.date));

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="max-w-md mx-auto w-full">
            <div className="pixel-card animate-pixel-fade-in">
              <div className="flex justify-center mb-8">
                <div className={`w-32 h-32 rounded-full bg-game-darkPurple flex items-center justify-center transition-all duration-500 ${animation ? 'scale-110' : ''}`}>
                  <CalendarIcon className="w-16 h-16 text-game-lightPurple" />
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
          
          <div className="max-w-md mx-auto w-full">
            <div className="pixel-card animate-pixel-fade-in">
              <h2 className="text-lg mb-4 font-pixel">Calendário de Check-ins</h2>
              
              <div className="bg-game-darkPurple/20 p-4 rounded-md">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border border-game-purple rounded-md p-2 bg-game-darkPurple/30"
                  locale={ptBR}
                  modifiers={{
                    checked: checkedDates
                  }}
                  modifiersClassNames={{
                    checked: "bg-game-green text-white"
                  }}
                  formatters={{
                    formatCaption: (date, options) => {
                      return format(date, 'MMMM yyyy', { locale: options?.locale });
                    }
                  }}
                />
                
                <div className="flex items-center justify-end mt-4 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-game-green rounded-full"></div>
                    <span>Check-in realizado</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-transparent border border-game-purple rounded-full"></div>
                    <span>Sem check-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyCheckin;
