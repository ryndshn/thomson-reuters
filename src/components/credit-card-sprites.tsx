import Image from "next/image";
import { CardType, CARD_TYPES, CARD_CONFIGS } from "@/lib/types";

interface CreditCardSpritesProps {
  selectedCard: CardType;
}

export default function CreditCardSprites({ selectedCard }: CreditCardSpritesProps) {
  return (
    <div className="flex justify-center items-center py-2 px-4 gap-1">
      {CARD_TYPES.map((cardType) => {
        const isSelected = selectedCard === cardType;
        const cardConfig = CARD_CONFIGS[cardType];
        const imageSrc = isSelected ? cardConfig.enabled : cardConfig.disabled;
        
        return (
          <div key={cardType} className="w-[50px] h-[25px] flex items-center justify-center">
            <Image
              src={imageSrc}
              alt={`${cardConfig.name} card`}
              width={40}
              height={25}
              className="object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}