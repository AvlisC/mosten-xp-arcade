import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { ShoppingBag, Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { storeItems as initialItems } from '../mocks/storeMocks';
import { toast } from '@/components/ui/use-toast';
import { StoreItem } from '../types';

const MarketingStore = () => {
  const [storeItems, setStoreItems] = useState<StoreItem[]>(initialItems);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState<string | null>(null);

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemImage, setItemImage] = useState('/placeholder.svg');
  const [itemCategory, setItemCategory] = useState<
    'apparel' | 'accessory' | 'digital' | 'other'
  >('apparel');
  const [itemStock, setItemStock] = useState(0);

  const resetForm = () => {
    setItemName('');
    setItemDescription('');
    setItemPrice(0);
    setItemImage('/placeholder.svg');
    setItemCategory('apparel');
    setItemStock(0);
  };

  const handleAddItem = () => {
    if (!itemName || !itemDescription) {
      toast({
        title: 'Erro ao adicionar item',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const newItem: StoreItem = {
      id: `item${Date.now()}`,
      name: itemName,
      description: itemDescription,
      price: itemPrice,
      imageUrl: itemImage,
      category: itemCategory,
      stock: itemStock,
    };

    setStoreItems([...storeItems, newItem]);
    resetForm();
    setIsAddingItem(false);

    toast({
      title: 'Item adicionado com sucesso!',
      description: `O item "${itemName}" foi adicionado à loja.`,
    });
  };

  const handleEditItem = () => {
    if (!isEditingItem || !itemName || !itemDescription) {
      toast({
        title: 'Erro ao editar item',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const updatedItems = storeItems.map((item) =>
      item.id === isEditingItem
        ? {
            ...item,
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            imageUrl: itemImage,
            category: itemCategory,
            stock: itemStock,
          }
        : item
    );

    setStoreItems(updatedItems);
    resetForm();
    setIsEditingItem(null);

    toast({
      title: 'Item atualizado com sucesso!',
      description: `O item "${itemName}" foi atualizado.`,
    });
  };

  const startEditingItem = (item: StoreItem) => {
    setItemName(item.name);
    setItemDescription(item.description);
    setItemPrice(item.price);
    setItemImage(item.imageUrl);
    setItemCategory(item.category);
    setItemStock(item.stock);
    setIsEditingItem(item.id);
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      const updatedItems = storeItems.filter((item) => item.id !== itemId);
      setStoreItems(updatedItems);

      toast({
        title: 'Item excluído com sucesso!',
        description: 'O item foi removido da loja.',
      });
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />

      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-4">Gerenciamento da Loja</h1>
        <p className="text-center text-muted-foreground mb-8">
          Adicione, edite e remova itens da loja
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="pixel-card animate-pixel-fade-in">
              {!isAddingItem && !isEditingItem ? (
                <div className="text-center py-6">
                  <ShoppingBag className="w-12 h-12 text-game-purple mx-auto mb-4" />
                  <h2 className="text-lg mb-2">Gerenciar Itens</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Adicione novos itens à loja ou edite os existentes
                  </p>
                  <button
                    onClick={() => setIsAddingItem(true)}
                    className="pixel-button flex items-center justify-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" /> Novo Item
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-pixel">
                      {isAddingItem ? 'Adicionar Item' : 'Editar Item'}
                    </h2>
                    <button
                      onClick={() => {
                        resetForm();
                        setIsAddingItem(false);
                        setIsEditingItem(null);
                      }}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1" htmlFor="item-name">
                        Nome do Item *
                      </label>
                      <Input
                        id="item-name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Ex: Camiseta Motiva"
                        className="border-game-purple"
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-1"
                        htmlFor="item-description"
                      >
                        Descrição *
                      </label>
                      <textarea
                        id="item-description"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        className="w-full h-24 rounded-md border border-game-purple bg-game-darkPurple/30 px-4 py-2 text-white"
                        placeholder="Descreva o item..."
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-1"
                        htmlFor="item-price"
                      >
                        Preço (pontos) *
                      </label>
                      <Input
                        id="item-price"
                        type="number"
                        min={0}
                        value={itemPrice}
                        onChange={(e) =>
                          setItemPrice(parseInt(e.target.value) || 0)
                        }
                        className="border-game-purple"
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-1"
                        htmlFor="item-image"
                      >
                        Imagem URL
                      </label>
                      <Input
                        id="item-image"
                        value={itemImage}
                        onChange={(e) => setItemImage(e.target.value)}
                        placeholder="URL da imagem"
                        className="border-game-purple"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-1"
                        htmlFor="item-category"
                      >
                        Categoria
                      </label>
                      <select
                        id="item-category"
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value as any)}
                        className="w-full h-10 rounded-md border border-game-purple bg-game-darkPurple/30 px-3 text-white"
                      >
                        <option value="apparel">Vestuário</option>
                        <option value="accessory">Acessório</option>
                        <option value="digital">Item Digital</option>
                        <option value="other">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-1"
                        htmlFor="item-stock"
                      >
                        Estoque
                      </label>
                      <Input
                        id="item-stock"
                        type="number"
                        min={0}
                        value={itemStock}
                        onChange={(e) =>
                          setItemStock(parseInt(e.target.value) || 0)
                        }
                        className="border-game-purple"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={isAddingItem ? handleAddItem : handleEditItem}
                        className="pixel-button w-full flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        {isAddingItem ? 'Adicionar Item' : 'Salvar Alterações'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="pixel-card animate-pixel-fade-in">
              <h2 className="text-lg font-pixel mb-4">Itens da Loja</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storeItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-md overflow-hidden border-white/10 hover:border-white/30"
                  >
                    <div className="p-4">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-game-darkPurple rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-white/70 line-clamp-1">
                            {item.description}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs font-pixel text-game-yellow">
                              {item.price} pontos
                            </span>
                            <span className="text-xs text-white/50">
                              Estoque: {item.stock}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => startEditingItem(item)}
                          className="p-1.5 rounded bg-game-darkPurple/50 text-white/70 hover:text-white hover:bg-game-darkPurple/80 transition-colors"
                          disabled={isAddingItem || isEditingItem !== null}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 rounded bg-game-red/20 text-white/70 hover:text-white hover:bg-game-red/40 transition-colors"
                          disabled={isAddingItem || isEditingItem !== null}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {storeItems.length === 0 && (
                  <div className="col-span-full text-center py-8 border border-dashed border-white/20 rounded-md">
                    <ShoppingBag className="w-10 h-10 text-white/20 mx-auto mb-2" />
                    <p className="text-white/50">Nenhum item na loja</p>
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

export default MarketingStore;
