"use client";

import { useState } from "react";
import Image from "next/image";
import CreditCardSprites from "./credit-card-sprites";
import ATMButton from "./atm-button";
import { CardType } from "@/lib/types";

type Screen = "pin-entry" | "main-menu" | "balance" | "withdraw" | "deposit";

export default function ATM() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("pin-entry");
  const [pin, setPin] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedCard, setSelectedCard] = useState<CardType>(null);
  const [balance, setBalance] = useState(0);

  // PIN to card mapping
  const pinToCardMap: Record<string, { card: CardType; name: string; balance: number }> = {
    "1234": { card: "mastercard", name: "Peter Parker", balance: 2500.00 },
    "5678": { card: "visa", name: "Mary Jane", balance: 1850.50 },
    "9999": { card: "star", name: "Spider-Man", balance: 10000.00 },
    "1111": { card: "pulse", name: "Ben Parker", balance: 750.25 },
    "2222": { card: "maestro", name: "May Parker", balance: 3200.00 },
    "3333": { card: "plus", name: "Gwen Stacy", balance: 925.75 },
  };

  const handlePinSubmit = () => {
    const userInfo = pinToCardMap[pin];
    if (userInfo) {
      setUserName(userInfo.name);
      setSelectedCard(userInfo.card);
      setBalance(userInfo.balance);
      setCurrentScreen("main-menu");
    }
    setPin("");
  };

  const handleWithdraw = () => setCurrentScreen("withdraw");
  const handleDeposit = () => setCurrentScreen("deposit");
  const handleBalance = () => setCurrentScreen("balance");
  const handleExit = () => {
    setCurrentScreen("pin-entry");
    setPin("");
    setUserName("");
    setSelectedCard(null);
    setBalance(0);
  };

  // Get button configs for each position
  const getLeftButtons = () => {
    const buttons = Array(4).fill(null);
    
    if (currentScreen === "main-menu") {
      buttons[0] = { label: "Withdraw", action: handleWithdraw };
      buttons[1] = { label: "Deposit", action: handleDeposit };
    }
    
    return buttons;
  };

  const getRightButtons = () => {
    const buttons = Array(4).fill(null);
    
    if (currentScreen === "pin-entry") {
      buttons[3] = { label: "Enter PIN", action: handlePinSubmit };
    } else if (currentScreen === "main-menu") {
      buttons[0] = { label: "Exit", action: handleExit };
      buttons[1] = { label: "Balance", action: handleBalance };
      buttons[2] = { label: "Re-Enter PIN", action: handleExit };
    } else if (currentScreen === "balance" || currentScreen === "withdraw" || currentScreen === "deposit") {
      buttons[3] = { label: "Back to Menu", action: () => setCurrentScreen("main-menu") };
    }
    
    return buttons;
  };

  // Screen content based on current state
  const renderScreenContent = () => {
    switch (currentScreen) {
      case "pin-entry":
        return (
          <div className="text-center">
            <h2 className="text-sm leading-tight">Welcome to the<br />ATM</h2>
          </div>
        );
      
      case "main-menu":
        return (
          <div>
            <h2 className="text-xs">Hi {userName}!</h2>
            <p className="text-xs">Please make a choice...</p>
          </div>
        );
      
      case "balance":
        return (
          <div>
            <h2 className="text-xs">Account Balance</h2>
            <div className="text-center mt-4">
              <div className="text-lg font-bold">${balance.toFixed(2)}</div>
            </div>
          </div>
        );
      
      case "withdraw":
        return (
          <div>
            <h2 className="text-xs">Withdraw Funds</h2>
            <p className="text-xs">Current Balance: ${balance.toFixed(2)}</p>
            <div className="text-center text-xs mt-4">
              Select amount on keypad
            </div>
          </div>
        );
      
      case "deposit":
        return (
          <div>
            <h2 className="text-xs">Deposit Funds</h2>
            <p className="text-xs">Current Balance: ${balance.toFixed(2)}</p>
            <div className="text-center text-xs mt-4">
              Insert bills or checks
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const leftButtons = getLeftButtons();
  const rightButtons = getRightButtons();

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* ATM Logo - Separate Container */}
      <div className="relative">
        <Image
          src="/atm_sign.png"
          alt="ATM Sign"
          width={320}
          height={65}
          className="rounded-lg"
        />
        <Image
          src="/graffiti.png"
          alt="Graffiti"
          width={45}
          height={30}
          className="absolute top-1 right-4"
        />
      </div>

      {/* ATM Body Container */}
      <div className="relative bg-gray-200 w-[280px] h-[500px] shadow-2xl">
        {/* Credit Card Sprites */}
        <div className="px-4 pt-2 pb-4">
          <CreditCardSprites selectedCard={selectedCard} />
        </div>

        {/* Button/Screen Section */}
        <div className="px-2">
          <div className="grid grid-cols-[50px_1fr_50px] h-[280px] gap-1">
            {/* Left Buttons Column */}
            <div className="flex flex-col justify-evenly">
              {leftButtons.map((button, index) => (
                <ATMButton
                  key={`left-${index}`}
                  position="left"
                  label={button?.label}
                  onClick={button?.action}
                  disabled={!button}
                />
              ))}
            </div>

            {/* Screen Column */}
            <div className="bg-blue-400 text-white font-mono text-xs p-3 text-center relative">
              {renderScreenContent()}
              
              {/* Sticker Graffiti overlapping bottom-left of screen */}
              <div className="absolute -bottom-4 -left-6 z-10">
                <Image
                  src="/sticker_graf.png"
                  alt="Sticker Graffiti"
                  width={70}
                  height={50}
                />
              </div>
            </div>

            {/* Right Buttons Column */}
            <div className="flex flex-col justify-evenly">
              {rightButtons.map((button, index) => (
                <ATMButton
                  key={`right-${index}`}
                  position="right"
                  label={button?.label}
                  onClick={button?.action}
                  disabled={!button}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SYSTEMS text */}
        <div className="absolute bottom-2 right-4 text-xs text-gray-600 font-mono">
          SYSTEMS
        </div>
      </div>
    </div>
  );
}