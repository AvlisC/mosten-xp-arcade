
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { LogIn, User } from 'lucide-react';
import Navigation from '../components/Navigation';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de login de usuário
    // Em uma aplicação real, isso seria validado no backend
    if (email && password) {
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/profile');
    } else {
      setError('Por favor, preencha todos os campos');
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4 flex flex-col items-center">
        <h1 className="text-center mb-8">Login</h1>
        
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="pixel-card animate-pixel-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-game-darkPurple rounded-full w-24 h-24 flex items-center justify-center border-4 border-game-lightPurple">
                <User className="w-12 h-12 text-game-lightPurple" />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="user-email" className="block mb-2 font-pixel text-sm">Email</label>
              <Input
                id="user-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-game-purple"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="user-password" className="block mb-2 font-pixel text-sm">Senha</label>
              <Input
                id="user-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-game-purple"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-game-red/20 border border-game-red rounded-md text-white text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="pixel-button w-full flex items-center justify-center gap-2 mb-4"
            >
              <LogIn className="w-5 h-5" /> Entrar
            </button>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Não tem uma conta? Fale com o seu gestor.</p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
