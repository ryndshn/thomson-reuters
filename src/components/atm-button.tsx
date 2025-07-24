interface ATMButtonProps {
  position: "left" | "right";
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ATMButton({ position, label, onClick, disabled = false }: ATMButtonProps) {
  return (
    <div className="relative">
      {/* Physical Button - Larger size */}
      <button 
        className="w-16 h-8 bg-gray-500 rounded-sm hover:bg-gray-600 shadow-inner border border-gray-600 disabled:opacity-50"
        onClick={onClick}
        disabled={disabled}
      />
      
      {/* Label absolutely positioned into the screen area - positioned for lower half */}
      {label && (
        <div 
          className={`absolute text-sm text-white font-mono whitespace-nowrap
            ${position === "left" 
              ? "left-full ml-6" // More distance for larger layout
              : "right-full mr-6" // More distance for larger layout
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