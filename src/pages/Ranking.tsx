import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { getUserRankings, getTeamRankings } from '../services/dataService';
import { Users, User, Trophy, Medal } from 'lucide-react';
import BadgeDisplay from '../components/BadgeDisplay';
import { Badge, BadgeLevel } from '../types';

const Ranking = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'teams'>('individual');
  const userRankings = getUserRankings();
  const teams = getTeamRankings();
  
  // Create temporary badges for the top 3 players
  const topPlayerBadges: Badge[] = [
    { id: 'top1', name: 'Primeiro Lugar', description: 'Top 1 no ranking', level: BadgeLevel.Gold },
    { id: 'top2', name: 'Segundo Lugar', description: 'Top 2 no ranking', level: BadgeLevel.Silver },
    { id: 'top3', name: 'Terceiro Lugar', description: 'Top 3 no ranking', level: BadgeLevel.Bronze },
  ];
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Rankings</h1>
        
        <div className="flex justify-center mb-6">
          <div className="bg-game-darkPurple rounded-full p-1 inline-flex">
            <button 
              className={`px-4 py-1 rounded-full text-sm ${activeTab === 'individual' ? 'bg-game-purple text-white' : 'text-white/70'}`}
              onClick={() => setActiveTab('individual')}
            >
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Individual
              </span>
            </button>
            <button 
              className={`px-4 py-1 rounded-full text-sm ${activeTab === 'teams' ? 'bg-game-purple text-white' : 'text-white/70'}`}
              onClick={() => setActiveTab('teams')}
            >
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Times
              </span>
            </button>
          </div>
        </div>
        
        {activeTab === 'individual' && (
          <div className="animate-pixel-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {userRankings.slice(0, 3).map((user, index) => (
                <div key={user.id} className="pixel-card bg-gradient-to-b from-game-purple to-game-darkPurple text-center">
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <BadgeDisplay badge={topPlayerBadges[index]} size="lg" />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-2">
                    <div className="bg-game-darkPurple rounded-full w-20 h-20 flex items-center justify-center border-4 border-game-lightPurple mx-auto mb-3">
                      <User className="w-10 h-10 text-game-lightPurple" />
                    </div>
                    
                    <h3 className="font-pixel text-white mb-1">{user.name}</h3>
                    <p className="text-white/70 text-sm">{user.team}</p>
                    
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Trophy className="w-5 h-5 text-game-yellow" />
                      <p className="font-pixel text-game-yellow text-xl">{user.totalXp}</p>
                    </div>
                    
                    <p className="bg-game-darkPurple/50 rounded-full px-3 py-1 text-white/70 text-sm inline-block mt-3">
                      #{index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pixel-card">
              <h2 className="text-center mb-4">Todos os Jogadores</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-game-darkPurple">
                    <tr>
                      <th className="px-4 py-3 text-left">Posição</th>
                      <th className="px-4 py-3 text-left">Usuário</th>
                      <th className="px-4 py-3 text-left">Time</th>
                      <th className="px-4 py-3 text-right">XP Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRankings.map((user, index) => (
                      <tr 
                        key={user.id}
                        className={`border-b border-white/10 ${index < 3 ? 'bg-game-darkPurple/30' : ''}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {index < 3 ? (
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                index === 0 ? 'bg-badge-gold text-game-darkPurple' :
                                index === 1 ? 'bg-badge-silver text-game-darkPurple' :
                                'bg-badge-bronze text-game-darkPurple'
                              }`}>
                                {index + 1}
                              </div>
                            ) : (
                              <div className="text-white/70 font-pixel">
                                {index + 1}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-white/70" />
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white/70">{user.team}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="font-pixel text-game-yellow flex items-center gap-1 justify-end">
                            <Trophy className="w-4 h-4" />
                            {user.totalXp}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'teams' && (
          <div className="animate-pixel-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.sort((a, b) => b.totalXp - a.totalXp).map((team, index) => (
                <div 
                  key={team.id} 
                  className={`pixel-card ${index < 3 ? 'border-2 border-game-lightPurple' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {index < 3 && (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-badge-gold text-game-darkPurple' :
                        index === 1 ? 'bg-badge-silver text-game-darkPurple' :
                        'bg-badge-bronze text-game-darkPurple'
                      }`}>
                        <Trophy className="w-6 h-6" />
                      </div>
                    )}
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-pixel">{team.name}</h3>
                        <span className="text-white/50 text-sm">#{index + 1}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="w-4 h-4 text-white/50" />
                        <span className="text-white/50 text-sm">
                          {team.members.length} {team.members.length === 1 ? 'membro' : 'membros'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="ml-auto">
                      <div className="font-pixel text-game-yellow text-xl flex items-center gap-1">
                        <Trophy className="w-5 h-5" />
                        {team.totalXp}
                      </div>
                    </div>
                  </div>
                  
                  {index < 3 && (
                    <div className="mt-4 flex justify-center">
                      <Medal className={`w-8 h-8 ${
                        index === 0 ? 'text-badge-gold' :
                        index === 1 ? 'text-badge-silver' :
                        'text-badge-bronze'
                      } animate-pixel-bounce`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Ranking;
