import ATMButton from "./atm-button";

interface ButtonConfig {
  label: string;
  action: () => void;
}

interface ATMButtonPanelProps {
  leftButtons: (ButtonConfig | null)[];
  rightButtons: (ButtonConfig | null)[];
}

export default function ATMButtonPanel({ leftButtons, rightButtons }: ATMButtonPanelProps) {
  return (
    <div className="grid grid-cols-[80px_1fr_80px] h-[320px] gap-3">
      {/* Left Buttons Column - only occupy lower 1/3 */}
      <div className="flex flex-col justify-end pb-4">
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => {
            const button = leftButtons[index];
            return (
              <ATMButton
                key={`left-${index}`}
                position="left"
                label={button?.label}
                onClick={button?.action}
                disabled={!button}
              />
            );
          })}
        </div>
      </div>

      {/* Screen Column - This will be filled by the screen component */}
      <div className="contents">
        {/* Screen component will go here */}
      </div>

      {/* Right Buttons Column - only occupy lower 1/3 */}
      <div className="flex flex-col justify-end pb-4">
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => {
            const button = rightButtons[index];
            return (
              <ATMButton
                key={`right-${index}`}
                position="right"
                label={button?.label}
                onClick={button?.action}
                disabled={!button}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}