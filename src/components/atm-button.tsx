interface ATMButtonProps {
  position: "left" | "right";
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ATMButton({ position, label, onClick, disabled = false }: ATMButtonProps) {
  return (
    <div className="relative">
      <button 
        className="w-16 h-8 bg-gray-500 rounded-sm hover:bg-gray-600 shadow-inner border border-gray-600 disabled:opacity-50"
        onClick={onClick}
        disabled={disabled}
      />
      
      {/* Label absolutely positioned into the screen area - positioned for lower half */}
      {label && (
        <div 
          className={`absolute text-sm text-white font-mono whitespace-nowrap z-10
            ${position === "left" 
              ? "left-full ml-6" // Position to the right of left buttons (into screen)
              : "right-full mr-6" // Position to the left of right buttons (into screen)
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