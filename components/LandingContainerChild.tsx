import { useUIContext } from "@/contexts/UIContext";
import React from "react";
import { CSS } from "react-spring";


interface LandingContainerChildProps {
    children: React.ReactNode;
    head?: string | React.ReactNode;
    height?: number;
    className?: string;
}

export default function LandingPageContainer({
    children,
    head,
    height,
    className,
}: LandingContainerChildProps): JSX.Element {
    const { isMobile } = useUIContext();
    return (
        <div className={`w-full flex flex-col gap-y-[10px] ${className || ""}`} style={{
            height: height && !isMobile ? `${height}px` : "auto",
        }}>

            {/* Head */}
            {head && <h3 className="headline-xl !leading-[41px]">{head}</h3>}
            <div className="flex gap-x-[30px]">
                {children}
            </div>
        </div>
    )
}