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
        <Icon icon="gtp:x-monochrome" className={`size-[24px] ${scrollPosition < 100 ? "desktop:size-[36px]" : "desktop:size-[32px]"} text-blue1 transition-all duration-300 ease-out `} />
      </Link>

    </>
  );
}
