import  Icon  from "@/components/Icon";

export default function SidebarHead({icon}: {icon?: string}) {
    return (
        <div className="min-w-[66px] min-h-[66px] bg-eth-logo flex items-center justify-center rounded-full">
            <Icon icon={icon ? icon : ""} className={"w-[36px] h-[36px]"} />
        </div>
    )
}