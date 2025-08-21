import { ButtonConfig } from "@/hooks/use-atm-buttons";

const MAX_BUTTONS_PER_SIDE = 4;

export const topPadButtons = (buttons: (ButtonConfig | null)[]) => {
  const paddedButtons = [...buttons];
  while (paddedButtons.length < MAX_BUTTONS_PER_SIDE) {
    paddedButtons.unshift(null);
  }
  return paddedButtons;
}