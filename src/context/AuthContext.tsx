'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: number;
  title: string;
  price: string;
  quantity: number;
  image?: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

export interface PrescriptionRecord {
  id: string;
  doctor: string;
  date: string;
  diagnosis: string;
  recommendations: string[];
  followUpDate: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberTier: 'Clinical Member' | 'Privilege Patient';
  joinedDate: string;
  addresses: Address[];
  orders: OrderRecord[];
  prescriptions: PrescriptionRecord[];
}

export type AuthModalMode = 'login' | 'register' | 'forgot';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  isAuthModalOpen: boolean;
  authModalMode: AuthModalMode;
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: AuthModalMode) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Omit<OrderRecord, 'id' | 'date' | 'status'>) => string;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const STORAGE_USERS_KEY = 'allodermis_stored_users_v1';
const STORAGE_SESSION_KEY = 'allodermis_active_session_v1';

// Sample preloaded clinical demo user
const DEMO_USER: User = {
  id: 'usr_demo_alok_01',
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  memberTier: 'Privilege Patient',
  joinedDate: 'January 2026',
  addresses: [
    {
      id: 'addr_01',
      name: 'Priya Sharma (Home)',
      phone: '+91 98765 43210',
      street: 'Plot 42, DLF Cyber City, Patia',
      apartment: 'Tower B, Flat 602',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751024',
      isDefault: true,
    },
    {
      id: 'addr_02',
      name: 'Priya Sharma (Office)',
      phone: '+91 98765 43210',
      street: 'Infocity Rd, Chandrasekharpur',
      apartment: 'Floor 3, Tech Zone',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751016',
      isDefault: false,
    },
  ],
  orders: [
    {
      id: 'AD-892145',
      date: '04 Oct 2026',
      total: 3450,
      status: 'Shipped',
      shippingAddress: 'Plot 42, DLF Cyber City, Patia, Bhubaneswar, 751024',
      paymentMethod: 'UPI / Google Pay',
      items: [
        {
          id: 101,
          title: 'Dr. Alok Formulated Mineral Broad Spectrum Sunscreen SPF 50+',
          price: '1150',
          quantity: 2,
          image: '/images/products/sunscreen.jpg',
        },
        {
          id: 102,
          title: 'Allodermis Barrier Repair Ceramide Hydration Fluid',
          price: '1150',
          quantity: 1,
          image: '/images/products/barrier-repair.jpg',
        },
      ],
    },
    {
      id: 'AD-781033',
      date: '18 Sep 2026',
      total: 2400,
      status: 'Delivered',
      shippingAddress: 'Plot 42, DLF Cyber City, Patia, Bhubaneswar, 751024',
      paymentMethod: 'Credit Card',
      items: [
        {
          id: 103,
          title: 'Pure 10% Niacinamide + Zinc Sebum Balancing Serum',
          price: '1200',
          quantity: 2,
          image: '/images/products/serum.jpg',
        },
      ],
    },
  ],
  prescriptions: [
    {
      id: 'RX-2026-904',
      doctor: 'Dr. Alok Kumar Sahoo (Senior Dermatologist, MD)',
      date: '28 Sep 2026',
      diagnosis: 'Mild Facial Erythema & Epidermal Barrier Compromise',
      recommendations: [
        'Apply Ceramide-Enriched Barrier Balm morning & evening',
        'Physical Mineral Sunscreen SPF 50 every 3 hours outdoors',
        'Pause chemical exfoliants (AHA/BHA) for 14 days',
      ],
      followUpDate: '28 Oct 2026',
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');

  // Load user session from localStorage
  useEffect(() => {
    try {
      const storedUsersRaw = localStorage.getItem(STORAGE_USERS_KEY);
      if (!storedUsersRaw) {
        // initialize demo user in storage
        const initialUsers = [DEMO_USER];
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initialUsers));
      }

      const activeSessionEmail = localStorage.getItem(STORAGE_SESSION_KEY);
      if (activeSessionEmail) {
        const users: User[] = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
        const found = users.find((u) => u.email.toLowerCase() === activeSessionEmail.toLowerCase());
        if (found) {
          setUser(found);
        }
      }
    } catch (e) {
      console.error('Error loading auth state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Helper to persist user updates
  const persistUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    try {
      if (!updatedUser) {
        localStorage.removeItem(STORAGE_SESSION_KEY);
        return;
      }

      localStorage.setItem(STORAGE_SESSION_KEY, updatedUser.email);
      const users: User[] = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
      const index = users.findIndex((u) => u.id === updatedUser.id);
      if (index >= 0) {
        users[index] = updatedUser;
      } else {
        users.push(updatedUser);
      }
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (err) {
      console.error('Failed to persist user updates:', err);
    }
  };

  const openAuthModal = (mode: AuthModalMode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    try {
      const users: User[] = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
      let foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

      // Special support for demo credentials
      if (
        !foundUser &&
        (cleanEmail === DEMO_USER.email.toLowerCase() ||
          cleanEmail === 'priya.sharma@allodermis.com' ||
          cleanEmail.startsWith('priya') ||
          cleanEmail.includes('demo'))
      ) {
        foundUser = { ...DEMO_USER, email: cleanEmail };
      }

      if (!foundUser) {
        return {
          success: false,
          error: 'No account found with this email. Please register for a new account or click Auto Fill.',
        };
      }

      // Check simple password minimum check
      if (password.length < 4) {
        return { success: false, error: 'Password must be at least 4 characters.' };
      }

      persistUser(foundUser);
      closeAuthModal();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Authentication failed. Please try again.' };
    }
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (!cleanEmail || !data.firstName.trim() || !data.password) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    if (data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    try {
      const users: User[] = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
      const exists = users.some((u) => u.email.toLowerCase() === cleanEmail);
      if (exists) {
        return {
          success: false,
          error: 'An account with this email address already exists. Please sign in instead.',
        };
      }

      const newUser: User = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: cleanEmail,
        phone: data.phone.trim() || '+91 ',
        memberTier: 'Clinical Member',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        addresses: [],
        orders: [],
        prescriptions: [],
      };

      persistUser(newUser);
      closeAuthModal();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to create account. Please try again.' };
    }
  };

  const logout = () => {
    persistUser(null);
  };

  const updateProfile = (data: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    persistUser(updated);
  };

  const addAddress = (addrData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newId = `addr_${Date.now()}`;
    const newAddr: Address = {
      ...addrData,
      id: newId,
    };

    let updatedAddresses = [...user.addresses];
    if (newAddr.isDefault || updatedAddresses.length === 0) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
      newAddr.isDefault = true;
    }

    updatedAddresses.push(newAddr);
    persistUser({ ...user, addresses: updatedAddresses });
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = user.addresses.filter((a) => a.id !== id);
    // If we removed the default address and there are remaining addresses, make first default
    if (updatedAddresses.length > 0 && !updatedAddresses.some((a) => a.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }
    persistUser({ ...user, addresses: updatedAddresses });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    persistUser({ ...user, addresses: updatedAddresses });
  };

  const addOrder = (orderData: Omit<OrderRecord, 'id' | 'date' | 'status'>): string => {
    const id = `AD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderRecord = {
      ...orderData,
      id,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Processing',
    };

    if (user) {
      const updatedOrders = [newOrder, ...user.orders];
      persistUser({ ...user, orders: updatedOrders });
    }

    return id;
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    // Simulate instantaneous email notification
    return {
      success: true,
      message: `A password reset link and temporary verification code have been dispatched to ${cleanEmail}.`,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoaded,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        addOrder,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
