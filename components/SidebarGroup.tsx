

export default function SidebarGroup({children}: {children: React.ReactNode}) {
    return (
        <div className="flex flex-col gap-y-[20px] relative h-full  justify-center">
            {children}
        </div>
    )
}