
import { Achievement, Badge, BadgeLevel, MonthlyPassLevel, StoreItem, User, Team } from "../types";

// Mock Badges
export const badges: Badge[] = [
  {
    id: "b1",
    name: "Iniciante",
    description: "Primeiros passos na Mosten",
    level: BadgeLevel.Bronze
  },
  {
    id: "b2",
    name: "Aprendiz",
    description: "Completou 10 tarefas",
    level: BadgeLevel.Bronze
  },
  {
    id: "b3",
    name: "Consistente",
    description: "Lançou horas corretamente por 30 dias seguidos",
    level: BadgeLevel.Silver
  },
  {
    id: "b4",
    name: "Eficiente",
    description: "Entregou 5 tarefas antes do prazo",
    level: BadgeLevel.Silver
  },
  {
    id: "b5",
    name: "Especialista",
    description: "Completou 50 tarefas",
    level: BadgeLevel.Gold
  },
  {
    id: "b6",
    name: "Mestre",
    description: "Completou 100 tarefas",
    level: BadgeLevel.Platinum
  },
  {
    id: "b7",
    name: "Lenda",
    description: "Completou 1 ano na Mosten com excelência",
    level: BadgeLevel.Diamond
  }
];

// Mock Achievements
export const achievements: Achievement[] = [
  {
    id: "a1",
    name: "Primeiro Dia",
    description: "Completou seu primeiro dia na Mosten",
    xpReward: 50,
    category: "other",
    requiresApproval: false
  },
  {
    id: "a2",
    name: "Lançamento de Horas - Semana",
    description: "Lançou todas as horas corretamente durante uma semana",
    xpReward: 100,
    category: "timeTracking",
    requiresApproval: false
  },
  {
    id: "a3",
    name: "Lançamento de Horas - Mês",
    description: "Lançou todas as horas corretamente durante um mês",
    xpReward: 300,
    category: "timeTracking",
    requiresApproval: false
  },
  {
    id: "a4",
    name: "50 Commits",
    description: "Realizou 50 commits em um projeto",
    xpReward: 200,
    category: "performance",
    requiresApproval: true
  },
  {
    id: "a5",
    name: "150 Commits",
    description: "Realizou 150 commits em um projeto",
    xpReward: 500,
    category: "performance",
    requiresApproval: true
  },
  {
    id: "a6",
    name: "Feedback Positivo",
    description: "Recebeu feedback positivo de um cliente",
    xpReward: 300,
    category: "feedback",
    requiresApproval: true,
    badges: [badges.find(b => b.id === "b4")]
  },
  {
    id: "a7",
    name: "Bug Crítico Resolvido",
    description: "Solucionou um bug crítico em produção",
    xpReward: 400,
    category: "performance",
    requiresApproval: true
  },
  {
    id: "a8",
    name: "Mentor",
    description: "Ajudou um novo colega durante sua adaptação",
    xpReward: 250,
    category: "feedback",
    requiresApproval: true
  },
  {
    id: "a9",
    name: "Apresentação",
    description: "Realizou uma apresentação para a equipe",
    xpReward: 200,
    category: "mission",
    requiresApproval: true
  },
  {
    id: "a10",
    name: "Certificação",
    description: "Obteve uma nova certificação relevante",
    xpReward: 500,
    category: "performance",
    requiresApproval: true,
    badges: [badges.find(b => b.id === "b5")]
  }
];

// Monthly Pass Levels
export const monthlyPassLevels: MonthlyPassLevel[] = [
  {
    level: 1,
    xpRequired: 0,
    reward: {
      type: "badge",
      value: "b1",
      name: "Badge Iniciante",
      description: "Badge de iniciante no passe mensal"
    }
  },
  {
    level: 2,
    xpRequired: 300,
    reward: {
      type: "item",
      value: "item1",
      name: "Adesivos Mosten",
      description: "Conjunto de adesivos da Mosten"
    }
  },
  {
    level: 3,
    xpRequired: 700,
    reward: {
      type: "money",
      value: 50,
      name: "Bônus R$ 50,00",
      description: "Bônus em dinheiro"
    }
  },
  {
    level: 4,
    xpRequired: 1200,
    reward: {
      type: "item",
      value: "item2",
      name: "Caneca Mosten",
      description: "Caneca personalizada da Mosten"
    }
  },
  {
    level: 5,
    xpRequired: 2000,
    reward: {
      type: "money",
      value: 100,
      name: "Bônus R$ 100,00",
      description: "Bônus em dinheiro"
    }
  },
  {
    level: 6,
    xpRequired: 3000,
    reward: {
      type: "item",
      value: "item3",
      name: "Camiseta Mosten",
      description: "Camiseta personalizada da Mosten"
    }
  },
  {
    level: 7,
    xpRequired: 4500,
    reward: {
      type: "money",
      value: 200,
      name: "Bônus R$ 200,00",
      description: "Bônus em dinheiro maior"
    }
  },
  {
    level: 8,
    xpRequired: 6000,
    reward: {
      type: "badge",
      value: "b6",
      name: "Badge Platinum",
      description: "Badge platinum exclusiva do passe"
    }
  },
  {
    level: 9,
    xpRequired: 8000,
    reward: {
      type: "money",
      value: 300,
      name: "Bônus R$ 300,00",
      description: "Bônus em dinheiro significativo"
    }
  },
  {
    level: 10,
    xpRequired: 10000,
    reward: {
      type: "item",
      value: "item4",
      name: "Moletom Mosten",
      description: "Moletom personalizado da Mosten"
    }
  }
];

