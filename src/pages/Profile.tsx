
import React from 'react';
import Navigation from '../components/Navigation';
import BadgeDisplay from '../components/BadgeDisplay';
import { mockCurrentUser, getUserBadges, getUserAchievements } from '../services/dataService';
import { User, Calendar, Award } from 'lucide-react';

const Profile = () => {
  const userBadges = getUserBadges(mockCurrentUser.id);
  const userAchievements = getUserAchievements(mockCurrentUser.id);
  
  // Format the join date
  const joinDate = new Date(mockCurrentUser.joinedAt).toLocaleDateString('pt-BR');
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Meu Perfil</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="pixel-card mb-6 animate-pixel-fade-in">
              <div className="flex flex-col items-center">
                <div className="bg-game-darkPurple rounded-full w-32 h-32 flex items-center justify-center border-4 border-game-lightPurple mb-4">
                  <User className="w-16 h-16 text-game-lightPurple" />
                </div>
                
                <h2 className="text-xl text-center mb-2">{mockCurrentUser.name}</h2>
                <p className="text-muted-foreground mb-4">{mockCurrentUser.email}</p>
                
                <div className="w-full grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-game-darkPurple rounded-lg p-3 text-center">
                    <p className="text-white/70 text-sm">XP Total</p>
                    <p className="text-white font-pixel text-xl">{mockCurrentUser.totalXp}</p>
                  </div>
                  
                  <div className="bg-game-darkPurple rounded-lg p-3 text-center">
                    <p className="text-white/70 text-sm">Pontos</p>
                    <p className="text-game-yellow font-pixel text-xl">{mockCurrentUser.availablePoints}</p>
                  </div>
                </div>
                
                <div className="w-full mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <p className="text-sm">Entrou em: {joinDate}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <p className="text-sm">Time: {mockCurrentUser.team === "team1" ? "Frontend" : mockCurrentUser.team}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pixel-card animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Minhas Insígnias</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {userBadges.map((badge) => (
                  <BadgeDisplay 
                    key={badge.id}
                    badge={badge}
                    size="md"
                    showDetails={true}
                    earnedAt={badge.earnedAt}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="pixel-card h-full animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Conquistas Desbloqueadas</h2>
              </div>
              
              {userAchievements.map((achievement: any) => (
                <div 
                  key={achievement.id}
                  className="border border-game-purple/30 rounded-md p-4 mb-4 bg-game-darkPurple/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-pixel text-white">{achievement.name}</h3>
                      <p className="text-sm text-white/70 mb-2">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Conquistado em: {new Date(achievement.earnedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="bg-game-purple rounded-full px-3 py-1 text-white text-sm font-pixel">
                      +{achievement.xpReward} XP
                    </div>
                  </div>
                </div>
              ))}
              
              {userAchievements.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Você ainda não tem conquistas desbloqueadas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Add missing import
const Users = () => <span>Users</span>;

export default Profile;
