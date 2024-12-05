"use client";
import Link from "next/link";
import Icon from "./Icon";
import { track } from "@vercel/analytics";
import { useUIContext } from "@/contexts/UIContext";

export default function HeaderLinks() {
  const { scrollPosition } = useUIContext();

  return (
    <>

      <Link
        href="https://x.com/ethismoneyHQ"
        target="_blank"
        rel="noopener"
        onClick={() => {
          track("clicked Twitter link", {
            location: "desktop header",
            page: window.location.pathname,
          });
        }}
      >
        <Icon icon="gtp:x-monochrome" className={`${scrollPosition < 100 ? "size-[39px] desktop:size-[42px]" : "size-[26px] desktop:size-[30px]"} text-blue1 transition-all duration-300 ease-out `} />
      </Link>

    </>
  );
}
