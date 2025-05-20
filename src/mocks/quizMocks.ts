
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  availableUntil: string;
}

export const quizzes: Quiz[] = [
  {
    id: "q1",
    title: "Conhecimentos Básicos de Programação",
    description: "Teste seus conhecimentos sobre os fundamentos de programação",
    questions: [
      {
        id: "q1_1",
        question: "O que é um algoritmo?",
        options: [
          "Um tipo de linguagem de programação",
          "Uma sequência de passos para resolver um problema",
          "Um erro de compilação",
          "Um componente de hardware"
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: "q1_2",
        question: "O que significa a sigla HTML?",
        options: [
          "Hypertext Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Method Language",
          "Hypertext Multiple Language"
        ],
        correctAnswer: 0,
        points: 10
      },
      {
        id: "q1_3",
        question: "O que é CSS?",
        options: [
          "Um tipo de banco de dados",
          "Uma linguagem de programação orientada a objetos",
          "Uma linguagem de estilização",
          "Um protocolo de segurança"
        ],
        correctAnswer: 2,
        points: 10
      }
    ],
    availableUntil: "2023-12-31"
  },
  {
    id: "q2",
    title: "Metodologias Ágeis",
    description: "Teste seus conhecimentos sobre metodologias ágeis de desenvolvimento",
    questions: [
      {
        id: "q2_1",
        question: "Qual das seguintes NÃO é uma metodologia ágil?",
        options: [
          "Scrum",
          "Kanban",
          "Waterfall",
          "XP (Extreme Programming)"
        ],
        correctAnswer: 2,
        points: 15
      },
      {
        id: "q2_2",
        question: "O que é uma Sprint no Scrum?",
        options: [
          "Uma reunião diária",
          "Um período fixo de tempo para completar um conjunto de tarefas",
          "Uma técnica de teste",
          "Um tipo de backlog"
        ],
        correctAnswer: 1,
        points: 15
      },
      {
        id: "q2_3",
        question: "Qual o objetivo da reunião Daily Scrum?",
        options: [
          "Planejar todo o projeto",
          "Revisar o trabalho completo",
          "Sincronizar atividades e criar um plano para as próximas 24 horas",
          "Demonstrar o incremento de produto para os stakeholders"
        ],
        correctAnswer: 2,
        points: 15
      }
    ],
    availableUntil: "2023-12-31"
  }
];

export const codeRedemptionEvents = [
  {
    id: "event1",
    name: "Participação na Coleta de Lixo - CIPA",
    description: "Pontos extras para quem participou da coleta de lixo organizada pela CIPA",
    code: "CIPA2023",
    xpReward: 200,
    pointsReward: 50,
    isActive: true
  },
  {
    id: "event2",
    name: "Palestra sobre Segurança Digital",
    description: "Participou da palestra sobre segurança digital",
    code: "SEGSEG2023",
    xpReward: 150,
    pointsReward: 30,
    isActive: true
  },
  {
    id: "event3",
    name: "Hackathon Interno",
    description: "Participou do hackathon interno da empresa",
    code: "HACK2023",
    xpReward: 300,
    pointsReward: 100,
    isActive: true
  },
  {
    id: "event4",
    name: "Doação de Sangue",
    description: "Participou da campanha de doação de sangue",
    code: "SANGUE2023",
    xpReward: 250,
    pointsReward: 80,
    isActive: true
  }
];
