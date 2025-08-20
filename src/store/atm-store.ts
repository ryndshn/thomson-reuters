import { create } from 'zustand';
import { ATMState, ATMSession, InputType } from '@/lib/types';
import { api } from '@/services/api';

interface ATMStore extends ATMSession {
  // Actions
  appendInput: (digit: string) => void;
  clearInput: () => void;
  setError: (error: string | null) => void;
  setProcessing: (processing: boolean) => void;
  
  // State transitions
  transitionTo: (state: ATMState, inputType?: InputType, maxLength?: number) => void;
  authenticateUser: (pin: string) => void;
  selectMainMenuOption: (option: "balance" | "withdraw" | "deposit") => void;
  processTransaction: (amount: string) => void;
  reset: () => void;
}

// Initialize API on module load
if (typeof window !== 'undefined') {
  api.initialize();
}

const initialState: ATMSession = {
  user: null,
  currentState: "idle",
  inputType: "none",
  currentInput: "",
  maxInputLength: 0,
  isProcessing: false,
  error: null,
};

export const useATMStore = create<ATMStore>((set, get) => ({
  ...initialState,

  appendInput: (digit: string) => {
    const { currentInput, maxInputLength } = get();
    if (currentInput.length < maxInputLength) {
      set({ 
        currentInput: currentInput + digit,
        error: null 
      });
    }
  },

  clearInput: () => {
    set({ currentInput: "" });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setProcessing: (isProcessing: boolean) => {
    set({ isProcessing });
  },

  transitionTo: (state: ATMState, inputType: InputType = "none", maxLength: number = 0) => {
    set({
      currentState: state,
      inputType,
      maxInputLength: maxLength,
      currentInput: "",
      error: null,
      isProcessing: false,
    });
  },

  authenticateUser: async (pin: string) => {
    const store = get();
    store.setProcessing(true);
    
    try {
      const user = await api.authenticateUser(pin);
      
      if (user) {
        set({ 
          user,
          currentState: "main-menu",
          inputType: "none",
          currentInput: "",
          error: null,
          isProcessing: false,
        });
      } else {
        store.setError("Invalid PIN. Please try again.");
        store.clearInput();
      }
    } catch {
      store.setError("Authentication failed. Please try again.");
      store.clearInput();
    }

    store.setProcessing(false);
  },

  selectMainMenuOption: (option: "balance" | "withdraw" | "deposit") => {
    const store = get();
    
    switch (option) {
      case "balance":
        store.transitionTo("balance-display");
        break;
      case "withdraw":
        store.transitionTo("withdraw-amount", "amount", 8);
        break;
      case "deposit":
        store.transitionTo("deposit-amount", "amount", 8);
        break;
      default:
        store.setError("Invalid option selected");
    }
  },

  processTransaction: async (amount: string) => {
    const { currentState, user } = get();
    const store = get();
    const amountNum = parseFloat(amount);

    if (!user || isNaN(amountNum) || amountNum <= 0) {
      store.setError("Invalid amount");
      return;
    }

    store.setProcessing(true);

    try {
      if (currentState === "withdraw-amount") {
        const result = await api.processWithdrawal(user.id, amountNum);
        
        if (result.success) {
          set(state => ({
            user: state.user ? { ...state.user, balance: result.newBalance! } : null,
            currentState: "withdraw-complete",
            inputType: "none",
            currentInput: "",
            isProcessing: false,
            error: null,
          }));
        } else {
          store.setError(result.error || "Transaction failed");
        }
      } else if (currentState === "deposit-amount") {
        const result = await api.processDeposit(user.id, amountNum);
        
        if (result.success) {
          set(state => ({
            user: state.user ? { ...state.user, balance: result.newBalance! } : null,
            currentState: "deposit-complete", 
            inputType: "none",
            currentInput: "",
            isProcessing: false,
            error: null,
          }));
        } else {
          store.setError(result.error || "Transaction failed");
        }
      }
    } catch {
      store.setError("Transaction failed. Please try again.");
    }

    store.setProcessing(false);
  },

  reset: () => {
    set(initialState);
  },
}));