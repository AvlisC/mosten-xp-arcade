
export enum BadgeLevel {
  Bronze = "bronze",
  Silver = "silver",
  Gold = "gold",
  Platinum = "platinum",
  Diamond = "diamond"
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  level: BadgeLevel;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  badges?: Badge[];
  category: "performance" | "feedback" | "timeTracking" | "mission" | "other";
  requiresApproval: boolean;
  assignedBy?: {
    id: string;
    name: string;
  };
}

export interface MonthlyPassLevel {
  level: number;
  xpRequired: number;
  reward: {
    type: "item" | "money" | "badge";
    value: string | number;
    name: string;
    description: string;
    imageUrl?: string;
  };
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: "apparel" | "accessory" | "digital" | "other";
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  totalXp: number;
  currentMonthXp: number;
  availablePoints: number;
  team: string;
  joinedAt: string;
  achievements: {
    achievementId: string;
    earnedAt: string;
    assignedBy?: {
      id: string;
      name: string;
    };
  }[];
  badges: {
    badgeId: string;
    earnedAt: string;
  }[];
  monthlyPassProgress: {
    month: string;
    year: number;
    currentLevel: number;
    currentXp: number;
    claimedRewards: number[];
  };
  notifications?: Notification[];
}

export interface Team {
  id: string;
  name: string;
  members: string[];
  totalXp: number;
}

export interface CodeRedemptionEvent {
  id: string;
  name: string;
  description: string;
  code: string;
  xpReward: number;
  pointsReward: number;
  isActive: boolean;
  expiresAt?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
  }[];
}

export interface Notification {
  id: string;
  type: "achievement" | "reminder" | "store" | "monthlyPass";
  title: string;
  message: string;
  read: boolean;
  date: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  codes: string[];
  createdBy: string;
  createdAt: string;
}

export interface FeedbackSubmission {
  id: string;
  imageUrl: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
}

export interface CalendarCheckIn {
  date: string;
  checked: boolean;
}
