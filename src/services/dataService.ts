
import { getCurrentUser } from './authService';
import { mockCurrentUser } from '../mocks/userMocks';
import { badges } from '../mocks/badgeMocks';
import { achievements } from '../mocks/achievementMocks';
import { monthlyPassLevels } from '../mocks/monthlyPassMocks';
import { storeItems } from '../mocks/storeMocks';
import { teams, userRankings } from '../mocks/rankingMocks';
import { quizzes, codeRedemptionEvents } from '../mocks/quizMocks';

// Helper functions to work with the mock data
export const getUserAchievements = (userId: string) => {
  if (userId === mockCurrentUser.id) {
    return mockCurrentUser.achievements.map(a => {
      const achievementDetails = achievements.find(ach => ach.id === a.achievementId);
      return {
        ...achievementDetails,
        earnedAt: a.earnedAt
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
    ...mockCurrentUser.monthlyPassProgress,
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
