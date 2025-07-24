export type CardType = "star" | "pulse" | "maestro" | "mastercard" | "plus" | "visa" | null;

export const CARD_TYPES: Exclude<CardType, null>[] = ["star", "pulse", "maestro", "mastercard", "plus", "visa"];

export interface CardConfig {
  name: string;
  enabled: string;
  disabled: string;
}

export const CARD_CONFIGS: Record<Exclude<CardType, null>, CardConfig> = {
  star: {
    name: "Star",
    enabled: "/star.png",
    disabled: "/star_disabled.png"
  },
  pulse: {
    name: "Pulse", 
    enabled: "/pulse.png",
    disabled: "/pulse_disabled.png"
  },
  maestro: {
    name: "Maestro",
    enabled: "/maestro.png", 
    disabled: "/maestro_disabled.png"
  },
  mastercard: {
    name: "MasterCard",
    enabled: "/mastercard.png",
    disabled: "/mastercard_disabled.png"
  },
  plus: {
    name: "Plus",
    enabled: "/plus.png",
    disabled: "/plus_disabled.png"
  },
  visa: {
    name: "Visa", 
    enabled: "/visa.png",
    disabled: "/visa_disabled.png"
  }
};