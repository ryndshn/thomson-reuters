"use client";

import CreditCardSprites from "./credit-card-sprites";
import ATMHeader from "./atm-header";
import { ScreenContent } from "./atm-screen";
import Numpad from "./numpad";
import { useATMStore } from "@/store/atm-store";
import { useATMActions } from "@/hooks/use-atm-actions";

export default function ATM() {
  const {
    user,
    currentState,
    inputType,
    isProcessing,
    appendInput,
    clearInput,
  } = useATMStore();
  
  const { actions } = useATMActions();
    
  const handleNumpadDigit = (digit: string) => {
    appendInput(digit);
  };
  
  const handleNumpadClear = () => {
    clearInput();
  };
  
  const handleNumpadEnter = () => {
    if (currentState === "pin-entry") {
      actions.enterPin();
    } else if (currentState === "withdraw-amount" || currentState === "deposit-amount") {
      actions.processAmount();
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* ATM Header */}
      <ATMHeader />

      {/* ATM Body Container */}
      <div className="relative bg-gray-200 w-[540px] h-[700px] shadow-2xl">
        {/* Credit Card Sprites */}
        <div className="px-6 pt-3 pb-6">
          <CreditCardSprites selectedCard={user?.cardType || null} />
        </div>

        <ScreenContent />
        
        {/* Numpad - only show when input is needed */}
        {inputType !== "none" && (
          <Numpad
            onDigitPress={handleNumpadDigit}
            onClear={handleNumpadClear}
            onEnter={handleNumpadEnter}
            disabled={isProcessing}
          />
        )}
      </div>
    </div>
  );
}