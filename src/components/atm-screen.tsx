/* eslint-disable @next/next/no-img-element */
import { ButtonConfig } from "@/hooks/use-atm-buttons";
import { useATMStore } from "@/store/atm-store";
import { ATMButtonColumn } from "./atm-button-column";
import { topPadButtons } from "@/lib/buttons";
import { 
  BalanceScreen, 
  DepositAmountScreen, 
  DepositCompleteScreen, 
  IdleScreen, 
  MainMenuScreen, 
  PinEntryScreen, 
  WithdrawAmountScreen,
  WithdrawCompleteScreen
} from "./screens";
import { useATMActions } from "@/hooks/use-atm-actions";

export const ScreenContent = () => {
  const { 
    currentState, 
    isProcessing, 
    error 
  } = useATMStore();
  const { actions } = useATMActions();

  if (error) {
    const rightButtons = [{ label: "Exit", action: actions.exit }];
    return (
      <BaseScreen rightButtons={rightButtons}>
        <div className="text-center">
          <h2 className="text-sm text-red-300">Error</h2>
          <p className="text-xs text-red-200">{error}</p>
        </div>
      </BaseScreen>
    );
  }
  
  if (isProcessing) {
    return (
      <BaseScreen>
        <div className="text-center">
          <h2 className="text-sm">Processing...</h2>
          <div className="animate-pulse text-xs">Please wait</div>
        </div>
      </BaseScreen>
    );
  }
  
  switch (currentState) {
    case "idle":
      return <IdleScreen />;
      
    case "pin-entry":
      return <PinEntryScreen />;
    
    case "main-menu":
      return <MainMenuScreen />;
    
    case "balance-display":
      return <BalanceScreen />;
    
    case "withdraw-amount":
      return <WithdrawAmountScreen />;
      
    case "withdraw-complete":
      return <WithdrawCompleteScreen />;  
    
    case "deposit-amount":
      return <DepositAmountScreen />;
      
    case "deposit-complete":
      return <DepositCompleteScreen />;
    
    default:
      return null;
  }
}

function ATMScreen(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className="bg-blue-400 text-white font-mono flex flex-col relative">
      {/* Main Content Area - Upper 2/3, top-aligned */}
      <div className="h-48 flex items-start justify-center p-6 pt-8 text-center">
        {children}
      </div>
      
      {/* Button label area - Lower 1/3 */}
      <div className="flex-1"/>
      
      {/* Sticker Graffiti overlapping bottom-left of screen */}
      <div className="absolute -bottom-20 -left-10 z-10">
        <img
          src="/sticker_graf.png"
          alt="Sticker Graffiti"
          className="w-[150px] h-[85px]"
        />
      </div>
      
      {/* SYSTEMS image - positioned underneath and right-aligned to screen */}
      <div className="absolute -bottom-5 right-2">
        <img
          src="/systems.png"
          alt="Systems"
        />
      </div>
    </div>
  );
}

export const BaseScreen = (
  { 
    leftButtons,
    rightButtons,
    children 
  }: 
  {
    leftButtons?: (ButtonConfig | null)[];
    rightButtons?: (ButtonConfig | null)[];
    children: React.ReactNode;
  }) => {
    const leftButtonsAdjusted = topPadButtons(leftButtons || []);
    const rightButtonsAdjusted = topPadButtons(rightButtons || []);
    return (
      <div className="px-4">
        <div className="grid grid-cols-[80px_1fr_80px] h-[320px] gap-3">
          {/* Left Buttons Column */}
          <div className="flex flex-col justify-end pb-4 items-center">
            <div className="space-y-2">
              <ATMButtonColumn buttons={leftButtonsAdjusted} position="left" />
            </div>
          </div>

          {/* Screen */}
          <ATMScreen>
            {children}
          </ATMScreen>

          {/* Right Buttons Column */}
          <div className="flex flex-col justify-end pb-4 items-center">
            <div className="space-y-2">
              <ATMButtonColumn buttons={rightButtonsAdjusted} position="right" />
            </div>
          </div>
        </div>
      </div>
    )
}
