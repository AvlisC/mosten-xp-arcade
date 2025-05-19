
// Mock authentication service

export interface UserAuth {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'consultant' | 'guest';
}

// Mock user database
export const mockUsers: UserAuth[] = [
  {
    id: "admin1",
    email: "admin@mosten.com",
    password: "admin123",
    name: "Admin Mosten",
    role: "admin"
  },
  {
    id: "consultant1",
    email: "consultor@mosten.com",
    password: "consultor123",
    name: "João Consultor",
    role: "consultant"
  }
];

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

// Route protection middleware helpers
export const isAdmin = (): boolean => {
  const currentUser = getCurrentUser();
  return currentUser?.role === 'admin';
};

export const isConsultant = (): boolean => {
  const currentUser = getCurrentUser();
  return currentUser?.role === 'consultant' || currentUser?.role === 'admin';
};

// Middleware for checking protected routes
export const checkProtectedRoute = (path: string): boolean => {
  // Define protected routes
  const adminRoutes = ['/admin'];
  const consultantRoutes = ['/profile', '/achievements', '/quiz', '/daily-checkin'];
  
  // Check if route requires admin access
  if (adminRoutes.includes(path)) {
    return isAdmin();
  }
  
  // Check if route requires consultant access
  if (consultantRoutes.includes(path)) {
    return isConsultant();
  }
  
  // Not a protected route
  return true;
};
