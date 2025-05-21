
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Trophy, Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { monthlyPassLevels as initialLevels } from '../mocks/monthlyPassMocks';
import { toast } from '@/components/ui/use-toast';
import { MonthlyPassLevel } from '../types';

const MarketingPass = () => {
  const [passLevels, setPassLevels] = useState<MonthlyPassLevel[]>(initialLevels);
  const [isAddingLevel, setIsAddingLevel] = useState(false);
  const [isEditingLevel, setIsEditingLevel] = useState<number | null>(null);
  
  const [levelNumber, setLevelNumber] = useState(0);
  const [xpRequired, setXpRequired] = useState(0);
  const [rewardType, setRewardType] = useState<"item" | "money" | "badge">("item");
  const [rewardValue, setRewardValue] = useState<string | number>("");
  const [rewardName, setRewardName] = useState('');
  const [rewardDescription, setRewardDescription] = useState('');
  const [rewardImage, setRewardImage] = useState('/placeholder.svg');

  const resetForm = () => {
    setLevelNumber(passLevels.length + 1);
    setXpRequired(0);
    setRewardType("item");
    setRewardValue("");
    setRewardName('');
    setRewardDescription('');
    setRewardImage('/placeholder.svg');
  };

  const handleAddLevel = () => {
    if (!rewardName || !rewardDescription) {
      toast({
        title: "Erro ao adicionar nível",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newLevel: MonthlyPassLevel = {
      level: levelNumber,
      xpRequired: xpRequired,
      reward: {
        type: rewardType,
        value: rewardValue,
        name: rewardName,
        description: rewardDescription,
        imageUrl: rewardImage
      }
    };

    setPassLevels([...passLevels, newLevel].sort((a, b) => a.level - b.level));
    resetForm();
    setIsAddingLevel(false);

    toast({
      title: "Nível adicionado com sucesso!",
      description: `O nível ${levelNumber} foi adicionado ao passe mensal.`
    });
  };

  const handleEditLevel = () => {
    if (isEditingLevel === null || !rewardName || !rewardDescription) {
      toast({
        title: "Erro ao editar nível",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const updatedLevels = passLevels.map(level => 
      level.level === isEditingLevel 
        ? {
            level: levelNumber,
            xpRequired: xpRequired,
            reward: {
              type: rewardType,
              value: rewardValue,
              name: rewardName,
              description: rewardDescription,
              imageUrl: rewardImage
            }
          }
        : level
    ).sort((a, b) => a.level - b.level);

    setPassLevels(updatedLevels);
    resetForm();
    setIsEditingLevel(null);

    toast({
      title: "Nível atualizado com sucesso!",
      description: `O nível ${levelNumber} foi atualizado.`
    });
  };

  const startEditingLevel = (level: MonthlyPassLevel) => {
    setLevelNumber(level.level);
    setXpRequired(level.xpRequired);
    setRewardType(level.reward.type);
    setRewardValue(level.reward.value);
    setRewardName(level.reward.name);
    setRewardDescription(level.reward.description);
    setRewardImage(level.reward.imageUrl || '/placeholder.svg');
    setIsEditingLevel(level.level);
  };

  const handleDeleteLevel = (levelNum: number) => {
    if (confirm('Tem certeza que deseja excluir este nível?')) {
      const updatedLevels = passLevels.filter(level => level.level !== levelNum);
      setPassLevels(updatedLevels);
      
      toast({
        title: "Nível excluído com sucesso!",
        description: `O nível ${levelNum} foi removido do passe mensal.`
      });
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-4">Gerenciamento do Passe Mensal</h1>
        <p className="text-center text-muted-foreground mb-8">
          Configure os níveis e recompensas do passe mensal
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="pixel-card animate-pixel-fade-in">
              {!isAddingLevel && isEditingLevel === null ? (
                <div className="text-center py-6">
                  <Trophy className="w-12 h-12 text-game-purple mx-auto mb-4" />
                  <h2 className="text-lg mb-2">Gerenciar Passe</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Adicione novos níveis ao passe mensal ou edite os existentes
                  </p>
                  <button
                    onClick={() => {
                      setLevelNumber(passLevels.length + 1);
                      setIsAddingLevel(true);
                    }}
                    className="pixel-button flex items-center justify-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" /> Novo Nível
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-pixel">
                      {isAddingLevel ? "Adicionar Nível" : "Editar Nível"}
                    </h2>
                    <button 
                      onClick={() => {
                        resetForm();
                        setIsAddingLevel(false);
                        setIsEditingLevel(null);
                      }}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1" htmlFor="level-number">
                          Nível *
                        </label>
                        <Input 
                          id="level-number"
                          type="number"
                          min={1}
                          value={levelNumber}
                          onChange={(e) => setLevelNumber(parseInt(e.target.value) || 1)}
                          className="border-game-purple"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm mb-1" htmlFor="xp-required">
                          XP Necessário *
                        </label>
                        <Input 
                          id="xp-required"
                          type="number"
                          min={0}
                          value={xpRequired}
                          onChange={(e) => setXpRequired(parseInt(e.target.value) || 0)}
                          className="border-game-purple"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="reward-type">
                        Tipo de Recompensa
                      </label>
                      <select
                        id="reward-type"
                        value={rewardType}
                        onChange={(e) => setRewardType(e.target.value as any)}
                        className="w-full h-10 rounded-md border border-game-purple bg-game-darkPurple/30 px-3 text-white"
                      >
                        <option value="item">Item Físico</option>
                        <option value="money">Pontos</option>
                        <option value="badge">Emblema</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="reward-value">
                        Valor da Recompensa {rewardType === "money" ? "(pontos)" : ""}
                      </label>
                      <Input 
                        id="reward-value"
                        type={rewardType === "money" ? "number" : "text"}
                        value={rewardValue}
                        onChange={(e) => setRewardValue(rewardType === "money" ? parseInt(e.target.value) || 0 : e.target.value)}
                        className="border-game-purple"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="reward-name">
                        Nome da Recompensa *
                      </label>
                      <Input 
                        id="reward-name"
                        value={rewardName}
                        onChange={(e) => setRewardName(e.target.value)}
                        className="border-game-purple"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="reward-description">
                        Descrição *
                      </label>
                      <textarea
                        id="reward-description"
                        value={rewardDescription}
                        onChange={(e) => setRewardDescription(e.target.value)}
                        className="w-full h-20 rounded-md border border-game-purple bg-game-darkPurple/30 px-4 py-2 text-white"
                        placeholder="Descreva a recompensa..."
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="reward-image">
                        Imagem URL
                      </label>
                      <Input 
                        id="reward-image"
                        value={rewardImage}
                        onChange={(e) => setRewardImage(e.target.value)}
                        placeholder="URL da imagem"
                        className="border-game-purple"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        onClick={isAddingLevel ? handleAddLevel : handleEditLevel}
                        className="pixel-button w-full flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" /> 
                        {isAddingLevel ? "Adicionar Nível" : "Salvar Alterações"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="pixel-card animate-pixel-fade-in">
              <h2 className="text-lg font-pixel mb-4">Níveis do Passe Mensal</h2>
              
              <div className="space-y-4">
                {passLevels.map((level) => (
                  <div 
                    key={level.level} 
                    className="border rounded-md overflow-hidden border-white/10 hover:border-white/30"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-game-purple flex items-center justify-center">
                            <span className="text-sm font-medium">{level.level}</span>
                          </div>
                          <h3 className="font-medium">{level.reward.name}</h3>
                        </div>
                        <span className="text-sm text-game-yellow font-pixel">{level.xpRequired} XP</span>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-game-darkPurple rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img 
                            src={level.reward.imageUrl || '/placeholder.svg'} 
                            alt={level.reward.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-white/80">{level.reward.description}</p>
                          <p className="text-xs text-white/50 mt-1">
                            {level.reward.type === "money" ? `${level.reward.value} pontos` : 
                             level.reward.type === "badge" ? "Emblema" : "Item Físico"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => startEditingLevel(level)}
                          className="p-1.5 rounded bg-game-darkPurple/50 text-white/70 hover:text-white hover:bg-game-darkPurple/80 transition-colors"
                          disabled={isAddingLevel || isEditingLevel !== null}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLevel(level.level)}
                          className="p-1.5 rounded bg-game-red/20 text-white/70 hover:text-white hover:bg-game-red/40 transition-colors"
                          disabled={isAddingLevel || isEditingLevel !== null}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {passLevels.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-white/20 rounded-md">
                    <Trophy className="w-10 h-10 text-white/20 mx-auto mb-2" />
                    <p className="text-white/50">Nenhum nível configurado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketingPass;
