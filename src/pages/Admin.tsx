
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { achievements, getUserRankings } from '../services/dataService';
import { User, Check, Settings, AlertTriangle, XCircle, Award, FileText } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { getCurrentUser } from '../services/authService';
import { Input } from "@/components/ui/input";

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([]);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customXp, setCustomXp] = useState(10);
  
  const userRankings = getUserRankings();
  const currentAdmin = getCurrentUser();
  
  // Organized achievements by category
  const achievementsByCategory = {
    performance: achievements.filter(a => a.category === 'performance'),
    timeTracking: achievements.filter(a => a.category === 'timeTracking'),
    feedback: achievements.filter(a => a.category === 'feedback'),
    mission: achievements.filter(a => a.category === 'mission'),
    other: achievements.filter(a => a.category === 'other'),
  };
  
  // Toggle selection of an achievement
  const toggleAchievement = (achievementId: string) => {
    if (selectedAchievements.includes(achievementId)) {
      setSelectedAchievements(selectedAchievements.filter(id => id !== achievementId));
    } else {
      setSelectedAchievements([...selectedAchievements, achievementId]);
    }
  };
  
  // Handle achievement assignment
  const handleAssignAchievements = () => {
    if (!selectedUser) {
      toast({
        title: "Selecione um usuário",
        description: "Você precisa selecionar um usuário para atribuir conquistas."
      });
      return;
    }
    
    if (selectedAchievements.length === 0) {
      toast({
        title: "Selecione pelo menos uma conquista",
        description: "Você precisa selecionar pelo menos uma conquista para atribuir."
      });
      return;
    }
    
    const selectedUserName = userRankings.find(u => u.id === selectedUser)?.name;
    const achievementCount = selectedAchievements.length;
    
    toast({
      title: "Conquistas atribuídas com sucesso!",
      description: `${achievementCount} conquista${achievementCount > 1 ? 's' : ''} atribuída${achievementCount > 1 ? 's' : ''} para ${selectedUserName}.`
    });
    
    // Reset selections
    setSelectedAchievements([]);
  };
  
  const handleCreateCustom = () => {
    if (!customName || !customDescription) {
      toast({
        title: "Preencha todos os campos",
        description: "Nome e descrição são obrigatórios para criar uma conquista personalizada."
      });
      return;
    }
    
    if (!selectedUser) {
      toast({
        title: "Selecione um usuário",
        description: "Você precisa selecionar um usuário para atribuir a conquista."
      });
      return;
    }
    
    const selectedUserName = userRankings.find(u => u.id === selectedUser)?.name;
    
    // In a real app, this would create a new entry in the database
    toast({
      title: "Conquista personalizada atribuída!",
      description: `A conquista "${customName}" foi atribuída para ${selectedUserName}.`
    });
    
    // Reset form
    setCustomName('');
    setCustomDescription('');
    setCustomXp(10);
    setIsCreatingCustom(false);
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-4">Painel de Administração</h1>
        <p className="text-center text-muted-foreground mb-8">Atribua conquistas e gerencie o progresso dos usuários</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="pixel-card mb-6 animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Ações Administrativas</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="user-select" className="block mb-2 text-sm font-medium">
                    Selecionar Usuário
                  </label>
                  <select
                    id="user-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="bg-game-darkPurple border border-game-purple/30 text-white text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="">Escolha um usuário</option>
                    {userRankings.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.team}
                      </option>
                    ))}
                  </select>
                </div>
                
                {!isCreatingCustom ? (
                  <>
                    <div className="border border-game-purple/30 rounded-lg p-3 bg-game-darkPurple/30">
                      <p className="text-white/70 text-sm mb-1">Conquistas selecionadas:</p>
                      {selectedAchievements.length > 0 ? (
                        <ul className="space-y-1">
                          {selectedAchievements.map(id => {
                            const achievement = achievements.find(a => a.id === id);
                            return (
                              <li key={id} className="text-xs flex items-center gap-1">
                                <Check className="w-3 h-3 text-game-green" />
                                {achievement?.name}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="text-xs text-white/50">Nenhuma conquista selecionada</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleAssignAchievements}
                        disabled={!selectedUser || selectedAchievements.length === 0}
                        className={`pixel-button w-full ${!selectedUser || selectedAchievements.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Atribuir Conquistas
                      </button>
                      
                      <button
                        onClick={() => {
                          if (selectedUser) {
                            setIsCreatingCustom(true);
                          } else {
                            toast({
                              title: "Selecione um usuário",
                              description: "Você precisa selecionar um usuário para criar uma conquista personalizada."
                            });
                          }
                        }}
                        className={`pixel-button bg-game-darkPurple w-full ${!selectedUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Criar Reconhecimento Personalizado
                      </button>
                      
                      <button
                        onClick={() => setSelectedAchievements([])}
                        disabled={selectedAchievements.length === 0}
                        className={`pixel-button bg-game-darkPurple w-full ${selectedAchievements.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Limpar Seleções
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-game-purple/30 pb-2 mb-2">
                      <h3 className="font-pixel text-sm">Novo Reconhecimento</h3>
                      <button 
                        onClick={() => setIsCreatingCustom(false)}
                        className="text-white/60 hover:text-white"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="custom-name">
                        Nome do Reconhecimento
                      </label>
                      <Input 
                        id="custom-name"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="Ex: Colaborador do Mês"
                        className="border-game-purple"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="custom-description">
                        Descrição
                      </label>
                      <textarea
                        id="custom-description"
                        value={customDescription}
                        onChange={(e) => setCustomDescription(e.target.value)}
                        className="w-full h-20 rounded-md border border-game-purple bg-game-darkPurple/30 px-4 py-2 text-white"
                        placeholder="Descreva o reconhecimento..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="custom-xp">
                        XP a Conceder
                      </label>
                      <Input 
                        id="custom-xp"
                        type="number"
                        min={1}
                        value={customXp}
                        onChange={(e) => setCustomXp(parseInt(e.target.value) || 10)}
                        className="border-game-purple"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <button
                        onClick={handleCreateCustom}
                        disabled={!customName || !customDescription || !selectedUser}
                        className={`pixel-button w-full ${!customName || !customDescription || !selectedUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Criar e Atribuir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pixel-card animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Regras & Segurança</h2>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex gap-2 p-2 rounded-lg bg-game-darkPurple/30">
                  <XCircle className="w-4 h-4 text-game-red flex-shrink-0 mt-0.5" />
                  <p>Administradores não podem atribuir conquistas a si mesmos</p>
                </div>
                
                <div className="flex gap-2 p-2 rounded-lg bg-game-darkPurple/30">
                  <XCircle className="w-4 h-4 text-game-red flex-shrink-0 mt-0.5" />
                  <p>Conquistas automáticas não podem ser atribuídas manualmente</p>
                </div>
                
                <div className="flex gap-2 p-2 rounded-lg bg-game-darkPurple/30">
                  <XCircle className="w-4 h-4 text-game-red flex-shrink-0 mt-0.5" />
                  <p>Todas as atribuições são registradas com data e IP para auditoria</p>
                </div>
                
                <div className="flex gap-2 p-2 rounded-lg bg-game-darkPurple/30">
                  <XCircle className="w-4 h-4 text-game-red flex-shrink-0 mt-0.5" />
                  <p>Múltiplas atribuições idênticas serão sinalizadas para verificação</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="pixel-card animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Conquistas Disponíveis</h2>
                <div className="ml-auto text-xs text-white/50">
                  {currentAdmin && (
                    <span>Admin: {currentAdmin.name}</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
                  <div key={category}>
                    <h3 className="font-pixel mb-3 text-white/90">
                      {category === 'performance' && 'Performance'}
                      {category === 'timeTracking' && 'Controle de Horas'}
                      {category === 'feedback' && 'Feedback'}
                      {category === 'mission' && 'Missões'}
                      {category === 'other' && 'Outros'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryAchievements.map(achievement => {
                        const isSelected = selectedAchievements.includes(achievement.id);
                        
                        return (
                          <div 
                            key={achievement.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-colors
                              ${isSelected 
                                ? 'bg-game-purple/40 border-game-purple' 
                                : 'bg-game-darkPurple/40 border-white/10 hover:border-white/30'}`}
                            onClick={() => toggleAchievement(achievement.id)}
                          >
                            <div className="flex justify-between">
                              <h4 className="font-medium">{achievement.name}</h4>
                              {isSelected && <Check className="w-5 h-5 text-game-green" />}
                            </div>
                            <p className="text-sm text-white/70 mt-1">{achievement.description}</p>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-white/50">
                                {achievement.requiresApproval 
                                  ? 'Requer aprovação' 
                                  : 'Aprovação automática'}
                              </div>
                              <div className="text-xs font-pixel text-game-yellow">
                                +{achievement.xpReward} XP
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
