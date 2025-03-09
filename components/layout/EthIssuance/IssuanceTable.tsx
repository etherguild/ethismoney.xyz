"use client";
import VerticalScrollContainer from "@/components/VerticalScrollContainer";
import InfoAccordion from "../InfoAccordion";
import { useEthSupply } from "../EthSupply/EthSupplyContext";

export default function IssuanceTable() {
  const { data } = useEthSupply();
  return (
    <div className='h-[400px] overflow-auto pr-[15px]'>
      <div className="h-full flex flex-col gap-y-[5px] ">
        {data && data.data.events.map((event: any, index: number) => (
          <InfoAccordion height={52} title={event.title} key={index}>
            {event.description}
          </InfoAccordion>
        ))}
      </div>
    </div>
  )
}