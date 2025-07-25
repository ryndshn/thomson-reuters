import { useState } from "react";
import { CardType } from "@/lib/types";

type Screen = "pin-entry" | "main-menu" | "balance" | "withdraw" | "deposit";

interface UserInfo {
  card: CardType;
  name: string;
  balance: number;
}

export function useATMState() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("pin-entry");
  const [pin, setPin] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedCard, setSelectedCard] = useState<CardType>(null);
  const [balance, setBalance] = useState(0);

  // PIN to card mapping
  const pinToCardMap: Record<string, UserInfo> = {
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

  const handleBackToMenu = () => setCurrentScreen("main-menu");

  return {
    // State
    currentScreen,
    pin,
    userName,
    selectedCard,
    balance,
    
    // Setters
    setPin,
    setCurrentScreen,
    
    // Actions
    handlePinSubmit,
    handleWithdraw,
    handleDeposit,
    handleBalance,
    handleExit,
    handleBackToMenu,
  };
}