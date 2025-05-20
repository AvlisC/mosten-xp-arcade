
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { redeemCode, getCodeRedemptionEvents } from '../services/dataService';
import { Gift, Check, X, Code, Send } from 'lucide-react';
import { toast } from 'sonner';

const CodeRedemption = () => {
  const [code, setCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const redemptionEvents = getCodeRedemptionEvents();

  const handleRedeemCode = () => {
    if (!code.trim()) {
      toast.error("Código inválido", {
        description: "Por favor, insira um código válido."
      });
      return;
    }

    setIsRedeeming(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const result = redeemCode(code);
      
      if (result) {
        toast.success("Código resgatado com sucesso!", {
          description: `Você ganhou ${result.reward.xpReward} XP e ${result.reward.pointsReward} pontos.`
        });
        setCode('');
      } else {
        toast.error("Código inválido", {
          description: "Este código não existe ou já expirou."
        });
      }
      
      setIsRedeeming(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Resgate de Código</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code redemption form */}
          <div className="lg:col-span-1">
            <div className="pixel-card mb-6 animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Resgate seu código</h2>
              </div>
              
              <p className="text-white/70 mb-4">
                Insira o código de evento que você recebeu para resgatar sua recompensa.
              </p>
              
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-game-darkPurple/80 border border-game-purple/30 rounded-md text-white placeholder:text-white/30"
                    placeholder="Insira o código"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    disabled={isRedeeming}
                  />
                  {code && (
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                      onClick={() => setCode('')}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  className={`pixel-button ${isRedeeming ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleRedeemCode}
                  disabled={isRedeeming}
                >
                  <span className="flex items-center gap-1">
                    <Send className="w-4 h-4" />
                    Resgatar
                  </span>
                </button>
              </div>
            </div>
            
            <div className="pixel-card animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Como funciona?</h2>
              </div>
              
              <ol className="list-decimal list-inside space-y-2 text-white/70">
                <li>Participe dos eventos da empresa</li>
                <li>Receba um código exclusivo do evento</li>
                <li>Insira o código nesta página</li>
                <li>Ganhe XP e pontos para trocar na loja</li>
              </ol>
            </div>
          </div>
          
          {/* Recent events */}
          <div className="lg:col-span-2">
            <div className="pixel-card h-full animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Eventos Recentes</h2>
              </div>
              
              {redemptionEvents.map((event) => (
                <div
                  key={event.id}
                  className={`border border-game-purple/30 rounded-md p-4 mb-4 ${
                    event.isActive ? 'bg-game-darkPurple/50' : 'bg-game-darkPurple/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-pixel text-white">{event.name}</h3>
                        {event.isActive ? (
                          <span className="bg-game-green/20 text-game-green text-xs px-2 py-0.5 rounded-full">
                            Ativo
                          </span>
                        ) : (
                          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">
                            Encerrado
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/70 mb-2">{event.description}</p>
                      <p className="text-xs text-white/50">
                        Válido até: {event.validUntil}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-game-purple/30 rounded-lg px-3 py-1 text-white text-sm">
                        <span className="flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          +{event.reward.pointsReward} pontos
                        </span>
                      </div>
                      <div className="bg-game-yellow/20 rounded-lg px-3 py-1 text-game-yellow text-sm">
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          +{event.reward.xpReward} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {redemptionEvents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-white/50">Não há eventos disponíveis no momento.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeRedemption;
