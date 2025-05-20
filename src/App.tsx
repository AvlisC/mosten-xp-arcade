
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Achievements from "./pages/Achievements";
import MonthlyPass from "./pages/MonthlyPass";
import Store from "./pages/Store";
import Ranking from "./pages/Ranking";
import Admin from "./pages/Admin";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Quiz from "./pages/Quiz";
import DailyCheckin from "./pages/DailyCheckin";
import CodeRedemption from "./pages/CodeRedemption";
import NotFound from "./pages/NotFound";
import { isAuthenticated } from "./services/authService";

const queryClient = new QueryClient();

// Componente para redirecionar com base na autenticação
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/user-login" />;
  }
  return <>{children}</>;
};

// Verificação para a rota inicial
const HomeRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/user-login" />;
  }
  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
          <Route path="/monthly-pass" element={<MonthlyPass />} />
          <Route path="/store" element={<Store />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/daily-checkin" element={<ProtectedRoute><DailyCheckin /></ProtectedRoute>} />
          <Route path="/code-redemption" element={<ProtectedRoute><CodeRedemption /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
