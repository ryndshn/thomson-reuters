import { ATMState } from "@/lib/types";
import { ATMActions } from "./use-atm-actions";

interface ButtonConfig {
  label: string;
  action: () => void;
}

interface UseATMButtonsProps {
  currentState: ATMState;
  actions: ATMActions;
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
    }
    
    return buttons;
  };

  return {
    leftButtons: getLeftButtons(),
    rightButtons: getRightButtons(),
  };
}