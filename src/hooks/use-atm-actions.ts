import { useATMStore } from '@/store/atm-store';

export type ATMActions = ReturnType<typeof useATMActions>["actions"];

export function useATMActions() {
  const {
    currentState,
    user,
    currentInput,
    authenticateUser,
    selectMainMenuOption,
    processTransaction,
    transitionTo,
    reset
  } = useATMStore();

  const actions = {
    startPinEntry: () => {
      transitionTo("pin-entry", "pin", 4);
    },
    
    enterPin: () => {
      if (currentInput.length === 4) {
        authenticateUser(currentInput);
      }
    },
    
    withdraw: () => selectMainMenuOption("withdraw"),
    deposit: () => selectMainMenuOption("deposit"),
    balance: () => selectMainMenuOption("balance"),
    
    processAmount: () => {
      if (currentInput && parseFloat(currentInput) > 0) {
        processTransaction(currentInput);
      }
    },
    
    exit: () => {
      // Go back to previous state based on current state
      if (currentState === "pin-entry") {
        transitionTo("idle");
      } else if (currentState === "withdraw-amount" || currentState === "deposit-amount" || currentState === "balance-display") {
        transitionTo("main-menu");
      } else if (currentState === "withdraw-complete" || currentState === "deposit-complete") {
        transitionTo("main-menu");
      } else {
        // Default: go to idle (full reset)
        reset();
      }
    },
  };

  return {
    currentState,
    user,
    actions
  };
}