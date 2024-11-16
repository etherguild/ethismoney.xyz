"use client";
import { useEffect, useState } from "react";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";
import { track } from "@vercel/analytics";
import { useUIContext } from "@/contexts/UIContext";

type EthUsdSwitchProps = {
  isMobile?: boolean;
};

export default function EthUsdSwitch({ isMobile }: EthUsdSwitchProps) {
  const { scrollPosition } = useUIContext();

  const [mounted, setMounted] = useState(false);
  const [showUsd, setShowUsd] = useLocalStorage("showUsd", false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (showUsd === true) {
      track("changed to ETH", {
        location: isMobile ? "mobile Menu" : "desktop Header",
        page: window.location.pathname,
      });
    } else {
      track("changed to USD", {
        location: isMobile ? "mobile Menu" : "desktop Header",
        page: window.location.pathname,
      });
    }
    setShowUsd(!showUsd);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="select-none flex justify-between">
      <div className="flex items-center">
        <input type="checkbox" className="hidden" />
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          {/* <div
            className="mr-2 font-medium"
            onClick={() => {
              setShowUsd(showUsd ? false : true);
            }}
          >
            {showUsd === true ? <>USD</> : <>ETH</>}
          </div> */}
          <div
            className="relative text-sm md:text-base font-semibold"
            onClick={() => {
              setShowUsd(showUsd ? false : true);
            }}
          >
            <div
              className={`w-[80px] h-[22px] text-[13px] ${scrollPosition < 100 ? "desktop:w-[109px] desktop:h-[44px]" : "desktop:w-[93px] desktop:h-[32px]"}  flex justify-between items-center px-2 md:px-[10px] rounded-full transition-all duration-300 ease-in-out text-ice bg-blue1`}
            >
              <div className={`${scrollPosition < 100 ? "headline-md" : "headline-xs"} transition-all duration-300`}>ETH</div>
              <div className={`${scrollPosition < 100 ? "headline-md" : "headline-xs"} transition-all duration-300`}>USD</div>
            </div>
            <div
              className={`absolute left-[2px] top-[2px] md:left-0.5 md:top-0.5 w-[38px] h-[18px] ${scrollPosition < 100 ? "desktop:w-[51px] desktop:h-[40px] headline-md" : "desktop:w-[43px] desktop:h-[28px] headline-xs"} rounded-full transition-all duration-300 ease-in-out text-blue1 bg-ice flex items-center justify-center 
              ${showUsd ? "transform translate-x-[calc(100%+3px)]" : "translate-x-0"}`}
            >
              {showUsd === true ? <>USD</> : <>ETH</>}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
