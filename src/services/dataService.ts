
import { getCurrentUser } from './authService';
import { 
  mockCurrentUser, 
  mockUsers 
} from '../mocks/userMocks';
import { 
  badges 
} from '../mocks/badgeMocks';
import { 
  achievements 
} from '../mocks/achievementMocks';
import { 
  monthlyPassLevels 
} from '../mocks/monthlyPassMocks';
import { 
  storeItems 
} from '../mocks/storeMocks';
import { 
  teams, 
  userRankings 
} from '../mocks/rankingMocks';
import { 
  quizzes, 
  codeRedemptionEvents 
} from '../mocks/quizMocks';
import {
  events,
  checkInCalendar
} from '../mocks/eventsMocks';
import {
  feedbackSubmissions,
  notifications
} from '../mocks/feedbackMocks';

// Export mock data for direct access
export { 
  mockCurrentUser, 
  achievements, 
  badges, 
  storeItems, 
  teams, 
  userRankings,
  events,
  checkInCalendar,
  feedbackSubmissions,
  notifications
};

// Helper functions to work with the mock data
export const getUserAchievements = (userId: string) => {
  if (userId === mockCurrentUser.id) {
    return mockCurrentUser.achievements.map(a => {
      const achievementDetails = achievements.find(ach => ach.id === a.achievementId);
      return {
        ...achievementDetails,
        earnedAt: a.earnedAt,
        assignedBy: a.assignedBy
      };
    });
  }
  return [];
};

export const getUserBadges = (userId: string) => {
  if (userId === mockCurrentUser.id) {
    return mockCurrentUser.badges.map(b => {
      const badgeDetails = badges.find(badge => badge.id === b.badgeId);
      return {
        ...badgeDetails,
        earnedAt: b.earnedAt
      };
    });
  }
  return [];
};

export const getCurrentMonthlyPass = () => {
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const now = new Date();
  const currentMonth = monthNames[now.getMonth()];
  const currentYear = now.getFullYear();
  
  return {
    month: currentMonth,
    year: currentYear,
    levels: monthlyPassLevels
  };
};

export const getCurrentUserMonthlyPassProgress = () => {
  const monthlyPass = getCurrentMonthlyPass();
  return {
    ...monthlyPass,
    currentLevel: mockCurrentUser.monthlyPassProgress.currentLevel,
    currentXp: mockCurrentUser.monthlyPassProgress.currentXp,
    claimedRewards: mockCurrentUser.monthlyPassProgress.claimedRewards
  };
};

export const getAvailableQuizzes = () => {
  return quizzes;
};

export const getStoreItems = () => {
  return storeItems;
};

export const getTeamRankings = () => {
  return teams;
};

export const getUserRankings = () => {
  return userRankings;
};

export const getCodeRedemptionEvents = () => {
  return codeRedemptionEvents;
};

export const redeemCode = (code: string) => {
  const event = codeRedemptionEvents.find(e => e.code === code && e.isActive);
  return event || null;
};

export const getEvents = () => {
  return events;
};

export const getCheckInCalendar = () => {
  return checkInCalendar;
};

export const getFeedbackSubmissions = () => {
  return feedbackSubmissions;
};

export const getNotifications = () => {
  return notifications;
};
