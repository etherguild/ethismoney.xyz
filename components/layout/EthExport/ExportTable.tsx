"use client"
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer';
import { useEthExport } from '@/components/layout/EthExport/ExportContext';
import {
  GridTableAddressCell,
  GridTableHeader,
  GridTableHeaderCell,
  GridTableRow,
} from "@/components/layout/GridTable";
import VerticalScrollContainer from '@/components/VerticalScrollContainer';
import { Icon } from '@iconify/react';
import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';
import { useUIContext } from '@/contexts/UIContext';

export default function ExportTable() {
  const { data, selectedEntity, setSelectedEntity } = useEthExport();
  {/* <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="11" fill="#7DBF7B"/>
</svg> */}

  const [showUsd, setShowUsd] = useLocalStorage("showUsd", false);
  const { isMobile } = useUIContext();

  const dataKey = data ? data.data.chart[selectedEntity].daily.types.indexOf(showUsd ? "usd" : "eth") : 1;

  const UnitOfAccount = (uoa: string) => {
    const colorMap = {
      'yes': 'bg-green',
      'no': 'bg-burgundy',
      'possible': 'bg-beige',
      '': 'bg-gray',
    }
    return (
      <div className='flex items-center'>
        <div className={`w-[22px] h-[22px] rounded-full ${colorMap[uoa]}`}></div>
        {/* {uoa} */}
      </div>
    )
  }

  const lastValue = useCallback((entity: string) => {
    if (!data) return null;
    return data.data.chart[entity].daily.data[data.data.chart[entity].daily.data.length - 1][dataKey];
  }, [data, dataKey])

  return (
    <HorizontalScrollContainer includeMargin={isMobile} forcedMinWidth={600}>
      {data && (
        <>
          <GridTableHeader
            gridDefinitionColumns="grid-cols-[145px_59px_minmax(94px,1000px)_92px]"
            className="sticky top-0 text-[14px] !font-bold z-[2] !py-0 !pl-[10px] !pr-[55px] select-none h-[30px]"
          >
            <GridTableHeaderCell justify='start'>ETHconomies</GridTableHeaderCell>
            <GridTableHeaderCell justify='center' className='gap-x-[5px]'>
              UoA<Tooltip allowInteract={true} placement="right"><TooltipTrigger><Icon icon={'feather:info'} /></TooltipTrigger><TooltipContent className="p-[11px] text-xs bg-ice  text-blue1 rounded-xl shadow-lg flex flex-col z-[51]">
                <div>Chain uses ETH for transaction fees and prices fees in ETH.</div>

              </TooltipContent></Tooltip></GridTableHeaderCell>
            <GridTableHeaderCell>Type</GridTableHeaderCell>
            <GridTableHeaderCell justify='end'>ETH exported</GridTableHeaderCell>
          </GridTableHeader>
          <VerticalScrollContainer height={346 - 39}>
            <div className='flex flex-col gap-y-[5px]'>
              {Object.keys(data.data.entities).filter(entity => entity !== "total").map((entity, index) => {
                let opacityClass = 'opacity-100';
                if (selectedEntity !== 'total' && selectedEntity !== entity) {
                  opacityClass = 'opacity-30';
                }

                const icon = selectedEntity === entity ? <ZoomOutIcon /> : <ZoomInIcon />;
                return (
                  <GridTableRow
                    key={index}
                    gridDefinitionColumns="grid-cols-[145px_59px_minmax(94px,1000px)_92px]"
                    className={`w-full h-[34px] !pl-[10px] !pr-[20px] hover:bg-white/60 tansition-all duration-300 ${opacityClass}`}
                    onClick={() => {
                      if (selectedEntity === entity) {
                        setSelectedEntity('total');
                      } else {
                        setSelectedEntity(entity);
                      }
                    }}
                  >
                    <div className='flex gap-x-[5px] items-center text-sm select-none'>
                      {icon}

                      {data.data.entities[entity].name}
                    </div>
                    <div className='flex justify-center items-center select-none'>
                      {UnitOfAccount(data.data.entities[entity].uoa)}
                    </div>
                    <div className='text-sm select-none capitalize'>
                      {data.data.entities[entity].type}
                    </div>
                    <div className='flex justify-end numbers-sm'>
                      {showUsd ? '$' : 'Ξ'}
                      {lastValue(entity)?.toLocaleString('en-GB', { minimumFractionDigits: showUsd ? 0 : 2, maximumFractionDigits: showUsd ? 0 : 2 })}
                    </div>
                  </GridTableRow>
                );
              })}
            </div>
          </VerticalScrollContainer>
          <div className='pt-[5px] pr-[30px]'>
            {Object.keys(data.data.entities).filter(entity => entity === "total").map((entity, index) => {
              let opacityClass = 'opacity-100';
              if (selectedEntity !== 'total' && selectedEntity !== entity) {
                opacityClass = 'opacity-30';
              }

              const icon = selectedEntity === entity ? <ZoomOutIcon /> : <ZoomInIcon />;
              return (
                <GridTableRow
                  key={index}
                  gridDefinitionColumns="grid-cols-[145px_59px_minmax(94px,1000px)_92px]"
                  className={`w-full h-[34px] !pl-[10px] !pr-[20px] hover:bg-white/60 tansition-all duration-300 font-bold ${opacityClass}`}
                  onClick={() => {
                    if (selectedEntity === entity) {
                      setSelectedEntity('total');
                    } else {
                      setSelectedEntity(entity);
                    }
                  }}
                >
                  <div className='flex gap-x-[5px] items-center text-sm select-none'>
                    {/* {icon} */}
                    <div className='size-[15px]' />

                    {data.data.entities[entity].name}
                  </div>
                  <div className='flex justify-center items-center select-none'>
                    {/* {UnitOfAccount(data.data.entities[entity].uoa)} */}
                  </div>
                  <div className='text-sm select-none capitalize'>
                    {/* {data.data.entities[entity].type} */}
                  </div>
                  <div className='flex justify-end highlight-text-lg'>
                    {showUsd ? '$' : 'Ξ'}
                    {lastValue(entity)?.toLocaleString('en-GB', { minimumFractionDigits: showUsd ? 0 : 2, maximumFractionDigits: showUsd ? 0 : 2 })}
                  </div>
                </GridTableRow>
              );
            })}
          </div>
        </>
      )}
    </HorizontalScrollContainer>
  )
}

