import { useATMActions } from "@/hooks/use-atm-actions";
import { BaseScreen} from "../atm-screen";

export const MainMenuScreen = () => {
  const { actions, user } = useATMActions();
  const leftButtons = [
    { label: "Withdraw", action: actions.withdraw },
    { label: "Deposit", action: actions.deposit },
  ];
  const rightButtons = [
    { label: "Balance", action: actions.balance },
    { label: "Exit", action: actions.exit }
  ];

  return (
    <BaseScreen leftButtons={leftButtons} rightButtons={rightButtons}>
      <div>
        <h2 className="text-sm">Hi {user?.name || "Guest"}!</h2>
        <p className="text-sm">Please make a choice...</p>
      </div>
    </BaseScreen>
  )
}
