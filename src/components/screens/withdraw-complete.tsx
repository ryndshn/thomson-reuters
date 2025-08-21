import { useATMActions } from "@/hooks/use-atm-actions";
import { BaseScreen} from "../atm-screen";
import { convertCentsToCurrency } from "@/lib/converters";
import { useATMStore } from "@/store/atm-store";

export const WithdrawCompleteScreen = () => {
  const { user } = useATMStore();
  const { actions } = useATMActions();
  const rightButtons = [
    { label: "Exit", action: actions.exit }
  ];

  return (
    <BaseScreen rightButtons={rightButtons}>
      <div className="text-center">
          <h2 className="text-sm text-green-300">Transaction Complete</h2>
          <p className="text-xs">Please take your cash</p>
          <div className="text-xs mt-2">
            New balance: ${convertCentsToCurrency(user?.balance)}
          </div>
        </div>
    </BaseScreen>
  )
}