// Store Items
export const storeItems: StoreItem[] = [
  {
    id: "item1",
    name: "Adesivos Mosten",
    description: "Conjunto com 5 adesivos personalizados da Mosten",
    imageUrl: "/placeholder.svg",
    price: 200,
    category: "accessory",
    stock: 50
  },
  {
    id: "item2",
    name: "Caneca Mosten",
    description: "Caneca personalizada da Mosten, perfeita para seu café",
    imageUrl: "/placeholder.svg",
    price: 350,
    category: "accessory",
    stock: 30
  },
  {
    id: "item3",
    name: "Camiseta Mosten",
    description: "Camiseta confortável com logo da Mosten",
    imageUrl: "/placeholder.svg",
    price: 500,
    category: "apparel",
    stock: 20
  },
  {
    id: "item4",
    name: "Moletom Mosten",
    description: "Moletom de alta qualidade com logo da Mosten",
    imageUrl: "/placeholder.svg",
    price: 800,
    category: "apparel",
    stock: 15
  },
  {
    id: "item5",
    name: "Garrafa Mosten",
    description: "Garrafa térmica com logo da Mosten",
    imageUrl: "/placeholder.svg",
    price: 400,
    category: "accessory",
    stock: 25
  },
  {
    id: "item6",
    name: "Powerbank Mosten",
    description: "Powerbank 10000mAh com logo da Mosten",
    imageUrl: "/placeholder.svg",
    price: 700,
    category: "accessory",
    stock: 10
  },
  {
    id: "item7",
    name: "Vale Dia de Folga",
    description: "Um dia de folga extra a combinar com seu líder",
    imageUrl: "/placeholder.svg",
    price: 1500,
    category: "other",
    stock: 5
  },
  {
    id: "item8",
    name: "Mousepad Mosten",
    description: "Mousepad ergonômico com logo da Mosten",
    imageUrl: "/placeholder.svg",
    price: 250,
    category: "accessory",
    stock: 40
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
  }
};

// Mock Teams
export const teams: Team[] = [
  {
    id: "team1",
    name: "Frontend",
    members: ["user1", "user2", "user3"],
    totalXp: 9850
  },
  {
    id: "team2",
    name: "Backend",
    members: ["user4", "user5", "user6", "user7"],
    totalXp: 12400
  },
  {
    id: "team3",
    name: "DevOps",
    members: ["user8", "user9"],
    totalXp: 7300
  },
  {
    id: "team4",
    name: "Design",
    members: ["user10", "user11", "user12"],
    totalXp: 8600
  }
];

// Mock User Rankings
export const userRankings = [
  { id: "user5", name: "Maria Oliveira", totalXp: 5240, team: "Backend" },
  { id: "user8", name: "Carlos Eduardo", totalXp: 4980, team: "DevOps" },
  { id: "user1", name: "João Silva", totalXp: 3680, team: "Frontend" },
  { id: "user11", name: "Ana Carolina", totalXp: 3450, team: "Design" },
  { id: "user6", name: "Pedro Santos", totalXp: 3320, team: "Backend" },
  { id: "user2", name: "Luiza Costa", totalXp: 3180, team: "Frontend" },
  { id: "user9", name: "Fernando Alves", totalXp: 2320, team: "DevOps" },
  { id: "user10", name: "Juliana Mendes", totalXp: 2280, team: "Design" },
  { id: "user4", name: "Roberto Ferreira", totalXp: 2100, team: "Backend" },
  { id: "user3", name: "Gabriel Torres", totalXp: 1990, team: "Frontend" },
];

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
