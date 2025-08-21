import { useATMActions } from "@/hooks/use-atm-actions";
import { BaseScreen} from "../atm-screen";
import { convertCentsToCurrency } from "@/lib/converters";
import { useATMStore } from "@/store/atm-store";

export const DepositAmountScreen = () => {
  const { user, currentInput, inputType } = useATMStore();
  const { actions } = useATMActions();
  const rightButtons = [
    { label: "Exit", action: actions.exit }
  ];

  return (
    <BaseScreen rightButtons={rightButtons}>
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
    </BaseScreen>
  )
}
