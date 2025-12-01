import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthModalOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Load user from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('certa_user_session');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
            }
        }
    }, []);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock Login Logic
        // 1. Check if it matches the hardcoded demo user or a registered user in localstorage
        const storedUsers = JSON.parse(localStorage.getItem('certa_users_db') || '[]');
        const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);

        if (foundUser) {
            const userData: User = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
            setUser(userData);
            localStorage.setItem('certa_user_session', JSON.stringify(userData));
            return true;
        }

        // Demo user fallback
        if (email === 'teste@certa.com' && password === '123456') {
            const demoUser: User = { id: 'demo-1', name: 'Cliente Teste', email: 'teste@certa.com' };
            setUser(demoUser);
            localStorage.setItem('certa_user_session', JSON.stringify(demoUser));
            return true;
        }

        return false;
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const storedUsers = JSON.parse(localStorage.getItem('certa_users_db') || '[]');
        
        // Check if email exists
        if (storedUsers.some((u: any) => u.email === email)) {
            return false; 
        }

        const newUser = { id: Date.now().toString(), name, email, password };
        const updatedUsers = [...storedUsers, newUser];
        
        localStorage.setItem('certa_users_db', JSON.stringify(updatedUsers));
        
        // Auto login after register
        const userData: User = { id: newUser.id, name: newUser.name, email: newUser.email };
        setUser(userData);
        localStorage.setItem('certa_user_session', JSON.stringify(userData));
        
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('certa_user_session');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            register,
            logout,
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
