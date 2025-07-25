import { UserAccount } from '@/lib/types';

// Simulate server delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initial user data - gets loaded into localStorage on first run
const INITIAL_USERS: UserAccount[] = [
  { id: "1", name: "Peter Parker", cardType: "mastercard", balance: 2500.00 },
  { id: "2", name: "Mary Jane", cardType: "visa", balance: 1850.50 },
  { id: "3", name: "Spider-Man", cardType: "star", balance: 10000.00 },
  { id: "4", name: "Ben Parker", cardType: "pulse", balance: 750.25 },
  { id: "5", name: "May Parker", cardType: "maestro", balance: 3200.00 },
  { id: "6", name: "Gwen Stacy", cardType: "plus", balance: 925.75 },
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
const getUsers = (): UserAccount[] => {
  if (typeof window === 'undefined') return INITIAL_USERS; // SSR safety
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : INITIAL_USERS;
};

// Save users to localStorage
const saveUsers = (users: UserAccount[]) => {
  if (typeof window === 'undefined') return; // SSR safety
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// API methods that simulate server requests
export const api = {
  // Initialize the storage (call this on app start)
  initialize: () => {
    initializeStorage();
  },

  // Authenticate user by PIN
  authenticateUser: async (pin: string): Promise<UserAccount | null> => {
    await delay(800); // Simulate network delay
    
    const userId = PIN_TO_USER_ID[pin];
    if (!userId) return null;
    
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    return user || null;
  },

  // Get user balance
  getBalance: async (userId: string): Promise<number | null> => {
    await delay(500);
    
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    return user?.balance ?? null;
  },

  // Process withdrawal
  processWithdrawal: async (userId: string, amount: number): Promise<{ success: boolean; newBalance?: number; error?: string }> => {
    await delay(2000); // Longer delay for transaction processing
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { success: false, error: "User not found" };
    }
    
    const user = users[userIndex];
    if (user.balance < amount) {
      return { success: false, error: "Insufficient funds" };
    }
    
    // Update balance
    users[userIndex] = { ...user, balance: user.balance - amount };
    saveUsers(users);
    
    return { success: true, newBalance: users[userIndex].balance };
  },

  // Process deposit
  processDeposit: async (userId: string, amount: number): Promise<{ success: boolean; newBalance?: number; error?: string }> => {
    await delay(2000); // Longer delay for transaction processing
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { success: false, error: "User not found" };
    }
    
    const user = users[userIndex];
    
    // Update balance
    users[userIndex] = { ...user, balance: user.balance + amount };
    saveUsers(users);
    
    return { success: true, newBalance: users[userIndex].balance };
  },

  // Get updated user data
  getUser: async (userId: string): Promise<UserAccount | null> => {
    await delay(300);
    
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    return user || null;
  }
};