"use client"

export default function StylizedButton({ children, height, width, fontSize, onClick, className }: { children, height?: number, width?: number, fontSize?: number, onClick: () => void, className?: string }) {
    return (
        <div className={`text-blue1 bg-ice rounded-full border border-blue1 flex items-center justify-center font-semibold  cursor-pointer
            ${className || ""}`}
            style={{
                height: height + "px",
                width: width + "px",
                fontSize: fontSize ? fontSize + "px" : undefined,
            }}
            onClick={onClick}
        >
            {children}
        </div>
    )
}