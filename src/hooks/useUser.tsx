import { useState, createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  organizationId?: string;
  organizationName?: string;
  plan: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isOrganization: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data - in real app this would come from authentication
const mockUser: User = {
  id: "1",
  email: "admin@acmecorp.com",
  firstName: "John",
  lastName: "Doe",
  role: "OWNER",
  organizationId: "org-1",
  organizationName: "Acme Corp",
  plan: "ENTERPRISE"
};

// Mock individual user
const mockIndividualUser: User = {
  id: "2",
  email: "individual@example.com",
  firstName: "Jane",
  lastName: "Smith",
  role: "OWNER",
  plan: "PRO"
};

export function UserProvider({ children }: { children: ReactNode }) {
  // EASY SWITCH: Change between mockUser (organization) and mockIndividualUser (individual)
  // 🏢 Organization User: mockUser 
  // 👤 Individual User: mockIndividualUser
  const [user, setUser] = useState<User | null>(mockUser);

  const isOrganization = !!user?.organizationId;

  return (
    <UserContext.Provider value={{ user, setUser, isOrganization }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}