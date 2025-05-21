
import { User } from "../types";

export interface UserAuth {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'consultant' | 'cipa' | 'marketing' | 'guest';
}

// Mock user database
export const mockUsers: UserAuth[] = [
  {
    id: "admin1",
    email: "admin@mosten.com",
    password: "admin123",
    name: "Admin Mosten",
    role: "admin"
  },
  {
    id: "consultant1",
    email: "consultor@mosten.com",
    password: "consultor123",
    name: "João Consultor",
    role: "consultant"
  },
  {
    id: "cipa1",
    email: "cipa@mosten.com",
    password: "cipa123",
    name: "Maria CIPA",
    role: "cipa"
  },
  {
    id: "marketing1",
    email: "marketing@mosten.com",
    password: "marketing123",
    name: "Paulo Marketing",
    role: "marketing"
  }
];

// Mock User Data
export const mockCurrentUser: User = {
  id: "user1",
  name: "João Silva",
  email: "joao.silva@mosten.dev",
  role: "user",
  totalXp: 3680,
  currentMonthXp: 580,
  availablePoints: 450,
  team: "team1",
  joinedAt: "2023-01-15",
  achievements: [
    { achievementId: "a1", earnedAt: "2023-01-15" },
    { achievementId: "a2", earnedAt: "2023-01-22" },
    { achievementId: "a3", earnedAt: "2023-02-15" },
    { achievementId: "a4", earnedAt: "2023-03-10" },
    { achievementId: "a6", earnedAt: "2023-04-05" },
  ],
  badges: [
    { badgeId: "b1", earnedAt: "2023-01-15" },
    { badgeId: "b2", earnedAt: "2023-02-01" },
    { badgeId: "b3", earnedAt: "2023-03-15" },
    { badgeId: "b4", earnedAt: "2023-04-05" },
  ],
  monthlyPassProgress: {
    month: "Maio",
    year: 2023,
    currentLevel: 3,
    currentXp: 580,
    claimedRewards: [1, 2]
  },
  notifications: []
};
