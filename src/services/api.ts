import { UserAccount } from '@/lib/types';

// Simulate server delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initial user data - gets loaded into localStorage on first run
const INITIAL_USERS: UserAccount[] = [
  { id: "1", name: "Peter Parker", cardType: "mastercard", balance: 250000 },
  { id: "2", name: "Mary Jane", cardType: "visa", balance: 185050 },
  { id: "3", name: "Spider-Man", cardType: "star", balance: 1000000 },
  { id: "4", name: "Ben Parker", cardType: "pulse", balance: 75025 },
  { id: "5", name: "May Parker", cardType: "maestro", balance: 320000 },
  { id: "6", name: "Gwen Stacy", cardType: "plus", balance: 92575 },
];

// PIN to user ID mapping
const PIN_TO_USER_ID: Record<string, string> = {
  "1234": "1", // Peter Parker - mastercard
  "5678": "2", // Mary Jane - visa
  "9999": "3", // Spider-Man - star
  "1111": "4", // Ben Parker - pulse
  "2222": "5", // May Parker - maestro
  "3333": "6", // Gwen Stacy - plus
};

const STORAGE_KEY = 'atm_users';

// Initialize localStorage with user data if not present
const initializeStorage = () => {
  if (typeof window === 'undefined') return; // SSR safety
  
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
  }
};

// Get users from localStorage
// nit: getUserById and do the filtering once here. You likely wouldn't have a getUsers endpoint for an ATM
const getUserById = (id: string): UserAccount | null => {  
  const data = localStorage.getItem(STORAGE_KEY);
  const users: UserAccount[] = data ? JSON.parse(data) : [];
  const user = users.find(u => u.id === id);
  return user || null;
};

// Save users to localStorage
// do this by id too
const saveUserById = (id: string, balance: number) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const users: UserAccount[] = data ? JSON.parse(data) : [];
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    users[userIndex].balance = balance;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return users[userIndex];
};

// API methods that simulate server requests
export const api = {
  // Initialize the storage (call this on app start)
  initialize: () => {
    initializeStorage();
  },

  authenticateUser: async (pin: string): Promise<UserAccount | null> => {
    await delay(800); // Simulate network delay
    
    const userId = PIN_TO_USER_ID[pin];
    if (!userId) return null;
    
    return getUserById(userId);
  },

  getBalance: async (userId: string): Promise<number | null> => {
    await delay(500); // Simulate network delay
    
    const user = getUserById(userId);
    return user?.balance ?? null;
  },

  processWithdrawal: async (userId: string, amount: number): Promise<{ success: boolean; newBalance?: number; error?: string }> => {
    await delay(2000); // Longer delay for transaction processing
    
    const user = getUserById(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    } else if (user.balance < amount) {
      return { success: false, error: "Insufficient funds" };
    }
    
    const updatedUser = saveUserById(userId, user.balance - amount);
    return { success: true, newBalance: updatedUser.balance };
  },

  processDeposit: async (userId: string, amount: number): Promise<{ success: boolean; newBalance?: number; error?: string }> => {
    await delay(2000); // Longer delay for transaction processing
    
    const user = getUserById(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const updatedUser = saveUserById(userId, user.balance + amount);
    return { success: true, newBalance: updatedUser.balance };
  },

  getUser: async (userId: string): Promise<UserAccount | null> => {
    await delay(300);
    return getUserById(userId);
  }
};