import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { achievements, getUserAchievements } from '../services/dataService';
import { Medal, Trophy, Check, Clock } from 'lucide-react';
import BadgeDisplay from '../components/BadgeDisplay';

type AchievementCategory = 'all' | 'performance' | 'feedback' | 'timeTracking' | 'mission' | 'other';

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('all');
  const [showEarned, setShowEarned] = useState<boolean>(false);
  
  // Get the user's earned achievements
  const userAchievements = getUserAchievements('user1');
  const userAchievementIds = userAchievements.map((a: any) => a.achievementId);
  
  // Filter achievements based on category and earned status
  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const earnedMatch = !showEarned || userAchievementIds.includes(achievement.id);
    return categoryMatch && earnedMatch;
  });
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Conquistas</h1>
        
        <div className="pixel-card mb-8 animate-pixel-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-game-yellow" />
              <div>
                <p className="text-white/70">Suas Conquistas</p>
                <p className="font-pixel text-white text-xl">
                  {userAchievements.length} / {achievements.length} Desbloqueadas
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEarned(!showEarned)}
                className={`px-4 py-1 rounded-lg text-sm border ${
                  showEarned 
                    ? 'bg-game-purple text-white border-game-purple' 
                    : 'bg-transparent text-white/70 border-white/20'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Apenas Conquistadas
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button 
              onClick={() => setSelectedCategory('all')} 
              className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === 'all' ? 'bg-game-purple text-white' : 'bg-game-darkPurple text-white/70'}`}
            >
              Todas
            </button>
            <button 
              onClick={() => setSelectedCategory('performance')} 
              className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === 'performance' ? 'bg-game-purple text-white' : 'bg-game-darkPurple text-white/70'}`}
            >
              Performance
            </button>
            <button 
              onClick={() => setSelectedCategory('feedback')} 
              className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === 'feedback' ? 'bg-game-purple text-white' : 'bg-game-darkPurple text-white/70'}`}
            >
              Feedback
            </button>
            <button 
              onClick={() => setSelectedCategory('timeTracking')} 
              className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === 'timeTracking' ? 'bg-game-purple text-white' : 'bg-game-darkPurple text-white/70'}`}
            >
              Controle de Horas
            </button>
            <button 
              onClick={() => setSelectedCategory('mission')} 
              className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === 'mission' ? 'bg-game-purple text-white' : 'bg-game-darkPurple text-white/70'}`}
            >
              Missões
            </button>
            <button 
              onClick={() => setSelectedCategory('other')} 
              className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === 'other' ? 'bg-game-purple text-white' : 'bg-game-darkPurple text-white/70'}`}
            >
              Outros
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => {
            const isEarned = userAchievementIds.includes(achievement.id);
            const earnedDetails = userAchievements.find((a: any) => a.achievementId === achievement.id);
            
            return (
              <div 
                key={achievement.id}
                className={`pixel-card ${!isEarned ? 'opacity-70' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Medal className={`w-10 h-10 ${isEarned ? 'text-game-yellow' : 'text-white/30'}`} />
                  <div className="bg-game-purple rounded-lg px-3 py-1 text-white text-sm font-pixel">
                    +{achievement.xpReward} XP
                  </div>
                </div>
                
                <h3 className="font-pixel text-white mb-2">{achievement.name}</h3>
                <p className="text-white/70 text-sm mb-3">{achievement.description}</p>
                
                {isEarned ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Clock className="w-3 h-3" />
                      <span>Conquistado em: {new Date(earnedDetails?.earnedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <Check className="w-5 h-5 text-game-green" />
                  </div>
                ) : (
                  <div className="text-white/50 text-xs">Não conquistado ainda</div>
                )}
                
                {achievement.badges && achievement.badges.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                    <span className="text-xs text-white/70">Insígnias:</span>
                    {achievement.badges.map(badge => (
                      <BadgeDisplay 
                        key={badge.id}
                        badge={badge}
                        size="sm"
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredAchievements.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Medal className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/70">Nenhuma conquista encontrada com os filtros selecionados</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Achievements;
