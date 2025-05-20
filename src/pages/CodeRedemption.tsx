
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Code, Check } from 'lucide-react';
import Navigation from '../components/Navigation';
import { isAuthenticated } from '../services/authService';
import { redeemCode, getCodeRedemptionEvents } from '../services/dataService';

const CodeRedemption = () => {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoggedIn = isAuthenticated();
  const events = getCodeRedemptionEvents();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("Acesso negado", {
        description: "Você precisa estar logado para resgatar códigos."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      const result = redeemCode(code);
      
      if (result) {
        toast.success("Código resgatado com sucesso!", {
          description: `Você ganhou ${result.xpReward} XP e ${result.pointsReward} pontos.`
        });
        setCode('');
      } else {
        toast.error("Código inválido", {
          description: "O código informado não é válido ou já foi utilizado."
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Resgate de Códigos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Redemption Form */}
          <div className="pixel-card animate-pixel-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-game-yellow" />
              <h2>Resgatar Código</h2>
            </div>
            
            <p className="text-white/70 mb-6">
              Insira o código fornecido pelos organizadores de eventos para resgatar 
              suas recompensas de XP e pontos.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="code" className="block font-pixel text-sm mb-2">
                  Código do Evento
                </label>
                <input
                  type="text"
                  id="code"
                  className="w-full px-4 py-3 bg-game-darkPurple rounded-lg border border-game-purple focus:border-game-lightPurple focus:ring-1 focus:ring-game-lightPurple transition-colors"
                  placeholder="Digite o código aqui"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="pixel-button w-full"
                disabled={isSubmitting || !isLoggedIn}
              >
                {isSubmitting ? 'Processando...' : 'Resgatar'}
              </button>
              
              {!isLoggedIn && (
                <p className="mt-4 text-game-red text-sm">
                  Você precisa estar logado para resgatar códigos.
                </p>
              )}
            </form>
          </div>
          
          {/* Recent Events */}
          <div className="pixel-card animate-pixel-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Check className="w-6 h-6 text-game-green" />
              <h2>Eventos Recentes</h2>
            </div>
            
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="bg-game-darkPurple p-4 rounded-lg">
                  <h3 className="font-pixel mb-1">{event.name}</h3>
                  <p className="text-sm text-white/70 mb-2">{event.description}</p>
                  <div className="flex justify-between items-center text-xs text-white/50">
                    <span>Recompensa: {event.xpReward} XP, {event.pointsReward} pontos</span>
                    <span className={event.isActive ? 'text-game-green' : 'text-game-red'}>
                      {event.isActive ? 'Ativo' : 'Encerrado'}
                    </span>
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="text-center py-6 text-white/50">
                  Nenhum evento recente disponível.
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
