import { CodeRedemptionEvent, Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Quiz de Segurança do Trabalho",
    description: "Teste seus conhecimentos sobre segurança no ambiente de trabalho.",
    questions: [
      {
        questionText: "Qual o principal objetivo do uso de EPIs?",
        options: [
          "Aumentar a produtividade",
          "Reduzir custos da empresa",
          "Proteger o trabalhador de riscos",
          "Melhorar a aparência do trabalhador"
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: "O que é CIPA?",
        options: [
          "Comissão Interna de Prevenção de Acidentes",
          "Controle Interno de Produtos Alimentícios",
          "Comissão de Integração de Pessoas e Ambientes",
          "Conselho de Investimentos e Poupança Ativa"
        ],
        correctAnswerIndex: 0
      }
    ]
  },
  {
    id: "2",
    title: "Quiz de Primeiros Socorros",
    description: "Avalie suas habilidades em situações de emergência e primeiros socorros.",
    questions: [
      {
        questionText: "Em caso de queimadura, o que não se deve fazer?",
        options: [
          "Lavar com água corrente",
          "Cobrir com pano limpo",
          "Aplicar pomada",
          "Procurar ajuda médica"
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: "Qual a primeira ação em caso de engasgo?",
        options: [
          "Oferecer água",
          "Realizar a manobra de Heimlich",
          "Deixar a pessoa se resolver sozinha",
          "Chamar o SAMU"
        ],
        correctAnswerIndex: 1
      }
    ]
  }
];

export const codeRedemptionEvents: CodeRedemptionEvent[] = [
  {
    id: "1",
    name: "Participação na coleta seletiva",
    description: "Resgate este código por participar da coleta de lixo organizada pela CIPA",
    code: "CIPA2025",
    xpReward: 150,
    pointsReward: 50,
    isActive: true,
    expiresAt: "2025-06-30"
  },
  {
    id: "2",
    name: "Semana de Saúde Mental",
    description: "Participou das atividades da Semana de Saúde Mental",
    code: "SAUDEMENTAL",
    xpReward: 100,
    pointsReward: 30,
    isActive: true,
    expiresAt: "2025-07-15"
  },
  {
    id: "3",
    name: "Treinamento de Primeiros Socorros",
    description: "Completou o treinamento básico de primeiros socorros",
    code: "PRIMEIROSOCORROS",
    xpReward: 200,
    pointsReward: 75,
    isActive: false,
    expiresAt: "2025-04-30"
  }
];
