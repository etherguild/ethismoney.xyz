import  Icon  from "@/components/Icon";

export default function SidebarGroupItem({icon}: {icon?: string}) {
    return (
        <div className="w-[33px] h-[33px] bg-gray-blue flex items-center justify-center rounded-full">
            <Icon icon={icon ? icon : ""} className={"w-[18px] h-[18px]"} />
        </div>
    )
}