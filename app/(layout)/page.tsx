
"use client";
import Section from "@/components/LandingPageContainer";
import ContainerSidebar from "@/components/ContainerSidebar";
import Container from "@/components/layout/Container";
import SidebarHead from "@/components/SidebarHead";
import SidebarGroup from "@/components/SidebarGroup";
import SidebarGroupItem from "@/components/SidebarGroupItem";
import LandingContainerChild from "@/components/LandingContainerChild";
import IssuanceRateChart from "@/components/layout/LandingCharts/IssuanceRateChart";
import InfoAccordion from "@/components/layout/InfoAccordion";
import VerticalScrollContainer from "@/components/VerticalScrollContainer";
// import { LandingURL } from "@/lib/urls";
import { EthExportProvider } from "@/components/layout/EthExport/ExportContext";
import ExportChart from "@/components/layout/EthExport/ExportChart";
import ExportTable from "@/components/layout/EthExport/ExportTable";
import Icon from "@/components/layout/Icon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from 'lenis'
import { useGSAP } from "@gsap/react";
import { use, useEffect, useState } from "react";
import IssuanceTable from "@/components/layout/LandingCharts/IssuanceTable";
import { EthSupplyProvider } from "@/components/layout/EthSupply/EthSupplyContext";
import { EthHoldersProvider, useEthHolders } from "@/components/layout/EthHolders/EthHoldersContext";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import { EthHoldersSection } from "@/components/layout/EthHolders/EthHoldersSection";
import ExplanationSVG from "./explanation.svg";
import Image from "next/image";
import Faq from "@/components/layout/FAQ/Glossary";
import Questions from "@/components/layout/FAQ/Questions";
import { Sections } from "@/lib/sections";
import Link from "next/link";

