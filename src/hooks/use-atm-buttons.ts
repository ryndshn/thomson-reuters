import { ATMState } from "@/lib/types";

interface ButtonConfig {
  label: string;
  action: () => void;
}

interface UseATMButtonsProps {
  currentState: ATMState;
  actions: {
    startPinEntry: () => void;
    enterPin: () => void;
    withdraw: () => void;
    deposit: () => void;
    balance: () => void;
    processAmount: () => void;
    backToMenu: () => void;
    exit: () => void;
  };
}

export function useATMButtons({
  currentState,
  actions,
}: UseATMButtonsProps) {
  
  const getLeftButtons = (): (ButtonConfig | null)[] => {
    const buttons = Array(4).fill(null);
    
    if (currentState === "main-menu") {
      buttons[0] = { label: "Withdraw", action: actions.withdraw };
      buttons[1] = { label: "Deposit", action: actions.deposit };
    }
    
    return buttons;
  };

  const getRightButtons = (): (ButtonConfig | null)[] => {
    const buttons = Array(4).fill(null);
    
    // Always show Exit button on top right (except in idle state)
    if (currentState !== "idle") {
      buttons[0] = { label: "Exit", action: actions.exit };
    }
    
    if (currentState === "idle") {
      buttons[3] = { label: "Enter PIN", action: actions.startPinEntry };
    } else if (currentState === "main-menu") {
      buttons[1] = { label: "Balance", action: actions.balance };
      buttons[2] = { label: "Re-Enter PIN", action: actions.exit };
    } else if (currentState === "balance-display" || currentState === "withdraw-complete" || currentState === "deposit-complete") {
      buttons[3] = { label: "Back to Menu", action: actions.backToMenu };
    } else if (currentState === "withdraw-amount" || currentState === "deposit-amount") {
      buttons[3] = { label: "Process", action: actions.processAmount };
    }
    
    return buttons;
  };

  return {
    leftButtons: getLeftButtons(),
    rightButtons: getRightButtons(),
  };
}