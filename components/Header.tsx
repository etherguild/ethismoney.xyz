"use client";
import Image from "next/image";
import EthUsdSwitch from "./EthUsdSwitch";
import HeaderLinks from "./HeaderLinks";
import StylizedButton from "./StylizedButton";
import { useUIContext } from "@/contexts/UIContext";

export default function Header() {
  const { scrollPosition } = useUIContext();
  return (
    <div className="fixed z-[99] left-0 right-0 top-0 flex justify-center pointer-events-none pb-[30px] desktop:pb-[50px]"
      style={{
        background: scrollPosition < 100 ? 'transparent' : `linear-gradient(
        176.28deg,
        #b7dde8 -4.56%,
        #f1f9fc 11.24%,
        #f1f9fc 27.05%
      ) 0% -0% / 100% 6317px`,
        transition: "background 0.3s",
        maskImage: "linear-gradient(to bottom, #000000ff 60%, #00000000 100%)",
      }}
    >
      <div className="flex w-full max-w-[1380px]">
        <header className={`flex h-fit gap-x-[15px] desktop:gap-x-[30px] justify-between items-start w-full mx-auto pl-[15px] pr-[15px] ${scrollPosition < 100 ? "pt-[30px] desktop:pt-[50px]" : "pt-[15px] desktop:pt-[50px]"}  desktop:pl-[30px] desktop:pr-[50px] transition-all duration-300`}>
          <div className="block desktop:invisible">
            <div
              className={`cursor-pointer pointer-events-auto z-[999] relative ${scrollPosition < 100 ? "opacity-0 size-[41px]" : "opacity-100 size-[28px]"} transition-all duration-300`}
              onClick={() => {
                // scroll to top 0, smooth
                window.scrollTo({ top: 0, behavior: "smooth" });

              }}
            >
              <Image src="/eth-is-money-logo.svg"
                alt="ETH is Money logo"
                fill={true}
                priority
              />
            </div>
          </div>
          <div className="flex h-fit gap-x-[15px] desktop:gap-x-[30px] justify-end items-start">
            <div className={`hidden desktop:flex ${scrollPosition < 100 ? "h-[41px] " : "h-auto"} desktop:h-auto items-center gap-x-[30px] pointer-events-auto`}>
              <HeaderLinks />
            </div>
            <div className="flex h-fit items-center gap-x-[10px] desktop:gap-x-[30px] pointer-events-auto">
              <StylizedButton className={`hidden desktop:flex ${scrollPosition < 100 ? "h-[41px] w-[105px] desktop:h-[44px] desktop:w-[112px] headline-md" : "h-[28px] w-[85px] desktop:h-[32px] desktop:w-[98px] headline-xs desktop:headline-xs"} transition-all duration-300`} onClick={
                () => {
                  const element = document.getElementById("sixth-section");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }>Join us</StylizedButton>
              <div className={`block h-full ${scrollPosition < 100 ? "opacity-0 desktop:opacity-100" : "opacity-100 desktop:opacity-100"} transition-all duration-300`}>
                <EthUsdSwitch />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
