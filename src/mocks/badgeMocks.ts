
import { Badge, BadgeLevel } from "../types";

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