export default function Page() {

  // useEffect(() => {
  //   const lenis = new Lenis();

  //   // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  //   lenis.on('scroll', ScrollTrigger.update);

  //   // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  //   // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  //   });

  //   // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  //   gsap.ticker.lagSmoothing(0);

  //   // Cleanup function
  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);

  useGSAP(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const panels = [
      // ".panel-first", 
      "#second-section",
      "#third-section",
      "#fourth-section",
      "#fifth-section",
      "#sixth-section",
      "#seventh-section",

    ];

    const contents = [
      // ".panel-first", 
      "#second-content",
      "#third-content",
      "#fourth-content",
      "#fifth-content",
      "#sixth-content",
      "#seventh-content",
    ];

    // Create a GSAP quickSetter for the background's y position for optimal performance
    // const setBgY = gsap.quickSetter('.background-image', "y", "px");

    // const panelTweens: gsap.core.Tween[] = [];
    // panels.forEach((panel, index) => {
    //   const tween = gsap.from(panel, {
    //     scrollTrigger: {
    //       trigger: contents[index],
    //       scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    //       pin: true, // pin the trigger element while active
    //       start: "top top", // when the top of the trigger hits the top of the viewport
    //       end: "+=100%", // end after scrolling 500% of the trigger's height
    //     },
    //   });

    //   panelTweens.push(tween);
    // });

    // // Background Parallax Animation
    // ScrollTrigger.create({
    //   trigger: document.body,
    //   start: "top top",
    //   end: "bottom bottom",
    //   onUpdate: (self) => {
    //     setBgY(self.progress * -100);
    //   },
    //   // markers: true, // Uncomment for debugging
    // });


    // // Cleanup function
    // return () => {
    //   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // };

  }, []);


  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      setTimeout(() => {
        setIsResizing(false);
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  if (isResizing) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        {/* <div className="text-2xl">Resizing...</div> */}
      </div>
    )
  }



  return (
    <>
      <div className="flex flex-col gap-y-[60px]">
        <Section name="first" height={795} className="justify-end">
          <LandingContainerChild
            className="px-[15px] desktop:px-0 justify-center h-full flex-1"
          >
            <div className="h-[405px] pb-2.5 flex-col justify-end items-start gap-[30px] inline-flex">
              <div className="self-stretch rounded-[999px] justify-start items-center gap-2.5 inline-flex">
                <div className="h-[36px] px-[15px] rounded-full border border-blue2 justify-center items-center flex cursor-pointer select-none"
                  onClick={() => {
                    const element = document.getElementById("sixth-section");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <div className="flex items-center gap-x-[10px]">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.65 1.47129C7.76935 1.47129 7.88381 1.5187 7.9682 1.60309C8.05259 1.68748 8.1 1.80194 8.1 1.92129V8.03488L7.0682 7.00308C6.98381 6.91869 6.86935 6.87128 6.75 6.87128H1.35C1.23065 6.87128 1.11619 6.82387 1.0318 6.73948C0.947411 6.65509 0.900001 6.54063 0.900001 6.42128V1.92129C0.900001 1.80194 0.947411 1.68748 1.0318 1.60309C1.11619 1.5187 1.23065 1.47129 1.35 1.47129H7.65ZM8.60459 0.966694C8.35142 0.71352 8.00804 0.571289 7.65 0.571289H1.35C0.991958 0.571289 0.648581 0.713521 0.395406 0.966694C0.142232 1.21987 0 1.56325 0 1.92129V6.42128C0 6.77932 0.142232 7.1227 0.395406 7.37587C0.64858 7.62905 0.991958 7.77128 1.35 7.77128H6.5636L8.2318 9.43948C8.3605 9.56817 8.55405 9.60667 8.72221 9.53702C8.89036 9.46737 9 9.30328 9 9.12128V1.92129C9 1.56325 8.85777 1.21987 8.60459 0.966694Z" fill="#1B3555" />
                      <path d="M4 8.57129V15.0213C4 15.2437 4.134 15.4443 4.33952 15.5294C4.54505 15.6145 4.78161 15.5675 4.93891 15.4102L6.97782 13.3713H13.35C13.7876 13.3713 14.2073 13.1974 14.5167 12.888C14.8262 12.5786 15 12.1589 15 11.7213V6.22129C15 5.78368 14.8262 5.364 14.5167 5.05456C14.2073 4.74513 13.7876 4.57129 13.35 4.57129H10V5.67129H13.35C13.4959 5.67129 13.6358 5.72923 13.7389 5.83238C13.8421 5.93552 13.9 6.07542 13.9 6.22129V11.7213C13.9 11.8671 13.8421 12.007 13.7389 12.1102C13.6358 12.2133 13.4959 12.2713 13.35 12.2713H6.75C6.60413 12.2713 6.46424 12.3292 6.36109 12.4324L5.1 13.6935V8.57129H4Z" fill="#1B3555" />
                    </svg>
                    <div className="text-center text-blue2 text-xs">Join the community</div>
                  </div>
                  <Icon icon="feather:chevron-right" className="w-[24px] h-[24px] text-blue2" />
                </div>
                <div className="h-[36px] px-[15px] rounded-full border border-blue2 justify-center items-center flex cursor-pointer select-none"
                  onClick={() => {
                    const element = document.getElementById("seventh-section");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <div className="flex items-center gap-x-[10px]">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00274869 4.40046C-0.0529535 3.40708 0.745065 2.57129 1.74925 2.57129H13.2507C14.2549 2.57129 15.053 3.40708 14.9973 4.40046L14.6653 10.3205C14.6256 11.0279 14.0097 11.5666 13.2963 11.5178L7.67812 11.134C7.64588 11.1318 7.61416 11.1429 7.59053 11.1648L4.95427 13.6026C4.45253 14.0665 3.63198 13.7472 3.58308 13.0689L3.45549 11.2991C3.45063 11.2318 3.38879 11.1829 3.32144 11.1932L1.80593 11.4242C1.05713 11.5383 0.372134 10.988 0.33011 10.2386L0.00274869 4.40046ZM1.74925 3.26451C1.14674 3.26451 0.667928 3.76598 0.701349 4.36201L1.02871 10.2001C1.04781 10.5408 1.35917 10.7909 1.69954 10.739L3.21505 10.508C3.68648 10.4362 4.1194 10.7784 4.15339 11.2497L4.28098 13.0196C4.28796 13.1164 4.40519 13.1621 4.47686 13.0958L7.11313 10.658C7.27852 10.505 7.50056 10.427 7.72626 10.4424L13.3444 10.8263C13.6687 10.8484 13.9487 10.6036 13.9667 10.282L14.2987 4.36201C14.3321 3.76598 13.8533 3.26451 13.2507 3.26451H1.74925Z" fill="#1B3555" />
                      <path d="M3.33301 7.97092V5.50564H5.13119V6.00564H3.94484V6.53689H4.92227V6.9987H3.94484V7.97092H3.33301Z" fill="#1B3555" />
                      <path d="M6.97073 5.50564H7.63106L8.54134 7.97092H7.91459L7.7094 7.41884H6.88492L6.68347 7.97092H6.05671L6.97073 5.50564ZM7.60867 7.02648L7.29903 6.07856L6.98192 7.02648H7.60867Z" fill="#1B3555" />
                      <path d="M10.725 7.98828C10.5261 7.98828 10.3458 7.95356 10.1841 7.88411C10.0249 7.81467 9.88689 7.72092 9.76999 7.60286C9.65558 7.48249 9.56729 7.34824 9.50511 7.20009C9.44294 7.04962 9.41185 6.89453 9.41185 6.73481C9.41185 6.57046 9.44418 6.41421 9.50885 6.26606C9.576 6.1156 9.66802 5.98249 9.78491 5.86675C9.9043 5.75101 10.0448 5.65958 10.2065 5.59245C10.3681 5.523 10.5447 5.48828 10.7362 5.48828C10.9327 5.48828 11.1105 5.52416 11.2697 5.59592C11.4314 5.66768 11.5694 5.76374 11.6838 5.88411C11.8007 6.00448 11.8903 6.1399 11.9524 6.29036C12.0146 6.43851 12.0457 6.59013 12.0457 6.74523C12.0457 6.90958 12.0134 7.06583 11.9487 7.21398C11.884 7.36212 11.792 7.49523 11.6726 7.61328C11.5533 7.72902 11.4127 7.82046 11.2511 7.88759C11.0919 7.95472 10.9166 7.98828 10.725 7.98828ZM10.7288 7.48134C10.8457 7.48134 10.9476 7.4605 11.0347 7.41884C11.1217 7.37486 11.1939 7.31814 11.2511 7.2487C11.3083 7.17694 11.3506 7.09708 11.3779 7.00911C11.4078 6.91884 11.4227 6.8274 11.4227 6.73481C11.4227 6.6399 11.4078 6.54847 11.3779 6.4605C11.3481 6.37023 11.3033 6.29036 11.2436 6.22092C11.1839 6.15148 11.1105 6.09708 11.0235 6.05773C10.9364 6.01606 10.8382 5.99523 10.7288 5.99523C10.6119 5.99523 10.5099 6.01722 10.4229 6.0612C10.3383 6.10286 10.2662 6.15958 10.2065 6.23134C10.1493 6.30078 10.1058 6.38064 10.0759 6.47092C10.0485 6.55888 10.0349 6.64916 10.0349 6.74175C10.0349 6.83666 10.0498 6.9281 10.0796 7.01606C10.1095 7.10402 10.153 7.18388 10.2102 7.25564C10.2699 7.32509 10.3433 7.38064 10.4303 7.42231C10.5174 7.46166 10.6169 7.48134 10.7288 7.48134ZM10.5646 6.9987H11.1391L12.083 7.97092H11.5085L10.5646 6.9987Z" fill="#1B3555" />
                    </svg>
                    <div className="text-center text-blue2 text-xs">Questions and Glossary</div>
                  </div>
                  <Icon icon="feather:chevron-right" className="w-[24px] h-[24px] text-blue2" />
                </div>
              </div>
            </div>
          </LandingContainerChild>
          <LandingContainerChild
            className="px-[15px] desktop:px-0 justify-end pb-[69px] basis-[469px]"
            height={469}
          >
            <div className="relative grow shrink basis-0 h-[469px] pt-[278px] flex-col justify-end items-center inline-flex pr-[50px]">
              <div className="self-stretch h-[123px] flex-col justify-start items-center gap-[25px] flex">
                <div className="self-stretch text-center text-blue1 text-lg">ETH (Ether) is the cryptocurrency of the Ethereum economy – a digital gold with yield.</div>
                <div className="px-[15px] py-2.5 bg-blue5 rounded-[999px] justify-center items-center gap-2.5 inline-flex cursor-pointer select-none"
                  onClick={() => {
                    const element = document.getElementById("fifth-section");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.81651 2.5476C7.16534 1.92248 6.28216 1.57129 5.36127 1.57129H1.19461C0.811076 1.57129 0.500163 1.86977 0.500163 2.23796V12.238C0.500163 12.6061 0.811076 12.9046 1.19461 12.9046H5.77794C6.1463 12.9046 6.49957 13.0451 6.76003 13.2951C7.0205 13.5452 7.13369 13.7177 7.13369 14.0713C7.13369 14.488 7.44461 14.9046 8.00016 14.9046C8.55572 14.9046 8.8335 14.488 8.8335 14.0713V4.90462C8.8335 4.02057 8.46767 3.17272 7.81651 2.5476ZM7.16683 11.9285C6.74815 11.6965 6.40866 11.5713 5.91683 11.5713H1.88905V2.90462H5.0835C5.63603 2.90462 6.16593 3.11534 6.55664 3.49041C6.94734 3.86548 7.16683 4.37419 7.16683 4.90462V11.9285Z" fill="#1B3555" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.18349 2.5476C8.83466 1.92248 9.71784 1.57129 10.6387 1.57129H14.8054C15.1889 1.57129 15.4998 1.86977 15.4998 2.23796V12.238C15.4998 12.6061 15.1889 12.9046 14.8054 12.9046H10.2221C9.8537 12.9046 9.50043 13.0451 9.23997 13.2951C8.9795 13.5452 8.86631 13.7177 8.86631 14.0713C8.86631 14.488 8.55539 14.9046 7.99984 14.9046C7.44428 14.9046 7.1665 14.488 7.1665 14.0713V4.90462C7.1665 4.02057 7.53233 3.17272 8.18349 2.5476ZM8.83317 11.9285C9.25185 11.6965 9.59134 11.5713 10.0832 11.5713H14.1109V2.90462H10.9165C10.364 2.90462 9.83407 3.11534 9.44336 3.49041C9.05266 3.86548 8.83317 4.37419 8.83317 4.90462V11.9285Z" fill="#1B3555" />
                  </svg>
                  <div className="text-blue1 headline-md">Learn why ETH is Money...</div>
                  <Icon icon="feather:chevron-right" className="w-[24px] h-[24px] text-blue1" />
                </div>
              </div>
            </div>
            <div
              className="hidden desktop:flex w-full -left-[76px] justify-center absolute top-[725px] cursor-pointer"
              onClick={() => {
                const element = document.getElementById("second-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <Icon icon={"feather:chevron-down"} className="w-[64px] h-[64px] animate-slow-pulse text-blue5" />
            </div>
          </LandingContainerChild>
        </Section>
        <Section name="second" head={Sections[0].label} desc={Sections[0].description} height={651}>
          <EthExportProvider>
            <LandingContainerChild
              height={400}
              className="px-[15px] desktop:px-0 flex-1 w-[495px]"
            >
              <ExportChart />
            </LandingContainerChild>
            <LandingContainerChild
              head={<div className="flex text-blue2 gap-x-[5px]">Biggest ETHconomies</div>}
              height={400}
              className="basis-[600px]"
            >
              <ExportTable />
            </LandingContainerChild>
          </EthExportProvider>
        </Section>
        <EthHoldersProvider>
          <EthHoldersSection />
        </EthHoldersProvider>
        <Section name="fourth" head={Sections[2].label} desc={Sections[2].description}
          height={649}
        >
          <EthSupplyProvider>

            <IssuanceRateChart />
            {/* </LandingContainerChild> */}
            {/* <LandingContainerChild
              head={<div className="flex text-blue2 gap-x-[5px]">Events</div>}
              height={410}
              className="px-[15px] desktop:px-0 min-w-[600px]  desktop:w-1/2"
            >
              <IssuanceTable />
            </LandingContainerChild> */}
          </EthSupplyProvider>
        </Section>
        <Section
          name="fifth"
          head={Sections[3].label}
          height={671}
        >

          <div className="desktop:h-[534px] flex-col justify-start items-start inline-flex w-full -mt-[30px]">
            <div className="desktop:w-[757px]">
              <span className="text-blue1 highlight-text-lg">
                Ether (ETH) is the digital currency of the Ethereum blockchain, a decentralized network where transactions and applications run without central authority. As a form of money, Ether enables peer-to-peer transfers, powers decentralized applications, and serves as a store of value within a growing digital economy.<br />
              </span>
              <span className="text-blue1 text-md"><br />
                Unlike traditional currency, Ether operates on blockchain technology, making it globally accessible, secure, and transparent—a modern form of money for the digital age.</span>
            </div>


            {/* desktop */}
            <div className="h-[399px] overflow-visible reltaive -mt-[90px]">
              <Image src={ExplanationSVG} alt="Explanation" width={1118} height={443} />
            </div>
          </div>
          {/* mobile */}
          <div className="flex desktop:hidden flex-col w-full">
            <div className="h-56 flex-col justify-start items-start inline-flex">
              <div className="w-[281px] h-[124px] text-Lavender text-[100px] font-extrabold font-manrope"
                style={{
                  background: "linear-gradient(180deg, #CABED0 0%, #F1F9FC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >SoV</div>
              <div className="self-stretch h-[130px] pl-5 flex-col justify-start items-start gap-5 flex">
                <div className="w-[262.70px] text-blue1 headline-lg">Store of Value</div>
                <div className="self-stretch text-blue1 highlight-text-lg">Money preserves wealth over time. </div>
                <div className="self-stretch text-blue2 text-xs">ETH retains value through its decentralized and deflationary nature, especially as adoption grows.</div>
              </div>
            </div>
            <div className="h-[249px] flex-col justify-start items-start inline-flex">
              <div className="w-[281px] h-[124px] text-Lavender text-[100px] font-extrabold font-manrope"
                style={{
                  background: "linear-gradient(180deg, #CABED0 0%, #F1F9FC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >UoA</div>
              <div className="self-stretch h-[155px] pl-5 flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch text-blue1 headline-lg">Unit of Account</div>
                <div className="self-stretch text-blue1 highlight-text-lg">Money measures the value of goods and services.</div>
                <div className="self-stretch text-blue2 text-xs">ETH serves as a unit to price transactions, applications and goods, for example within Ethereum mainnet and Layer 2s.</div>
              </div>
            </div>
            <div className="h-[249px] flex-col justify-start items-start inline-flex">
              <div className="w-[281px] h-[124px] text-Lavender text-[100px] font-extrabold font-manrope"
                style={{
                  background: "linear-gradient(180deg, #CABED0 0%, #F1F9FC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >MoE</div>
              <div className="self-stretch h-[155px] pl-5 flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch text-blue1 headline-lg">Medium of Exchange</div>
                <div className="self-stretch text-blue1 highlight-text-lg">Money facilitates trade. </div>
                <div className="self-stretch text-blue2 text-xs">ETH enables seamless transactions, smart contracts, and the exchange of assets on its blockchain.</div>
              </div>
            </div>
          </div>
        </Section>
        <Section
          name="sixth"
          head={Sections[4].label}

        >
          {/* <div className="h-[950px] pb-[50px] flex-col justify-start items-start gap-5 inline-flex w-full">
            <div className="w-[262px] h-72 bg-[#d9d9d9]" />
            <div className="self-stretch h-[400px] flex-col justify-start items-start gap-[30px] flex">
              <div className="justify-center items-center gap-[21px] inline-flex  w-full">
                <div className="px-[25px] py-2.5 bg-blue5 rounded-[999px] justify-center items-center gap-2.5 flex">
                  <div className="text-blue1 headline-md">Donate to get your NFT now</div>
                </div>
                <div className="w-[184px] text-blue2 text-xs">NFT gives you access to our Discord community. Get involved!</div>
              </div>
              <div className="w-full h-10 text-blue1 text-lg">Join forces with core contributors like</div>
              <div className="w-full flex justify-start gap-x-[30px]">
                <Icon icon="gtp:bankless" className="w-[229px] h-[51px]" />
                <Image src="/The-Daily-Gwei.svg" alt="Bankless" width={181} height={53} />
                <Image src="/logo_full_light.png" alt="Bankless" width={226} height={53} />
              </div>
            </div>
          </div> */}
          <div className="flex flex-col gap-y-[30px] -mt-[15px]">
            <div className="headline-lg">ETH is Money is an tribe of believers who hold, stake, and propagate ETH as money.</div>
            <div>
              <div className="headline-md ">Why?</div>
              <div className="text-md ">Because it’s time to be bullish again.</div>
            </div>
            <div>
              <div className="headline-lg">Mission</div>
              <ul className="list-disc pl-5 pt-[10px] gap-y-[5px]">
                <li className="text-blue1">Build dashboards at ethismoney.xyz</li>
                <li className="text-blue1">Collect believers in our Discord</li>
                <li className="text-blue1">Propagate ETH is money to the world</li>
              </ul>
            </div>
            <div className="w-full flex gap-x-[15px] items-center">
              <Link href={" https://docs.google.com/forms/d/e/1FAIpQLSeIMsPjx_mDLK_ubgXw0_SIh991mfNJ3cuOgWZgXhu9VPPWwA/viewform"} target="_blank" rel="noopener" className="w-[280px] h-[44px] bg-blue5 rounded-full flex items-center justify-center headline-md"><div>Register your interest here</div> </Link>
              <div className="text-xs text-blue2">You will be redirected to Google Form. </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-[30px] -mt-[15px]">
            <div className="headline-lg">Join forces with core contributors like</div>
            <div className="text-md ">We launched this page with a long-term vision in mind. Come and support us and be an early contributors</div>
            <Icon icon="gtp:bankless" className="w-[229px] h-[51px]" />
            <Image src="/The-Daily-Gwei.svg" alt="Bankless" width={181} height={53} />
            <Image src="/logo_full_light.png" alt="Bankless" width={226} height={53} />
          </div>


        </Section>
        <Section
          name="seventh"
          head={Sections[5].label}
          desc={Sections[5].description}
        >
          <div className="flex flex-col desktop:flex-row gap-[30px] w-full">

            <div className="flex flex-col gap-y-[5px] desktop:basis-5/5">
              <Faq />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

