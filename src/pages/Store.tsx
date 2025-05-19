
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { mockCurrentUser, storeItems } from '../services/dataService';
import { ShoppingCart, Tag, Gift, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { isAuthenticated } from '../services/authService';

type ItemCategory = 'all' | 'apparel' | 'accessory' | 'other';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('all');
  const isLoggedIn = isAuthenticated();
  
  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? storeItems 
    : storeItems.filter(item => item.category === selectedCategory);
  
  // Handle item purchase
  const handlePurchase = (item: typeof storeItems[0]) => {
    if (!isLoggedIn) {
      toast.error("Acesso negado", {
        description: "Você precisa estar logado para comprar itens."
      });
      return;
    }
    
    if (mockCurrentUser.availablePoints < item.price) {
      toast.error("Pontos insuficientes", {
        description: `Você precisa de mais ${item.price - mockCurrentUser.availablePoints} pontos para comprar este item.`
      });
      return;
    }
    
    if (item.stock <= 0) {
      toast.error("Item esgotado", {
        description: "Este item está fora de estoque no momento."
      });
      return;
    }
    
    toast.success("Item comprado com sucesso!", {
      description: "Sua solicitação foi registrada e será processada em breve."
    });
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Loja de Recompensas</h1>
        
        {isLoggedIn && (
          <div className="pixel-card mb-8 animate-pixel-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Coins className="w-8 h-8 text-game-yellow" />
                <div>
                  <p className="text-white/70">Seus Pontos</p>
                  <p className="font-pixel text-game-yellow text-2xl">{mockCurrentUser.availablePoints}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedCategory('all')} 
                  className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'all' ? 'bg-game-purple text-white' : 'bg-game-darkPurple/50 text-white/70'}`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setSelectedCategory('apparel')} 
                  className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'apparel' ? 'bg-game-purple text-white' : 'bg-game-darkPurple/50 text-white/70'}`}
                >
                  Vestuário
                </button>
                <button 
                  onClick={() => setSelectedCategory('accessory')} 
                  className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'accessory' ? 'bg-game-purple text-white' : 'bg-game-darkPurple/50 text-white/70'}`}
                >
                  Acessórios
                </button>
                <button 
                  onClick={() => setSelectedCategory('other')} 
                  className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'other' ? 'bg-game-purple text-white' : 'bg-game-darkPurple/50 text-white/70'}`}
                >
                  Outros
                </button>
              </div>
            </div>
          </div>
        )}
        
        {!isLoggedIn && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => setSelectedCategory('all')} 
              className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'all' ? 'bg-game-purple text-white' : 'bg-game-darkPurple/50 text-white/70'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setSelectedCategory('apparel')} 
              className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'apparel' ? 'bg-game-purple text-white' : 'bg-game-darkPurple/50 text-white/70'}`}
            >
              Vestuário
            </button>
            <button 
              onClick={() => setSelectedCategory('accessory')} 
              className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'accessory' ? 'bg-game-purple text-white' : 'bg-game-darkPurple/50 text-white/70'}`}
            >
              Acessórios
            </button>
            <button 
              onClick={() => setSelectedCategory('other')} 
              className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'other' ? 'bg-game-purple text-white' : 'bg-game-darkPurple/50 text-white/70'}`}
            >
              Outros
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pixel-fade-in">
          {filteredItems.map((item) => {
            const canAfford = isLoggedIn && mockCurrentUser.availablePoints >= item.price;
            const inStock = item.stock > 0;
            
            return (
              <div 
                key={item.id} 
                className={`pixel-card ${(!canAfford || !inStock) && isLoggedIn ? 'opacity-70' : ''}`}
              >
                <div className="aspect-square bg-game-darkPurple rounded-md mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>
                
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-pixel">{item.name}</h3>
                  <div className="bg-game-yellow rounded-full px-3 py-1 text-game-darkPurple text-sm font-pixel flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    {item.price}
                  </div>
                </div>
                
                <p className="text-sm text-white/70 mb-3">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4 text-white/50" />
                    <span className="text-xs text-white/50">
                      {item.stock > 0 ? `${item.stock} disponíveis` : 'Esgotado'}
                    </span>
                  </div>
                  
                  <button 
                    className={`pixel-button text-xs py-1 ${(!isLoggedIn || !canAfford || !inStock) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePurchase(item)}
                    disabled={!isLoggedIn || !canAfford || !inStock}
                  >
                    <span className="flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      {!isLoggedIn ? 'Login Necessário' : !canAfford ? 'Insuficiente' : !inStock ? 'Esgotado' : 'Comprar'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
          
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12">
              <ShoppingCart className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/70">Nenhum item encontrado nesta categoria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Store;
