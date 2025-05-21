
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { notifications } from '../../mocks/feedbackMocks';

const NotificationsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative">
      <button 
        onClick={toggleNotifications}
        className="text-white relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-game-red text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-game-darkPurple border border-game-purple rounded-md shadow-lg z-50 animate-pixel-fade-in">
          <div className="p-2 border-b border-game-purple">
            <div className="flex justify-between items-center">
              <h3 className="font-pixel text-xs text-white">Notificações</h3>
              <Link 
                to="/notifications" 
                className="text-xs text-game-lightPurple hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Ver todas
              </Link>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.slice(0, 3).map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-2 border-b border-game-purple/30 hover:bg-game-darkPurple/70 ${!notification.read ? 'bg-game-purple/10' : ''}`}
                >
                  <div className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${!notification.read ? 'bg-game-yellow' : 'bg-transparent'}`} />
                    <div>
                      <p className="text-xs font-medium text-white">{notification.title}</p>
                      <p className="text-xs text-white/70 mt-1">{notification.message}</p>
                      <p className="text-[10px] text-white/50 mt-1">
                        {new Date(notification.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-white/50 text-sm">
                Não há notificações
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-game-purple">
            <Link 
              to="/notifications" 
              className="block text-center text-xs text-game-lightPurple hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Ver todas as notificações
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsButton;
