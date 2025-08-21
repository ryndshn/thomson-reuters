/* eslint-disable @next/next/no-img-element */
import { useATMStore } from "@/store/atm-store";
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
import { BaseScreen } from "./screens/base-screen";

export const ATMScreen = () => {
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
