
import { Team } from "../types";

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
