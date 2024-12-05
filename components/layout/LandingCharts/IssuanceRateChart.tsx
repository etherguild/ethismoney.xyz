"use client"
import {
  HighchartsProvider,
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  LineSeries,
  Tooltip,
  Series,

} from "react-jsx-highcharts";
import Highcharts from "highcharts/highstock";
import { Icon } from "@iconify/react";
import { useEthSupply } from "../EthSupply/EthSupplyContext";
import { useEffect, useMemo, useState } from "react";
import LandingContainerChild from "@/components/LandingContainerChild";
import { Event } from "@/types/api/EthSupplyResponse";
import { useUIContext } from "@/contexts/UIContext";
import "@/app/highcharts.axis.css";

const COLORS = {
  GRID: "rgb(161, 196, 209)",
  PLOT_LINE: "rgb(161, 196, 209)",
  LABEL: "rgb(27, 53, 85)",
  LABEL_HOVER: "#6c7696",
  TOOLTIP_BG: "#1b2135",
  ANNOTATION_BG: "rgb(215, 223, 222)",
};


export default function IssuanceRateChart() {
  // const { isMobile } = useUIContext();
  const { data, hoveredEventIndex, activeEventIndex, setChartTitle } = useEthSupply();

  const eventFlags = useMemo(() => {
    if (!data) return [] as Highcharts.SeriesOptions[];

    return data.data.events.filter((event) => event.show_in_chart).map((event: Event, index: number) => {
      return {
        x: new Date(event.date).getTime(),
        title: event.short_title,
        text: `${event.title}||${event.description}`,
      }
    });
  }, [data]);

  const [xAxisBounds, setXAxisBounds] = useState<{ min: number, max: number }>({ min: data?.data.chart.eth_issuance_rate.daily.data[0][0] || 0, max: data?.data.chart.eth_issuance_rate.daily.data[data.data.chart.eth_issuance_rate.daily.data.length - 1][0] || 0 });

  useEffect(() => {
    if (data) {
      setXAxisBounds({ min: data.data.chart.eth_issuance_rate.daily.data[0][0], max: data.data.chart.eth_issuance_rate.daily.data[data.data.chart.eth_issuance_rate.daily.data.length - 1][0] });
    }
  }, [data]);

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


  // if (isResizing && !isMobile) {
  if (isResizing && !isMobile) {
    return (
      <></>
    )
  }

  return (
    <LandingContainerChild
      head={<div className="flex w-full text-blue2 gap-x-[5px]">ETH Issuance Rate<span className={data && xAxisBounds.min !== data.data.chart.eth_issuance_rate.daily.data[0][0] ? 'inline-block' : 'hidden'}>{" "}- Post-Merge</span></div>}
      height={475}
      className="px-[15px] desktop:px-0 flex-1"
    >
      <div className="w-full relative h-full">
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
                fillOpacity: 1,
                stacking: "normal",
              },
              line: {
                lineWidth: 2,
                marker: {
                  enabled: false,
                },
                states: {
                  hover: {
                    lineWidth: 2,
                  },
                },
              },
              series: {
                zIndex: 10,
                animation: false,
                marker: {
                  lineColor: "white",
                  radius: 0,
                  symbol: "circle",
                },
              },
              flags: {  // Add this section
                fillColor: '#F1F9FC',
                lineColor: '#1B3555',
                lineWidth: 1,
                color: '#2A6F97',
                label: {
                  style: {
                    fontSize: '9px',
                  },
                },
                opacity: 0.5,
                style: {
                  zIndex: 100,
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '9px',
                },
                // style: {
                //   background: '#1B3555',
                //   border: '2px',
                //   borderColor: '#1B3555',
                //   boxShadow: 'none'
                // },
                // // lineWidth: 0,
                states: {
                  hover: {
                    fillColor: '#F1F9FC',
                    opacity: 1,
                    // lineWidth: 0
                  }
                }
              }

            }
            }
          >
            <Chart
              backgroundColor={"transparent"}
              type="area"
              panning={{ enabled: true }}
              panKey="shift"
              zooming={{ type: undefined }}
              style={{ borderRadius: 15 }}
              animation={{ duration: 50 }}
              margin={[10, 0, 34, 40]}
              height={361}
            />
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


                if (this.point['text']) {
                  const split = this.point['text'].split("||");
                  const title = split[0];
                  const description = split[1];
                  return `
                  <div class="min-w-[233px] max-w-[600px] bg-[#b7dde8]/80 rounded-[15px] p-2 pl-0">
                    <div class="flex items-center gap-3 mb-2 pl-2">
                      <div class="flex items-center">
                        <div class="w-[9px] h-[9px] bg-blue1 rounded-full"></div>
                      </div>
                      <div class="text-blue1 text-[13px] font-bold font-manrope leading-tight">${formattedDate}</div>
                    </div>
                    <div class="flex items-center gap-3 whitespace-normal">
                      <div class="w-[17px] h-2.5 rounded-tr-[20px] rounded-br-[20px]" style="background-color: transparent"></div>
                      <div class="flex-1 flex justify-between items-center leading-normal">
                        <div class="text-blue1 highlight-text-sm !text-[10px]">${title}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3 whitespace-normal">
                      <div class="w-[17px] h-2.5 rounded-tr-[20px] rounded-br-[20px]" style="background-color: transparent"></div>
                      <div class="flex-1 flex justify-between items-center leading-normal">
                        <div class="text-blue1 text-[9px]">${description}</div>
                      </div>
                    </div>
                  </div>
                  `;
                }

                const formatValue = (name: string, value: number) => {
                  if (name === "ETH Supply") {
                    // show with ETH symbol
                    return `Ξ${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  }
                  return `${(100 * value).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
                }

                const values = points.map((point) => ({
                  label: point.series.name,
                  value: formatValue(point.series.name, point.y || 0),
                  color: point.color,
                }));

                return `
                <div class="min-w-[233px] bg-[#b7dde8]/80 rounded-[15px] p-2 pl-0">
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
              tickLength={15}
              tickColor={"#a1c4d1"}
              ordinal={false}
              gridLineWidth={0}
              minorTicks={false}
              alignTicks={true}
              showFirstLabel={true}
              showLastLabel={true}
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
                formatter: function () {
                  const date = new Date(this.value);
                  return `${date.toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}`;
                },
              }}
              min={xAxisBounds.min}
              max={xAxisBounds.max}
              //@ts-ignore
              plotBands={
                (data?.data.events.filter(e => e.short_title === "The Merge").map((event: any) => {
                  return [{
                    color: "transparent",
                    from: data.data.chart.eth_issuance_rate.daily.data[0][0],
                    to: new Date(event.date).getTime(),
                    label: {
                      text: "Pre-Merge",
                      style: {

                        fontFamily: 'var(--font-manrope)',
                        color: "#B0B7C3",
                        fontSize: "10px",
                        fontWeight: "500",
                        padding: "5px",
                      },
                      align: "center",
                      verticalAlign: "bottom",
                      x: 0,
                      y: -10,
                      useHTML: true,
                    },
                  },
                  {
                    color: "#FEFEFE33",
                    from: new Date(event.date).getTime(),
                    to: data.data.chart.eth_issuance_rate.daily.data[data.data.chart.eth_issuance_rate.daily.data.length - 1][0],
                    events: {
                      click: function () {
                        if (xAxisBounds.min === data.data.chart.eth_issuance_rate.daily.data[0][0]) {
                          setXAxisBounds({ min: new Date(event.date).getTime(), max: data.data.chart.eth_issuance_rate.daily.data[data.data.chart.eth_issuance_rate.daily.data.length - 1][0] });
                        } else {
                          setXAxisBounds({ min: data.data.chart.eth_issuance_rate.daily.data[0][0], max: data.data.chart.eth_issuance_rate.daily.data[data.data.chart.eth_issuance_rate.daily.data.length - 1][0] });
                        }
                      },
                      mouseover: function () {
                        let cursorPath = xAxisBounds.min === data.data.chart.eth_issuance_rate.daily.data[0][0] ? "/cursors/zoom-in.svg" : "/cursors/zoom-out.svg";
                        document.body.style.cursor = `url(${cursorPath}) 14.5 14.5, auto`;
                      },
                      mouseout: function () {
                        document.body.style.cursor = "auto";
                      },
                    },
                    label: {
                      text: "Post-Merge",
                      style: {

                        fontFamily: 'var(--font-manrope)',
                        color: "#A1C4D1",
                        fontSize: "10px",
                        fontWeight: "500",
                        padding: "5px",
                      },
                      align: "center",
                      verticalAlign: "bottom",
                      x: 0,
                      y: -10,
                      useHTML: true,

                    },
                  }]
                }).flat()) ?? []
              }
              //@ts-ignore
              plotLines={
                (data?.data.events.filter(e => e.short_title === "The Merge").map((event: any) => {
                  return [{
                    color: "#1B3555",
                    width: 1,
                    dashStyle: "Dash",
                    value: new Date(event.date).getTime(),
                    zIndex: 99,
                  }]
                }).flat()) ?? []
              }
            >
              <XAxis.Title></XAxis.Title>
            </XAxis>
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
                x: -5,
                style: {
                  color: "rgb(27 53 85)",
                  fontSize: "10px",
                  fontWeight: "700",
                },

              }}
            // max={125e6}
            // min={85e6}

            >
              {data && (
                <LineSeries
                  name={"ETH Supply"}
                  id={"eth_supply"}
                  color={
                    "#5f8ad3"
                  }
                  lineWidth={2}
                  data={data.data.chart.eth_supply.daily.data.map((d: any) => [d[0], d[1]])}



                />
              )}
            </YAxis>
            <YAxis
              opposite={true}
              // showFirstLabel={true}
              // showLastLabel={true}
              type="linear"
              gridLineWidth={1}
              gridLineColor={COLORS.GRID}
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
                x: 25,
                style: {
                  color: "rgb(27 53 85)",
                  fontSize: "10px",
                  fontWeight: "700",
                },
                formatter: function (this: any) {
                  return `${Number(this.value) * 100}%`;
                }
              }}
            // min={0}
            >
              {data && (
                <LineSeries
                  name={"Issuance Rate"}
                  id={"issuance_rate"}
                  color={
                    "#9f4039"
                  }
                  lineWidth={2}
                  data={data.data.chart.eth_issuance_rate.daily.data.map((d: any) => [d[0], d[1]])}
                />
              )}
              <Series
                id="flags"
                type="flags"
                data={eventFlags}
                zIndex={100}
                // data={[{
                //   x: data?.data.chart.eth_issuance_rate.daily.data[0][0] || 0,
                //   title: "A",
                //   text: "First event"
                // }, {
                //   x: data?.data.chart.eth_issuance_rate.daily.data[data.data.chart.eth_issuance_rate.daily.data.length - 1][0] || 0,
                //   title: "B",
                //   text: "Second event"
                // }]}
                // stackingDistance={0}
                // padding={0}
                // onSeries="issuance_rate"  // This must match the LineSeries id exactly
                linkedTo="issuance_rate"  // This must match the LineSeries id exactly
                tooltip={{
                  formatter: function () {
                    return this.point.text;
                  }

                }}
                accessibility={{
                  description: "Flags on series"
                }}
                y={-40}
                borderRadius={3}
                shape='squarepin'
              // borderRadius={3}
              // width={16}
              // shape="circlepin"
              // allowOverlapX={true}
              // padding={-10}

              // useHTML={true}
              // yAxis={1}  // Add this to ensure it uses the same yAxis as your LineSeries

              // style={{
              //   color: 'transparent',
              //   background: 'none'
              // }}

              />

            </YAxis>
          </HighchartsChart>
        </HighchartsProvider>
        <div className="flex justify-between w-full items-center h-[34px] ">
          <div className="flex items-center gap-x-[10px]">
            <div className="h-[25px] w-[25px] rounded-full bg-eth-logo flex items-center justify-center">
              <Icon icon="feather:info" className="w-[15px] h-[15px] text-ice" />
            </div>
            <div className="text-[11px] font-bold leading-[120%] ">Supply</div>
          </div>
          <div className="flex items-center gap-x-[10px]">
            <div className="text-[11px] font-bold leading-[120%] ">Issuance Rate</div>
            <div className="h-[25px] w-[25px] rounded-full bg-burgundy flex items-center justify-center">

              <Icon icon="feather:info" className="w-[15px] h-[15px] text-ice" />
            </div>


          </div>

        </div>
      </div>
    </LandingContainerChild>
  )
}