export type CardType = "star" | "pulse" | "maestro" | "mastercard" | "plus" | "visa" | null;

export const CARD_TYPES: Exclude<CardType, null>[] = ["star", "pulse", "maestro", "mastercard", "plus", "visa"];

export interface CardConfig {
  name: string;
  enabled: string;
  disabled: string;
}

export const CARD_CONFIGS: Record<Exclude<CardType, null>, CardConfig> = {
  star: {
    name: "Star",
    enabled: "/star.png",
    disabled: "/star_disabled.png"
  },
  pulse: {
    name: "Pulse", 
    enabled: "/pulse.png",
    disabled: "/pulse_disabled.png"
  },
  maestro: {
    name: "Maestro",
    enabled: "/maestro.png", 
    disabled: "/maestro_disabled.png"
  },
  mastercard: {
    name: "MasterCard",
    enabled: "/mastercard.png",
    disabled: "/mastercard_disabled.png"
  },
  plus: {
    name: "Plus",
    enabled: "/plus.png",
    disabled: "/plus_disabled.png"
  },
  visa: {
    name: "Visa", 
    enabled: "/visa.png",
    disabled: "/visa_disabled.png"
  }
};

// ATM State Machine Types
export type ATMState = 
  | "idle"
  | "pin-entry"
  | "main-menu"
  | "balance-display"
  | "withdraw-amount"
  | "withdraw-processing"
  | "withdraw-complete"
  | "deposit-amount"
  | "deposit-processing" 
  | "deposit-complete"
  | "error";

export type InputType = "pin" | "amount" | "none";

export interface UserAccount {
  id: string;
  name: string;
  cardType: CardType;
  balance: number; // in cents
}

export interface ATMSession {
  user: UserAccount | null;
  currentState: ATMState;
  inputType: InputType;
  currentInput: string;
  maxInputLength: number;
  isProcessing: boolean;
  error: string | null;
}

export interface ScreenContent {
  title: string;
  message: string;
  showInput: boolean;
  inputPlaceholder?: string;
}

export interface ButtonConfig {
  label: string;
  action: () => void;
}
