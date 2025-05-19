
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Check, FileQuestion } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  category: 'frontend' | 'backend' | 'general';
}

const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é a principal função do React?",
    options: [
      "Estilizar páginas web",
      "Criar interfaces de usuário interativas",
      "Gerenciar bancos de dados",
      "Processar requisições HTTP"
    ],
    answer: 1,
    category: 'frontend'
  },
  {
    id: 2,
    question: "O que é o Virtual DOM no React?",
    options: [
      "Uma biblioteca de componentes UI",
      "Uma representação virtual do DOM real para otimizar atualizações",
      "Um novo tipo de banco de dados",
      "Um formato de arquivo para armazenar dados React"
    ],
    answer: 1,
    category: 'frontend'
  },
  {
    id: 3,
    question: "O que é o Node.js?",
    options: [
      "Um framework frontend",
      "Um runtime JavaScript que executa código no servidor",
      "Uma linguagem de programação",
      "Um banco de dados NoSQL"
    ],
    answer: 1,
    category: 'backend'
  },
  {
    id: 4,
    question: "Como você lidaria com um cliente que constantemente muda os requisitos do projeto?",
    options: [
      "Ignoraria as mudanças e seguiria o plano original",
      "Documentaria todas as mudanças e renegociaria prazos e custos",
      "Aceitaria todas as mudanças sem questionar",
      "Abandonaria o projeto"
    ],
    answer: 1,
    category: 'general'
  },
  {
    id: 5,
    question: "Qual a melhor abordagem para resolver um conflito com um colega de equipe?",
    options: [
      "Ignorar o conflito e esperar que resolva sozinho",
      "Conversar diretamente com a pessoa para entender o problema",
      "Envolver imediatamente a gestão",
      "Exigir que a pessoa mude seu comportamento"
    ],
    answer: 1,
    category: 'general'
  }
];

const Quiz = () => {
  const [currentCategory, setCurrentCategory] = useState<'frontend' | 'backend' | 'general'>('frontend');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const filteredQuestions = mockQuestions.filter(q => q.category === currentCategory);
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 10); // Cada resposta correta vale 10 XP
    }
    
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
      // Em uma aplicação real, enviaríamos o resultado para o backend
    }
  };
  
  const handleChangeCategory = (category: 'frontend' | 'backend' | 'general') => {
    setCurrentCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Quiz de Missões</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="pixel-card mb-6 animate-pixel-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <FileQuestion className="w-5 h-5 text-game-yellow" />
              <h2 className="text-lg">Complete o quiz e ganhe XP!</h2>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <button 
                onClick={() => handleChangeCategory('frontend')} 
                className={`px-4 py-2 rounded-md border-2 transition-colors ${
                  currentCategory === 'frontend' 
                    ? 'bg-game-purple border-game-lightPurple' 
                    : 'bg-game-darkPurple/50 border-game-purple/50 hover:bg-game-darkPurple'
                }`}
              >
                Frontend
              </button>
              <button 
                onClick={() => handleChangeCategory('backend')} 
                className={`px-4 py-2 rounded-md border-2 transition-colors ${
                  currentCategory === 'backend' 
                    ? 'bg-game-purple border-game-lightPurple' 
                    : 'bg-game-darkPurple/50 border-game-purple/50 hover:bg-game-darkPurple'
                }`}
              >
                Backend
              </button>
              <button 
                onClick={() => handleChangeCategory('general')} 
                className={`px-4 py-2 rounded-md border-2 transition-colors ${
                  currentCategory === 'general' 
                    ? 'bg-game-purple border-game-lightPurple' 
                    : 'bg-game-darkPurple/50 border-game-purple/50 hover:bg-game-darkPurple'
                }`}
              >
                Geral
              </button>
            </div>
            
            {quizCompleted ? (
              <div className="text-center py-10 animate-pixel-fade-in">
                <div className="mb-4 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-game-purple/20 flex items-center justify-center">
                    <Check className="w-12 h-12 text-game-green" />
                  </div>
                </div>
                
                <h3 className="text-xl font-pixel mb-2">Quiz Completado!</h3>
                <p className="mb-4">Você ganhou <span className="text-game-green font-pixel">{score} XP</span></p>
                <p className="mb-6 text-muted-foreground">Volte amanhã para um novo quiz ou tente outra categoria.</p>
                
                <button onClick={handleRestart} className="pixel-button">
                  Tentar Novamente
                </button>
              </div>
            ) : (
              <div className="animate-pixel-fade-in">
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Questão {currentQuestionIndex + 1} de {filteredQuestions.length}
                  </span>
                  <span className="text-sm text-game-yellow font-pixel">
                    XP: {score}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg mb-4">{currentQuestion.question}</h3>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        className={`w-full text-left p-3 rounded-md border transition-all ${
                          selectedOption === index
                            ? 'bg-game-purple/30 border-game-lightPurple'
                            : 'bg-game-darkPurple/30 border-game-darkPurple hover:bg-game-darkPurple/50'
                        }`}
                      >
                        <span className="font-pixel mr-2">{String.fromCharCode(65 + index)}</span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className={`pixel-button w-full ${
                    selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {currentQuestionIndex < filteredQuestions.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
