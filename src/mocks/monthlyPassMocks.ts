
import { MonthlyPassLevel } from "../types";

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
