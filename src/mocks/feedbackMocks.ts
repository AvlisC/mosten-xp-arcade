
import { FeedbackSubmission, Notification } from "../types";

export const feedbackSubmissions: FeedbackSubmission[] = [
  {
    id: "fb1",
    imageUrl: "/placeholder.svg",
    description: "Feedback positivo do cliente sobre o atendimento",
    submittedBy: "consultant1",
    submittedAt: "2024-05-10T14:30:00Z"
  },
  {
    id: "fb2",
    imageUrl: "/placeholder.svg",
    description: "Elogio do cliente sobre a rapidez na resolução do problema",
    submittedBy: "consultant1",
    submittedAt: "2024-05-15T10:15:00Z"
  }
];

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "reminder",
    title: "Lembrete de lançamento de horas",
    message: "Não se esqueça de lançar suas horas de hoje!",
    read: false,
    date: "2024-05-21T08:00:00Z"
  },
  {
    id: "n2",
    type: "achievement",
    title: "Nova conquista!",
    message: "Parabéns! Você recebeu a conquista 'Sempre Pontual'",
    read: false,
    date: "2024-05-20T15:30:00Z"
  },
  {
    id: "n3",
    type: "store",
    title: "Novos itens na loja",
    message: "Confira os novos itens disponíveis na loja!",
    read: true,
    date: "2024-05-18T10:00:00Z"
  },
  {
    id: "n4",
    type: "monthlyPass",
    title: "Novo passe mensal",
    message: "O passe do mês de Junho já está disponível",
    read: true,
    date: "2024-05-15T09:00:00Z"
  }
];
