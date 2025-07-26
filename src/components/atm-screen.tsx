import Image from "next/image";
import { ATMState, UserAccount, InputType } from "@/lib/types";
import { convertCentsToCurrency } from "@/lib/converters";

interface ATMScreenProps {
  currentState: ATMState;
  user: UserAccount | null;
  currentInput: string;
  inputType: InputType;
  isProcessing: boolean;
  error: string | null;
}

export default function ATMScreen({ 
  currentState, 
  user, 
  currentInput, 
  inputType, 
  isProcessing, 
  error 
}: ATMScreenProps) {
  const renderScreenContent = () => {
    if (error) {
      return (
        <div className="text-center">
          <h2 className="text-sm text-red-300">Error</h2>
          <p className="text-xs text-red-200">{error}</p>
        </div>
      );
    }
    
    if (isProcessing) {
      return (
        <div className="text-center">
          <h2 className="text-sm">Processing...</h2>
          <div className="animate-pulse text-xs">Please wait</div>
        </div>
      );
    }
    
    switch (currentState) {
      case "idle":
        return (
          <div className="text-center">
            <h2 className="text-lg leading-tight">Welcome to the<br />ATM</h2>
            <p className="text-xs mt-4">Press Enter PIN to begin</p>
          </div>
        );
        
      case "pin-entry":
        return (
          <div className="text-center">
            <h2 className="text-lg leading-tight">Enter Your PIN</h2>
            <div className="text-lg font-mono mt-4">
              {"*".repeat(currentInput.length)}
            </div>
            <p className="text-xs mt-2">Use keypad below</p>
          </div>
        );
      
      case "main-menu":
        return (
          <div>
            <h2 className="text-sm">Hi {user?.name || "Guest"}!</h2>
            <p className="text-sm">Please make a choice...</p>
          </div>
        );
      
      case "balance-display":
        return (
          <div>
            <h2 className="text-sm">Account Balance</h2>
            <div className="text-center mt-4">
              <div className="text-2xl font-bold">${convertCentsToCurrency(user?.balance)}</div>
            </div>
          </div>
        );
      
      case "withdraw-amount":
        return (
          <div>
            <h2 className="text-sm">Withdraw Funds</h2>
            <p className="text-sm">Current Balance: ${convertCentsToCurrency(user?.balance)}</p>
            {inputType === "amount" && (
              <div className="text-center text-lg font-mono mt-2">
                ${convertCentsToCurrency(currentInput)}
              </div>
            )}
            <div className="text-center text-xs mt-2">
              Enter amount on keypad
            </div>
          </div>
        );
        
      case "withdraw-complete":
        return (
          <div className="text-center">
            <h2 className="text-sm text-green-300">Transaction Complete</h2>
            <p className="text-xs">Please take your cash</p>
            <div className="text-xs mt-2">
              New balance: ${convertCentsToCurrency(user?.balance)}
            </div>
          </div>
        );
      
      case "deposit-amount":
        return (
          <div>
            <h2 className="text-sm">Deposit Funds</h2>
            <p className="text-sm">Current Balance: ${convertCentsToCurrency(user?.balance)}</p>
            {inputType === "amount" && (
              <div className="text-center text-lg font-mono mt-2">
                ${convertCentsToCurrency(currentInput)}
              </div>
            )}
            <div className="text-center text-xs mt-2">
              Enter amount on keypad
            </div>
          </div>
        );
        
      case "deposit-complete":
        return (
          <div className="text-center">
            <h2 className="text-sm text-green-300">Deposit Complete</h2>
            <p className="text-xs">Thank you for your deposit</p>
            <div className="text-xs mt-2">
              New balance: ${convertCentsToCurrency(user?.balance)}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-400 text-white font-mono flex flex-col relative">
      {/* Main Content Area - Upper 2/3, top-aligned */}
      <div className="h-48 flex items-start justify-center p-6 pt-8 text-center">
        <div className="text-lg">
          {renderScreenContent()}
        </div>
      </div>
      
      {/* Button label area - Lower 1/3 */}
      <div className="flex-1"></div>
      
      {/* Sticker Graffiti overlapping bottom-left of screen */}
      <div className="absolute -bottom-20 -left-10 z-10">
        <Image
          src="/sticker_graf.png"
          alt="Sticker Graffiti"
          width={150}
          height={85}
        />
      </div>
      
      {/* SYSTEMS image - positioned underneath and right-aligned to screen */}
      <div className="absolute -bottom-5 right-2">
        <Image
          src="/systems.png"
          alt="Systems"
          width={70}
          height={30}
          className="object-contain"
        />
      </div>
    </div>
  );
}