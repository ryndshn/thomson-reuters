import { useATMState } from "./use-atm-state";

type Screen = "pin-entry" | "main-menu" | "balance" | "withdraw" | "deposit";

interface ButtonConfig {
  label: string;
  action: () => void;
}

interface UseATMButtonsProps {
  currentScreen: Screen;
  handlePinSubmit: () => void;
  handleWithdraw: () => void;
  handleDeposit: () => void;
  handleBalance: () => void;
  handleExit: () => void;
  handleBackToMenu: () => void;
}

export function useATMButtons({
  currentScreen,
  handlePinSubmit,
  handleWithdraw,
  handleDeposit,
  handleBalance,
  handleExit,
  handleBackToMenu,
}: UseATMButtonsProps) {
  
  const getLeftButtons = (): (ButtonConfig | null)[] => {
    const buttons = Array(4).fill(null);
    
    if (currentScreen === "main-menu") {
      buttons[0] = { label: "Withdraw", action: handleWithdraw };
      buttons[1] = { label: "Deposit", action: handleDeposit };
    }
    
    return buttons;
  };

  const getRightButtons = (): (ButtonConfig | null)[] => {
    const buttons = Array(4).fill(null);
    
    if (currentScreen === "pin-entry") {
      buttons[3] = { label: "Enter PIN", action: handlePinSubmit };
    } else if (currentScreen === "main-menu") {
      buttons[0] = { label: "Exit", action: handleExit };
      buttons[1] = { label: "Balance", action: handleBalance };
      buttons[2] = { label: "Re-Enter PIN", action: handleExit };
    } else if (currentScreen === "balance" || currentScreen === "withdraw" || currentScreen === "deposit") {
      buttons[3] = { label: "Back to Menu", action: handleBackToMenu };
    }
    
    return buttons;
  };

  return {
    leftButtons: getLeftButtons(),
    rightButtons: getRightButtons(),
  };
}