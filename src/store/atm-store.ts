import { create } from 'zustand';
import { ATMState, ATMSession, UserAccount, InputType, CardType } from '@/lib/types';

interface ATMStore extends ATMSession {
  // Actions
  setCurrentInput: (input: string) => void;
  appendInput: (digit: string) => void;
  clearInput: () => void;
  setError: (error: string | null) => void;
  setProcessing: (processing: boolean) => void;
  
  // State transitions
  transitionTo: (state: ATMState, inputType?: InputType, maxLength?: number) => void;
  authenticateUser: (pin: string) => void;
  selectMainMenuOption: (option: string) => void;
  processTransaction: (amount: string) => void;
  reset: () => void;
}

// PIN to user mapping
const PIN_TO_USER_MAP: Record<string, UserAccount> = {
  "1234": { id: "1", name: "Peter Parker", cardType: "mastercard", balance: 2500.00 },
  "5678": { id: "2", name: "Mary Jane", cardType: "visa", balance: 1850.50 },
  "9999": { id: "3", name: "Spider-Man", cardType: "star", balance: 10000.00 },
  "1111": { id: "4", name: "Ben Parker", cardType: "pulse", balance: 750.25 },
  "2222": { id: "5", name: "May Parker", cardType: "maestro", balance: 3200.00 },
  "3333": { id: "6", name: "Gwen Stacy", cardType: "plus", balance: 925.75 },
};

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

  setCurrentInput: (input: string) => {
    const { maxInputLength } = get();
    if (input.length <= maxInputLength) {
      set({ currentInput: input, error: null });
    }
  },

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
    set({ currentInput: "", error: null });
  },

  setError: (error: string | null) => {
    set({ error, isProcessing: false });
  },

  setProcessing: (processing: boolean) => {
    set({ isProcessing: processing });
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

  authenticateUser: (pin: string) => {
    const store = get();
    const user = PIN_TO_USER_MAP[pin];
    
    if (user) {
      set({ 
        user,
        currentState: "main-menu",
        inputType: "none",
        currentInput: "",
        error: null,
      });
    } else {
      store.setError("Invalid PIN. Please try again.");
      store.clearInput();
    }
  },

  selectMainMenuOption: (option: string) => {
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

  processTransaction: (amount: string) => {
    const { currentState, user } = get();
    const store = get();
    const amountNum = parseFloat(amount);

    if (!user || isNaN(amountNum) || amountNum <= 0) {
      store.setError("Invalid amount");
      return;
    }

    store.setProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      if (currentState === "withdraw-amount") {
        if (amountNum > user.balance) {
          store.setError("Insufficient funds");
          store.setProcessing(false);
        } else {
          set(state => ({
            user: state.user ? { ...state.user, balance: state.user.balance - amountNum } : null,
            currentState: "withdraw-complete",
            inputType: "none",
            currentInput: "",
            isProcessing: false,
          }));
        }
      } else if (currentState === "deposit-amount") {
        set(state => ({
          user: state.user ? { ...state.user, balance: state.user.balance + amountNum } : null,
          currentState: "deposit-complete", 
          inputType: "none",
          currentInput: "",
          isProcessing: false,
        }));
      }
    }, 2000);
  },

  reset: () => {
    set(initialState);
  },
}));