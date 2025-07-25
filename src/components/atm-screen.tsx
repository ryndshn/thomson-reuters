import Image from "next/image";

type Screen = "pin-entry" | "main-menu" | "balance" | "withdraw" | "deposit";

interface ATMScreenProps {
  currentScreen: Screen;
  userName: string;
  balance: number;
}

export default function ATMScreen({ currentScreen, userName, balance }: ATMScreenProps) {
  const renderScreenContent = () => {
    switch (currentScreen) {
      case "pin-entry":
        return (
          <div className="text-center">
            <h2 className="text-lg leading-tight">Welcome to the<br />ATM</h2>
          </div>
        );
      
      case "main-menu":
        return (
          <div>
            <h2 className="text-sm">Hi {userName}!</h2>
            <p className="text-sm">Please make a choice...</p>
          </div>
        );
      
      case "balance":
        return (
          <div>
            <h2 className="text-sm">Account Balance</h2>
            <div className="text-center mt-4">
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            </div>
          </div>
        );
      
      case "withdraw":
        return (
          <div>
            <h2 className="text-sm">Withdraw Funds</h2>
            <p className="text-sm">Current Balance: ${balance.toFixed(2)}</p>
            <div className="text-center text-sm mt-4">
              Select amount on keypad
            </div>
          </div>
        );
      
      case "deposit":
        return (
          <div>
            <h2 className="text-sm">Deposit Funds</h2>
            <p className="text-sm">Current Balance: ${balance.toFixed(2)}</p>
            <div className="text-center text-sm mt-4">
              Insert bills or checks
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
      <div className="absolute -bottom-6 -left-8 z-10">
        <Image
          src="/sticker_graf.png"
          alt="Sticker Graffiti"
          width={90}
          height={65}
        />
      </div>
    </div>
  );
}