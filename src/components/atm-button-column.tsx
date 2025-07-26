import ATMButton from "./atm-button";
import { ButtonConfig } from "@/hooks/use-atm-buttons";

interface ATMButtonColumnProps {
  buttons: (ButtonConfig | null)[];
  position: "left" | "right";
}

export const ATMButtonColumn = ({ buttons, position }: ATMButtonColumnProps) =>  
   buttons.map((button, index) => (
    <ATMButton
      key={`${button?.label}-${index}`}
      position={position}
      label={button?.label}
      onClick={button?.action}
    />
   )
  );
