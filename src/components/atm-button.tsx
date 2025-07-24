interface ATMButtonProps {
  position: "left" | "right";
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ATMButton({ position, label, onClick, disabled = false }: ATMButtonProps) {
  return (
    <div className="relative">
      {/* Physical Button */}
      <button 
        className="w-12 h-6 bg-gray-500 rounded-sm hover:bg-gray-600 shadow-inner border border-gray-600 disabled:opacity-50"
        onClick={onClick}
        disabled={disabled}
      />
      
      {/* Label absolutely positioned into the screen area */}
      {label && (
        <div 
          className={`absolute text-xs text-white font-mono whitespace-nowrap
            ${position === "left" 
              ? "left-full ml-4" // Position to the right of left button
              : "right-full mr-4" // Position to the left of right button
            }`}
          style={{
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}