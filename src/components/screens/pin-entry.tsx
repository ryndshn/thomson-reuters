import { useATMActions } from "@/hooks/use-atm-actions";
import { BaseScreen } from "./base-screen";
import { useATMStore } from "@/store/atm-store";

export const PinEntryScreen = () => {
  const { currentInput } = useATMStore();
  const { actions } = useATMActions();
  const rightButtons = [{ label: "Exit", action: actions.exit }];

  return (
    <BaseScreen rightButtons={rightButtons}>
       <div className="text-center">
          <h2 className="text-lg leading-tight">Enter Your PIN</h2>
          <div className="text-lg font-mono mt-4">
            {"*".repeat(currentInput.length)}
          </div>
          <p className="text-xs mt-2">Use keypad below</p>
        </div>
    </BaseScreen>
  )
}