const ZoomInIcon = () => (
  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3001_4074)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C11 9.03757 8.53757 11.5 5.5 11.5C2.46243 11.5 0 9.03757 0 6C0 2.96243 2.46243 0.5 5.5 0.5C8.53757 0.5 11 2.96243 11 6ZM5.5 10C7.70914 10 9.5 8.20914 9.5 6C9.5 3.79086 7.70914 2 5.5 2C3.29086 2 1.5 3.79086 1.5 6C1.5 8.20914 3.29086 10 5.5 10Z" fill="#1B3555" />
      {/* plus sign */}
      <path d="M6 5.5V3.5H5V5.5H3V6.5H5V8.5H6V6.5H8V5.5H6Z" fill="#1B3555" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.509 15.009C14.2378 15.2801 13.7981 15.2801 13.527 15.009L8.49098 9.97299C8.2198 9.70181 8.2198 9.26215 8.49098 8.99098C8.76215 8.7198 9.20181 8.7198 9.47298 8.99098L14.509 14.027C14.7801 14.2981 14.7801 14.7378 14.509 15.009Z" fill="#1B3555" />
    </g>
    <defs>
      <clipPath id="clip0_3001_4074">
        <rect width="15" height="15" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
)

const ZoomOutIcon = () => (
  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3001_4074)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C11 9.03757 8.53757 11.5 5.5 11.5C2.46243 11.5 0 9.03757 0 6C0 2.96243 2.46243 0.5 5.5 0.5C8.53757 0.5 11 2.96243 11 6ZM5.5 10C7.70914 10 9.5 8.20914 9.5 6C9.5 3.79086 7.70914 2 5.5 2C3.29086 2 1.5 3.79086 1.5 6C1.5 8.20914 3.29086 10 5.5 10Z" fill="#1B3555" />
      {/* minus sign */}
      <path d="M8 6.5H3V5.5H8V6.5Z" fill="#1B3555" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.509 15.009C14.2378 15.2801 13.7981 15.2801 13.527 15.009L8.49098 9.97299C8.2198 9.70181 8.2198 9.26215 8.49098 8.99098C8.76215 8.7198 9.20181 8.7198 9.47298 8.99098L14.509 14.027C14.7801 14.2981 14.7801 14.7378 14.509 15.009Z" fill="#1B3555" />
    </g>
    <defs>
      <clipPath id="clip0_3001_4074">
        <rect width="15" height="15" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
)