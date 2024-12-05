import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";

import { useEthHolders } from "./EthHoldersContext";
import { GridTableHeader, GridTableHeaderCell, GridTableRow } from "../GridTable";
import VerticalScrollContainer from "@/components/VerticalScrollContainer";
import Section from "@/components/LandingPageContainer";
import { useLocalStorage } from "usehooks-ts";
import { Sections } from "@/lib/sections";
import Link from "next/link";
import Icon from "@/components/Icon";


export const EthHoldersSection = () => {
  const { sortedFilteredData, types, holderTypeLabels, holderTypes, sort, setSort } = useEthHolders();
  const [showUsd, setShowUsd] = useLocalStorage("showUsd", false);
  return (
    <Section name="third" head={Sections[1].label} desc={Sections[1].description}
      subhead={<HolderSelect />}
      // desc={"ETH is a store of value that is immutable, scarce, censorship resistant and when staked it becomes a digital gold with yield."}
      height={752}
      className="w-full desktop:w-auto"
    >
      <div className="w-full mx-auto desktop:w-auto desktop:mx-0">
        <div className="overflow-auto px-[15px] pb-[15px] desktop:pb-0 desktop:px-0">
          <div className='min-w-[700px]'>
            <>
              <GridTableHeader
                gridDefinitionColumns="grid-cols-[250px_110px_110px_minmax(145px,1000px)]"
                className="text-[14px] !font-bold z-[2] !py-0 !pl-[10px] !pr-[calc(20px+30px)] select-none h-[30px]"
              >
                <GridTableHeaderCell
                  metric="name"
                  sort={sort}
                  setSort={setSort}
                >
                  Name</GridTableHeaderCell>
                <GridTableHeaderCell
                  metric="type"
                  sort={sort}
                  setSort={setSort}
                >Type</GridTableHeaderCell>
                <GridTableHeaderCell
                  metric="type"
                  sort={sort}
                  setSort={setSort}
                >Tracking Type</GridTableHeaderCell>
                {/* <GridTableHeaderCell>Code</GridTableHeaderCell>
            <GridTableHeaderCell>Source</GridTableHeaderCell> */}
                <GridTableHeaderCell
                  metric={showUsd ? "eth_equivalent_balance_usd" : "eth_equivalent_balance_eth"}
                  sort={sort}
                  setSort={setSort}
                  justify='end'
                >ETH holdings</GridTableHeaderCell>
              </GridTableHeader>
              <div className='h-[346px] overflow-auto pr-[15px]'>
                <div className='flex flex-col gap-y-[5px]'>
                  {sortedFilteredData.map((row, index) => {

                    return (
                      <GridTableRow
                        key={index}
                        gridDefinitionColumns="grid-cols-[250px_110px_110px_minmax(145px,1000px)]"
                        className={`w-full h-[34px] !pl-[10px] !pr-[20px] hover:bg-white/60 tansition-all duration-300`}

                      >
                        <div className='flex gap-x-[5px] items-center text-sm select-none'>
                          {row.name}
                        </div>
                        <div className='flex items-center select-none'>
                          {row.type}
                        </div>
                        <Link href={"https://github.com/ethismoney-xyz/data/blob/main/eth_holders.yml"} rel="noopener" target="_blank" className='flex items-center select-none underline'>
                          {row.tracking_type.charAt(0).toUpperCase() + row.tracking_type.slice(1)}
                        </Link>
                        {/* <div className='text-sm select-none capitalize'>
                      {row.code}
                    </div>
                    <div className='text-sm select-none capitalize'>
                      {row.source}
                    </div> */}
                        <div className='flex justify-end numbers-sm'>
                          {showUsd ? '$' : 'Ξ'}
                          {showUsd ? row.usd.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : row.eth.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </GridTableRow>
                    );
                  })}
                </div>
              </div>
            </>

          </div>
        </div>
        <div className="px-[15px] desktop:px-0 w-full flex flex-col-reverse desktop:flex-row gap-[10px] desktop:gap-[30px] justify-end items-start desktop:items-center mt-[30px]">
          <div className="text-xs text-blue2 text-right desktop:w-[200px] pl-[15px] desktop:pl-0">Help us create a more complete dataset for offchain data.</div>

          <Link href={"https://github.com/ethismoney-xyz/data"} target="_blank" rel="noopener" className="w-[280px] h-[44px] bg-blue5 rounded-full flex items-center justify-center headline-md"><div>Add your institution here</div><Icon icon={"feather:chevron-right"} className="w-[24px] h-[24px]" /></Link>
        </div>
      </div>
    </Section>
  )
}


const HolderSelect = () => {
  const { holderFilter, setHolderFilter, holderTypeLabels, holderTypes } = useEthHolders();

  return (
    <div className="flex flex-wrap gap-x-[10px] select-none text-eth-logo headline-lg desktop:headline-xl-link">
      {holderTypes.map((holderType, index) => (
        <div key={holderType} className="flex">
          <div
            className={`cursor-pointer ${holderFilter === holderType && "text-blue1"}`}
            onClick={() => setHolderFilter(holderType)}
          >
            {holderTypeLabels[index]}
          </div>
          {index < holderTypes.length - 1 && ","}
        </div>
      ))}
    </div>

  );

}