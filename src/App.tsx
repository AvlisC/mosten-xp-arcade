
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
import FeedbackSubmission from "./pages/FeedbackSubmission";
import Notifications from "./pages/Notifications";
import CipaEvents from "./pages/CipaEvents";
import MarketingStore from "./pages/MarketingStore";
import MarketingPass from "./pages/MarketingPass";
import { isAuthenticated, isConsultant, isAdmin, isCipa, isMarketing } from "./services/authService";

const queryClient = new QueryClient();

// Componente para redirecionar com base na autenticação
const ProtectedRoute = ({ children, roleCheck }: { children: React.ReactNode, roleCheck: () => boolean }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/user-login" />;
  }
  
  if (!roleCheck()) {
    return <Navigate to="/not-authorized" />;
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
          <Route path="/profile" element={<ProtectedRoute roleCheck={isConsultant}><Profile /></ProtectedRoute>} />
          <Route path="/achievements" element={<ProtectedRoute roleCheck={isConsultant}><Achievements /></ProtectedRoute>} />
          <Route path="/monthly-pass" element={<MonthlyPass />} />
          <Route path="/store" element={<Store />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/admin" element={<ProtectedRoute roleCheck={isAdmin}><Admin /></ProtectedRoute>} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/quiz" element={<ProtectedRoute roleCheck={isConsultant}><Quiz /></ProtectedRoute>} />
          <Route path="/daily-checkin" element={<ProtectedRoute roleCheck={isConsultant}><DailyCheckin /></ProtectedRoute>} />
          <Route path="/code-redemption" element={<ProtectedRoute roleCheck={isConsultant}><CodeRedemption /></ProtectedRoute>} />
          <Route path="/feedback-submission" element={<ProtectedRoute roleCheck={isConsultant}><FeedbackSubmission /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute roleCheck={isConsultant}><Notifications /></ProtectedRoute>} />
          <Route path="/cipa-events" element={<ProtectedRoute roleCheck={isCipa}><CipaEvents /></ProtectedRoute>} />
          <Route path="/marketing-store" element={<ProtectedRoute roleCheck={isMarketing}><MarketingStore /></ProtectedRoute>} />
          <Route path="/marketing-pass" element={<ProtectedRoute roleCheck={isMarketing}><MarketingPass /></ProtectedRoute>} />
          <Route path="/not-authorized" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
