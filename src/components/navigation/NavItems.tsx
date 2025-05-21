
import { Trophy, User, Medal, ShoppingCart, Users, Settings, Calendar, FileQuestion, LogOut, Code, Bell, Image, FileText, Store } from 'lucide-react';
import { getCurrentUser } from '../../services/authService';

export type NavItem = {
  name: string;
  icon: JSX.Element;
  href: string;
};

// Public routes that are always visible
export const getPublicNavItems = (): NavItem[] => [
  { name: 'Loja', icon: <ShoppingCart className="w-4 h-4" />, href: '/store' },
  { name: 'Passe', icon: <Trophy className="w-4 h-4" />, href: '/monthly-pass' },
  { name: 'Ranking', icon: <Users className="w-4 h-4" />, href: '/ranking' },
];

// Routes visible to logged-in consultants
export const getConsultantNavItems = (): NavItem[] => [
  { name: 'Perfil', icon: <User className="w-4 h-4" />, href: '/profile' },
  { name: 'Conquistas', icon: <Medal className="w-4 h-4" />, href: '/achievements' },
  { name: 'Quiz', icon: <FileQuestion className="w-4 h-4" />, href: '/quiz' },
  { name: 'Check-in', icon: <Calendar className="w-4 h-4" />, href: '/daily-checkin' },
  { name: 'Resgate', icon: <Code className="w-4 h-4" />, href: '/code-redemption' },
  { name: 'Feedback', icon: <Image className="w-4 h-4" />, href: '/feedback-submission' },
];

// Routes visible only to admins
export const getAdminNavItems = (): NavItem[] => [
  { name: 'Admin', icon: <Settings className="w-4 h-4" />, href: '/admin' },
];

// Routes visible only to CIPA members
export const getCipaNavItems = (): NavItem[] => [
  { name: 'Eventos', icon: <FileText className="w-4 h-4" />, href: '/cipa-events' },
];

// Routes visible only to Marketing members
export const getMarketingNavItems = (): NavItem[] => [
  { name: 'Loja', icon: <Store className="w-4 h-4" />, href: '/marketing-store' },
  { name: 'Passe', icon: <Trophy className="w-4 h-4" />, href: '/marketing-pass' },
];

// Get all visible nav items based on user role
export const getVisibleNavItems = (): NavItem[] => {
  let items = [...getPublicNavItems()];
  
  const currentUser = getCurrentUser();
  
  if (currentUser) {
    if (currentUser.role === 'consultant') {
      items = [...items, ...getConsultantNavItems()];
    }
    
    if (currentUser.role === 'admin') {
      items = [...items, ...getAdminNavItems()];
    }
    
    if (currentUser.role === 'cipa') {
      items = [...items, ...getCipaNavItems()];
    }
    
    if (currentUser.role === 'marketing') {
      items = [...items, ...getMarketingNavItems()];
    }
  }
  
  return items;
};

// Auth action items (login/logout)
export const getAuthItem = (isLoggedIn: boolean): NavItem => {
  return isLoggedIn 
    ? { name: 'Logout', icon: <LogOut className="w-4 h-4" />, href: '/logout' }
    : { name: 'Login', icon: <User className="w-5 h-5" />, href: '/user-login' };
};

// Notification item for consultant
export const getNotificationItem = (): NavItem => {
  return { name: 'Notificações', icon: <Bell className="w-4 h-4" />, href: '/notifications' };
};
