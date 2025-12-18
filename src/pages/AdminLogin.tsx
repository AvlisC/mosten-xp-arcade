import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import {
  authenticateUser,
  loginUser,
  isAuthenticated,
  getCurrentUser,
} from '../services/authService';
import { toast } from '@/components/ui/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in as admin
    const currentUser = getCurrentUser();
    if (isAuthenticated() && currentUser?.role === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate admin credentials
    const user = authenticateUser(email, password);

    if (user && user.role === 'admin') {
      loginUser(user);
      toast({
        title: 'Login bem sucedido',
        description: `Bem-vindo, ${user.name}!`,
      });
      navigate('/admin');
    } else {
      setError('Email ou senha inválidos para acesso de administrador');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-pixel text-2xl text-game-lightPurple mb-2">
            Motiva
          </h1>
          <h2 className="font-pixel text-lg text-game-purple">ADMIN LOGIN</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="pixel-card animate-pixel-fade-in"
        >
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-pixel text-sm">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-game-purple"
              placeholder="admin@Motiva.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-pixel text-sm">
              Senha
            </label>
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

          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>Credenciais de teste: admin@Motiva.com / admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
