import { useATMActions } from "@/hooks/use-atm-actions";
import { BaseScreen} from "../atm-screen";

export const IdleScreen = () => {
  const { actions } = useATMActions();
  const rightButtons = [{ label: "Enter PIN", action: actions.startPinEntry }];

  return (
    <BaseScreen rightButtons={rightButtons}>
      <div className="text-center">
        <h2 className="text-lg leading-tight">Welcome to the<br />ATM</h2>
        <p className="text-xs mt-4">Press Enter PIN to begin</p>
      </div>
    </BaseScreen>
  )
}
