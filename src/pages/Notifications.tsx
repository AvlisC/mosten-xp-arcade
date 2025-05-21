
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Bell, CheckCheck } from 'lucide-react';
import { notifications } from '../mocks/feedbackMocks';
import { toast } from '@/components/ui/use-toast';

const Notifications = () => {
  const [notificationsList, setNotificationsList] = useState(notifications);
  
  const markAllAsRead = () => {
    const updatedNotifications = notificationsList.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotificationsList(updatedNotifications);
    
    toast({
      title: "Notificações lidas",
      description: "Todas as notificações foram marcadas como lidas."
    });
  };
  
  const markAsRead = (id: string) => {
    const updatedNotifications = notificationsList.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotificationsList(updatedNotifications);
  };
  
  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <div className="w-3 h-3 rounded-full bg-game-green"></div>;
      case 'reminder':
        return <div className="w-3 h-3 rounded-full bg-game-yellow"></div>;
      case 'store':
        return <div className="w-3 h-3 rounded-full bg-game-purple"></div>;
      case 'monthlyPass':
        return <div className="w-3 h-3 rounded-full bg-game-lightPurple"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-white"></div>;
    }
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-4">Notificações</h1>
        <p className="text-center text-muted-foreground mb-8">
          Acompanhe atualizações, lembretes e conquistas
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="pixel-card animate-pixel-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-game-yellow" />
                <h2 className="text-lg">Suas Notificações</h2>
              </div>
              
              <button 
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs text-game-lightPurple hover:underline"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Marcar todas como lidas</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {notificationsList.length > 0 ? (
                notificationsList.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 border rounded-md transition-colors cursor-pointer ${
                      notification.read 
                        ? 'border-white/10 hover:border-white/20' 
                        : 'border-game-purple/50 bg-game-purple/5 hover:bg-game-purple/10'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {getNotificationTypeIcon(notification.type)}
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <h3 className={`text-sm font-medium ${notification.read ? 'text-white/90' : 'text-white'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-white/50">
                            {new Date(notification.date).toLocaleString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${notification.read ? 'text-white/70' : 'text-white/90'}`}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bell className="w-10 h-10 text-white/20 mx-auto mb-2" />
                  <p className="text-white/50">Você não possui notificações</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10 text-xs text-white/50">
              <span>Mostrando {notificationsList.length} notificações</span>
              <span>As notificações são excluídas após 30 dias</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
