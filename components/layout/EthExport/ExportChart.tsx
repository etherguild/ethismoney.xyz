"use client"
import { useEthExport } from '@/components/layout/EthExport/ExportContext';
import {
  HighchartsProvider,
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  Tooltip,
  AreaSeries,
} from "react-jsx-highcharts";
import Highcharts from "highcharts/highstock";
import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { useUIContext } from '@/contexts/UIContext';
const COLORS = {
  GRID: "rgb(161, 196, 209)",
  PLOT_LINE: "rgb(161, 196, 209)",
  LABEL: "rgb(27, 53, 85)",
  LABEL_HOVER: "#6c7696",
  TOOLTIP_BG: "#1b2135",
  ANNOTATION_BG: "rgb(215, 223, 222)",
};



export default function ExportChart() {
  // const { isMobile } = useUIContext();
  const { data, selectedEntity, setSelectedEntity } = useEthExport();

  const [showUsd, setShowUsd] = useLocalStorage("showUsd", false);

  const dataKey = data ? data.data.chart[selectedEntity].daily.types.indexOf(showUsd ? "usd" : "eth") : 1;

  const MobileMaxWidth = 1117;
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const CheckMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= MobileMaxWidth);
    };

    const handleResize = () => {
      setIsResizing(true);

      setTimeout(() => {
        setIsResizing(false);
        CheckMobile();
      }, 100);
    };

    // Initial check
    CheckMobile();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  if (isResizing && !isMobile) {
    // if (isResizing) {
    return (
      <></>
    )
  }


  return (
    <div className="flex flex-col gap-y-[10px] w-full h-full">
      <div className="flex items-center gap-x-[10px]">
        <div className="headline-lg leading-[33px] desktop:headline-xl desktop:leading-[41px] text-blue2 gap-x-[5px] flex">
          <div className='whitespace-nowrap'>
            ETH exported{selectedEntity !== 'total' && <>  to</>}
          </div>
          {selectedEntity !== 'total' &&
            <div className="flex items-center gap-x-[5px] text-blue1 whitespace-nowrap">
              <div className="text-blue1">{data?.data.entities[selectedEntity].name}</div>
              <button
                onClick={() => setSelectedEntity('total')}
                className="flex items-center gap-x-[5px] text-blue1"
              >
                <CloseIcon />
              </button>
            </div>
          }
        </div>
        {/* {selectedEntity !== 'total' && (
          <button
            onClick={() => setSelectedEntity('total')}
            className="flex items-center gap-x-[5px] text-blue1"
          >
            <CloseIcon />
          </button>
        )} */}
      </div>
      <div className="relative h-full w-full pt-[43px]">
        {data && (
          <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart
              accessibility={{
                enabled: false
              }}
              containerProps={{
                style: {
                  height: "100%",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  overflow: "visible",
                },
              }}
              plotOptions={{
                area: {
                  lineWidth: 2,
                  lineColor: "#5f8ad3",
                  // marker: {
                  //   radius: 12,
                  //   lineWidth: 4,
                  // },
                  fillOpacity: 1,
                  stacking: "normal",

                  // shadow: {
                  //   color:
                  //     AllChainsByKeys[data.chain_id]?.colors[theme ?? "dark"][1] + "33",
                  //   width: 10,
                  // },

                  // borderColor: AllChainsByKeys[data.chain_id].colors[theme ?? "dark"][0],
                  // borderWidth: 1,
                },

                series: {
                  lineWidth: 2,
                  zIndex: 10,
                  animation: true,
                  marker: {
                    lineColor: "white",
                    radius: 0,
                    symbol: "circle",
                  },
                },
              }}
            >
              <Chart
                backgroundColor={"transparent"}
                type="area"
                panning={{ enabled: true }}
                panKey="shift"
                zooming={{ type: undefined }}
                style={{ borderRadius: 15 }}
                animation={{ duration: 50 }}
                // margin={[0, 15, 0, 0]} // Use the array form for margin
                margin={[10, 0, 34, 30]}

                height={337}
                onRender={(chart) => {
                  //   if (chart && chart.target) {
                  //     chartComponent.current =
                  //       chart.target as unknown as Highcharts.Chart;
                  //   }
                }}

              />
              <XAxis
                title={undefined}
                type="datetime"
                crosshair={{
                  width: 0.5,
                  color: COLORS.PLOT_LINE,
                  snap: false,
                }}
                zoomEnabled={false}
                tickWidth={2}
                tickAmount={5}
                tickLength={15}
                tickColor={"#a1c4d1"}
                ordinal={false}
                gridLineWidth={0}
                gridLineColor={"transparent"}
                // minorTickInterval={1000 * 60 * 60 * 24 * 7}
                alignTicks={true}


                labels={{
                  y: 30,
                  align: undefined,
                  rotation: 0,
                  allowOverlap: false,



                  useHTML: true,
                  style: {
                    textAlign: "bottom",
                    color: "#1b3555",
                    fontSize: "12px",
                    marginTop: "10px",
                  },


                }}

                min={data.data.chart[selectedEntity].daily.data[0][0]}
                max={data.data.chart[selectedEntity].daily.data[data.data.chart[selectedEntity].daily.data.length - 1][0]}
              >
                <XAxis.Title></XAxis.Title>
              </XAxis>
              <Tooltip
                useHTML={true}
                shared={true}
                split={false}
                followPointer={true}
                followTouchMove={true}
                backgroundColor={"#f1f9fcAA"}
                padding={0}
                hideDelay={300}
                stickOnContact={true}
                shape="rect"
                borderRadius={17}
                borderWidth={0}
                outside={true}
                shadow={{
                  color: "black",
                  opacity: 0.015,
                  offsetX: 2,
                  offsetY: 2,
                }}
                style={{
                  color: "#1b3555",
                  fontSize: "12px",
                  lineHeight: "18px",
                }}
                formatter={function (this: Highcharts.TooltipFormatterContextObject) {
                  const points = this.points || [];
                  const date = this.x ? new Date(this.x) : new Date();
                  const formattedDate = `${date.toLocaleDateString("en-GB", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}`;

                  const formatValue = (name: string, value: number) => {
                    if (!showUsd) {
                      // show with ETH symbol
                      return `Ξ${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    }
                    return `$${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                  }

                  const values = points.map((point) => ({
                    label: point.series.name,
                    value: formatValue(point.series.name, point.y || 0),
                    color: `rgba(100, 150, 255, 1)`,
                  }));

                  return `
                    <div class="min-w-[260px] bg-[#b7dde8]/80 rounded-[15px] p-2 pl-0">
                      <div class="flex items-center gap-3 mb-2 pl-2">
                        <div class="flex items-center">
                          <div class="w-[9px] h-[9px] bg-blue1 rounded-full"></div>
                        </div>
                        <div class="text-blue1 text-[13px] font-bold font-manrope leading-tight">${formattedDate}</div>
                      </div>
                      ${values.map((item, index) => `
                        <div class="flex items-center gap-3 h-[21px]">
                          <div class="w-[17px] h-2.5 rounded-tr-[20px] rounded-br-[20px]" style="background-color: ${item.color}"></div>
                          <div class="flex-1 flex justify-between items-center">
                            <div class="text-blue1 text-xs">${item.label}</div>
                            <div class="text-right text-blue1 numbers-xs">${item.value}</div>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                    `;

                }}
              />
              <YAxis
                opposite={false}
                // showFirstLabel={true}
                // showLastLabel={true}
                type="linear"
                gridLineWidth={1}
                gridLineColor={"#A1C4D1"}
                plotLines={[
                  {
                    value: 0,
                    color: "#1b3555",
                    width: 2,
                  }
                ]}
                zoomEnabled={false}
                tickAmount={3}
                labels={{
                  align: "right",
                  y: 3,
                  x: -4,

                  style: {
                    color: "rgb(27 53 85)",
                    fontSize: "10px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  },
                  formatter: function () {
                    const value = this.value as number | bigint;
                    return (

                      Intl.NumberFormat("en-GB", {
                        notation: "compact",
                        maximumFractionDigits: 1,
                        minimumFractionDigits: 0,
                      }).format(value)
                    );
                  },
                }}
              >
                <AreaSeries
                  key={selectedEntity} // Add a key to each element in the list
                  name={data.data.entities[selectedEntity].name}
                  id={"testid"}
                  color={
                    COLORS.PLOT_LINE
                  }
                  lineWidth={2}
                  data={data.data.chart[selectedEntity].daily.data.map((d: any) => [d[0], d[dataKey]])}
                  fillColor={{
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                      [0, 'rgba(100, 150, 255, 0.05)'], // Top of the gradient
                      [1, 'rgba(100, 150, 255, 0.55)']    // Bottom of the gradient
                    ]
                  }}
                // data={data.chain_data[chainKey][selectedMetric][
                //     selectedTimeframe
                //   ].data.map((d: any) => [d[0], d[dataIndex]])}


                />
              </YAxis>
            </HighchartsChart>
          </HighchartsProvider>
        )}
      </div>
    </div>
  )
}

const CloseIcon = () => (
  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.80005 13.7357L13.2 5.33569M13.2 13.7357L4.80005 5.33569" stroke="#1B3555" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="9" cy="9.53564" r="8.4" stroke="#1B3555" stroke-width="1.2" />
  </svg>
);