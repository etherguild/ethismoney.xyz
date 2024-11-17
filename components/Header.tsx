"use client";
import Image from "next/image";

import Icon from "./Icon";
import EthUsdSwitch from "./EthUsdSwitch";

import Banner from "@/components/Banner";
import Link from "next/link";
import HeaderLinks from "./HeaderLinks";
import { track } from "@vercel/analytics";
import StylizedButton from "./StylizedButton";
import { ST } from "next/dist/shared/lib/utils";
import { useUIContext } from "@/contexts/UIContext";

export default function Header() {
  const { scrollPosition } = useUIContext();
  return (
    <div className="fixed z-[999] left-0 right-0 top-0 flex justify-center pointer-events-none">
      <div className="flex w-full max-w-[1380px]">
        <header className="flex h-fit gap-x-[30px] justify-between desktop:justify-end items-start w-full mx-auto pl-[15px] pr-[15px] pt-[30px] desktop:pl-[30px] desktop:pr-[50px] desktop:pt-[50px]">
          <div className="flex h-[41px] desktop:h-auto items-center gap-x-[30px] pointer-events-auto">
            <HeaderLinks />
          </div>
          <div className="flex h-fit items-center gap-x-[30px] pointer-events-auto">
            <StylizedButton className={`h-[41px] w-[105px] headline-sm ${scrollPosition < 100 ? "desktop:h-[44px] desktop:w-[112px] desktop:headline-md" : "desktop:h-[32px] desktop:w-[98px] desktop:headline-xs"} transition-all duration-300`} onClick={
              () => {
                const element = document.getElementById("sixth-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }
            }>Join us</StylizedButton>
            <div className="hidden desktop:block">
              <EthUsdSwitch />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
