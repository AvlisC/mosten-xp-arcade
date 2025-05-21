
// Authentication service using mocks
import { mockUsers, UserAuth } from '../mocks/userMocks';

// Check if user credentials are valid
export const authenticateUser = (email: string, password: string): UserAuth | null => {
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("userAuth") !== null;
};

// Get current user data
export const getCurrentUser = (): UserAuth | null => {
  const userDataString = localStorage.getItem("userAuth");
  if (!userDataString) return null;
  
  try {
    return JSON.parse(userDataString) as UserAuth;
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    return null;
  }
};

// Login user
export const loginUser = (user: UserAuth): void => {
  // In a real app, you would never store the password in localStorage
  // This is just for demo purposes
  const { password, ...safeUserData } = user;
  localStorage.setItem("userAuth", JSON.stringify(safeUserData));
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem("userAuth");
};

// Check if user has required role
export const hasRequiredRole = (requiredRoles: string[]): boolean => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  
  return requiredRoles.includes(currentUser.role);
};

// Role check helpers
export const isAdmin = (): boolean => {
  const currentUser = getCurrentUser();
  return currentUser?.role === 'admin';
};

export const isConsultant = (): boolean => {
  const currentUser = getCurrentUser();
  return currentUser?.role === 'consultant';
};

export const isCipa = (): boolean => {
  const currentUser = getCurrentUser();
  return currentUser?.role === 'cipa';
};

export const isMarketing = (): boolean => {
  const currentUser = getCurrentUser();
  return currentUser?.role === 'marketing';
};

// Middleware for checking protected routes
export const checkProtectedRoute = (path: string): boolean => {
  // Define protected routes
  const adminRoutes = ['/admin'];
  const consultantRoutes = ['/profile', '/achievements', '/quiz', '/daily-checkin', '/code-redemption', '/feedback-submission', '/notifications'];
  const cipaRoutes = ['/cipa-events'];
  const marketingRoutes = ['/marketing-store', '/marketing-pass'];
  
  // Check if route requires admin access
  if (adminRoutes.includes(path)) {
    return isAdmin();
  }
  
  // Check if route requires consultant access
  if (consultantRoutes.includes(path)) {
    return isConsultant();
  }
  
  // Check if route requires CIPA access
  if (cipaRoutes.includes(path)) {
    return isCipa();
  }
  
  // Check if route requires Marketing access
  if (marketingRoutes.includes(path)) {
    return isMarketing();
  }
  
  // Not a protected route
  return true;
};
