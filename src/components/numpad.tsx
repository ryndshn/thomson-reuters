"use client";

interface NumpadProps {
  onDigitPress: (digit: string) => void;
  onClear: () => void;
  onEnter: () => void;
  disabled?: boolean;
}

export default function Numpad({ onDigitPress, onClear, onEnter, disabled = false }: NumpadProps) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-300 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {digits.slice(0, 9).map((digit) => (
          <button
            key={digit}
            onClick={() => onDigitPress(digit)}
            disabled={disabled}
            className="w-12 h-12 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-400 text-white font-bold rounded border-2 border-gray-700 active:bg-gray-800"
          >
            {digit}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onClear}
          disabled={disabled}
          className="w-12 h-12 bg-red-600 hover:bg-red-500 disabled:bg-red-400 text-white font-bold rounded border-2 border-red-700 active:bg-red-800 text-xs"
        >
          CLR
        </button>
        
        <button
          onClick={() => onDigitPress('0')}
          disabled={disabled}
          className="w-12 h-12 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-400 text-white font-bold rounded border-2 border-gray-700 active:bg-gray-800"
        >
          0
        </button>
        
        <button
          onClick={onEnter}
          disabled={disabled}
          className="w-12 h-12 bg-green-600 hover:bg-green-500 disabled:bg-green-400 text-white font-bold rounded border-2 border-green-700 active:bg-green-800 text-xs"
        >
          OK
        </button>
      </div>
    </div>
  );
}