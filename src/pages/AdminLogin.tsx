
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { LogIn } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de login de administrador 
    // Em uma aplicação real, isso seria validado no backend
    if (email === 'admin@mosten.com' && password === 'admin123') {
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-pixel text-2xl text-game-lightPurple mb-2">MOSTEN</h1>
          <h2 className="font-pixel text-lg text-game-purple">ADMIN LOGIN</h2>
        </div>

        <form onSubmit={handleSubmit} className="pixel-card animate-pixel-fade-in">
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-pixel text-sm">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-game-purple"
              placeholder="admin@mosten.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-pixel text-sm">Senha</label>
            <Input
              id="password"
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
            className="pixel-button w-full flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" /> Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
