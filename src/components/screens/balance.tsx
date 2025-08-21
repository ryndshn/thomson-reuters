import { useATMActions } from "@/hooks/use-atm-actions";
import { BaseScreen} from "../atm-screen";
import { convertCentsToCurrency } from "@/lib/converters";

export const BalanceScreen = () => {
  const { actions, user } = useATMActions();
  const rightButtons = [
    { label: "Exit", action: actions.exit }
  ];

  return (
    <BaseScreen rightButtons={rightButtons}>
      <div>
          <h2 className="text-sm">Account Balance</h2>
          <div className="text-center mt-4">
            <div className="text-2xl font-bold">${convertCentsToCurrency(user?.balance)}</div>
          </div>
        </div>
    </BaseScreen>
  )
}
