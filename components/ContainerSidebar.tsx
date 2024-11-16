import React from "react";
import Image from "next/image";

export default function ContainerSidebar({ children
}: { children: React.ReactNode }) {
    return (
        <div className="min-w-[100px] max-w-[100px] min-h-full flex flex-col gap-y-[20px] items-center pb-[50px] ">

            {/* <Image
                src="/eth-is-money-logo.svg"
                alt="eth logo"
                width={32}
                height={32}
                className="min-w-[32px] min-h-[32px] "
            /> */}
            {children}
        </div>
    )
}