"use client";

import CreditCardSprites from "./credit-card-sprites";
import ATMHeader from "./atm-header";
import ATMScreen from "./atm-screen";
import ATMButton from "./atm-button";
import { useATMState } from "@/hooks/use-atm-state";
import { useATMButtons } from "@/hooks/use-atm-buttons";

export default function ATM() {
  const atmState = useATMState();
  const { leftButtons, rightButtons } = useATMButtons(atmState);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* ATM Header */}
      <ATMHeader />

      {/* ATM Body Container */}
      <div className="relative bg-gray-200 w-[540px] h-[700px] shadow-2xl">
        {/* Credit Card Sprites */}
        <div className="px-6 pt-3 pb-6">
          <CreditCardSprites selectedCard={atmState.selectedCard} />
        </div>

        {/* Button/Screen Section */}
        <div className="px-4">
          <div className="grid grid-cols-[80px_1fr_80px] h-[320px] gap-3">
            {/* Left Buttons Column */}
            <div className="flex flex-col justify-end pb-4">
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => {
                  const button = leftButtons[index];
                  return (
                    <ATMButton
                      key={`left-${index}`}
                      position="left"
                      label={button?.label}
                      onClick={button?.action}
                      disabled={!button}
                    />
                  );
                })}
              </div>
            </div>

            {/* Screen */}
            <ATMScreen 
              currentScreen={atmState.currentScreen}
              userName={atmState.userName}
              balance={atmState.balance}
            />

            {/* Right Buttons Column */}
            <div className="flex flex-col justify-end pb-4">
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => {
                  const button = rightButtons[index];
                  return (
                    <ATMButton
                      key={`right-${index}`}
                      position="right"
                      label={button?.label}
                      onClick={button?.action}
                      disabled={!button}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SYSTEMS text */}
        <div className="absolute bottom-4 right-8 text-sm text-gray-600 font-mono">
          SYSTEMS
        </div>
      </div>
    </div>
  );
}