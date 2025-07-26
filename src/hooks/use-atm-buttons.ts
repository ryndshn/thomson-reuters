import { useATMStore } from "@/store/atm-store";
import { useATMActions } from "./use-atm-actions";

export interface ButtonConfig {
  label: string;
  action: () => void;
}

const MAX_BUTTONS_PER_SIDE = 4;

export function useATMButtons() {
  const { currentState } = useATMStore();
  const { actions } = useATMActions();
  const topPadButtons = (buttons: (ButtonConfig | null)[]) => {
    const paddedButtons = [...buttons];
    while (paddedButtons.length < MAX_BUTTONS_PER_SIDE) {
      paddedButtons.unshift(null);
    }
    return paddedButtons;
  }
  
    let leftButtons: (ButtonConfig | null)[] = [];
    if (currentState === "main-menu") {
      leftButtons = [
        { label: "Withdraw", action: actions.withdraw },
        { label: "Deposit", action: actions.deposit },
      ];
    }
    

    const rightButtons: (ButtonConfig | null)[] = [];
    // Always show Exit button on top right (except in idle state)
    if (currentState !== "idle") {
      rightButtons.push({ label: "Exit", action: actions.exit });
    }
    
    if (currentState === "idle") {
      rightButtons.push({ label: "Enter PIN", action: actions.startPinEntry });
    } else if (currentState === "main-menu") {
      rightButtons.push({ label: "Balance", action: actions.balance });
    }

  return {
    leftButtons: topPadButtons(leftButtons),
    rightButtons: topPadButtons(rightButtons),
  };
}