"use client";

import CreditCardSprites from "./credit-card-sprites";
import ATMHeader from "./atm-header";
import ATMScreen from "./atm-screen";
import Numpad from "./numpad";
import { useATMStore } from "@/store/atm-store";
import { useATMActions } from "@/hooks/use-atm-actions";
import { useATMButtons } from "@/hooks/use-atm-buttons";
import { ATMButtonColumn } from "./atm-button-column";

export default function ATM() {
  const {
    user,
    currentState,
    inputType,
    currentInput,
    isProcessing,
    error,
    appendInput,
    clearInput,
  } = useATMStore();
  
  const { actions } = useATMActions();
  
  const { leftButtons, rightButtons } = useATMButtons();
  
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

        {/* Button/Screen Section */}
        <div className="px-4">
          <div className="grid grid-cols-[80px_1fr_80px] h-[320px] gap-3">
            {/* Left Buttons Column */}
            <div className="flex flex-col justify-end pb-4 items-center">
              <div className="space-y-2">
                <ATMButtonColumn buttons={leftButtons} position="left" />
              </div>
            </div>

            {/* Screen */}
            <ATMScreen 
              currentState={currentState}
              user={user}
              currentInput={currentInput}
              inputType={inputType}
              isProcessing={isProcessing}
              error={error}
            />

            {/* Right Buttons Column */}
            <div className="flex flex-col justify-end pb-4 items-center">
              <div className="space-y-2">
                <ATMButtonColumn buttons={rightButtons} position="right" />
              </div>
            </div>
          </div>
        </div>


        
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