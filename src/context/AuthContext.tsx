
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, otp: string) => Promise<boolean>;
  signup: (name: string, phone: string) => Promise<boolean>;
  logout: () => void;
  requestOtp: (phone: string) => Promise<boolean>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('legalUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('legalUser');
      }
    }
    setIsLoading(false);
  }, []);

  const requestOtp = async (phone: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock OTP request - in a real app, this would call your backend
      console.log(`Requesting OTP for ${phone}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll pretend the OTP was sent successfully
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone.",
      });
      
      return true;
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phone: string, otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock login - in a real app, this would verify OTP with your backend
      console.log(`Logging in with phone: ${phone} and OTP: ${otp}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, any OTP will work
      if (otp.length === 6) {
        // Create mock user
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name: 'User', // Will be updated if it's a new user
          phone
        };
        
        setUser(newUser);
        localStorage.setItem('legalUser', JSON.stringify(newUser));
        
        toast({
          title: "Login Successful",
          description: "Welcome back to Legal Assistant.",
        });
        
        return true;
      } else {
        setError('Invalid OTP. Please try again.');
        return false;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, phone: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock signup - in a real app, this would register the user with your backend
      console.log(`Signing up with name: ${name} and phone: ${phone}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll pretend the registration was successful
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        phone
      };
      
      setUser(newUser);
      localStorage.setItem('legalUser', JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
      
      return true;
    } catch (err) {
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('legalUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        requestOtp,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
