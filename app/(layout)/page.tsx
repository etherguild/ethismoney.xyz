"use client";
import Section from "@/components/LandingPageContainer";
import LandingContainerChild from "@/components/LandingContainerChild";
import IssuanceRateChart from "@/components/layout/EthIssuance/IssuanceRateChart";
import { EthExportProvider } from "@/components/layout/EthExport/ExportContext";
import ExportChart from "@/components/layout/EthExport/ExportChart";
import ExportTable from "@/components/layout/EthExport/ExportTable";
import Icon from "@/components/layout/Icon";
import { useEffect, useState } from "react";
import { EthSupplyProvider } from "@/components/layout/EthSupply/EthSupplyContext";
import { EthHoldersProvider } from "@/components/layout/EthHolders/EthHoldersContext";
import { EthHoldersSection } from "@/components/layout/EthHolders/EthHoldersSection";
import ExplanationSVG from "./explanation.svg";
import Image from "next/image";
import Faq from "@/components/layout/FAQ/Glossary";
import { Sections } from "@/lib/sections";
import Link from "next/link";
import FirstSection from "@/components/layout/FirstSection/FirstSection";
import { MobileEthIsMoneyBecause } from "@/components/MobileEthIsMoneyBecause";
import NFTTierDisplay from "@/components/NFTTierDisplay";
import NewsLetterSignup from "@/components/NewsLetterSignup";

export default function Page() {
  const [isResizing, setIsResizing] = useState(false);
  const [vw, setVw] = useState<number>(0);
  const [vh, setVh] = useState<number>(0);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsResizing(true);

  //     setVw(window.innerWidth);
  //     setVh(window.innerHeight);

  //     if (window.innerWidth < 1118) {
  //       document.body.style.overflowY = "hidden";
  //     } else {
  //       document.body.style.overflowY = "auto";
  //     }

  //     setTimeout(() => {
  //       setIsResizing(false);
  //     }, 100);
  //   };

  //   // Run once on mount
  //   setVw(window.innerWidth);
  //   setVh(window.innerHeight);

  //   // Add event listener
  //   window.addEventListener("resize", handleResize);

  //   // Remove event listener on cleanup
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // if (isResizing) {
  //   return (
  //     <div className="flex justify-center items-center h-screen w-screen">
  //       {/* <div className="text-2xl">Resizing...</div> */}
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="flex flex-col gap-y-[60px]">
        <FirstSection />
        <Section
          name="second"
          head={Sections[0].label}
          desc={Sections[0].description}
          height={651}
        >
          <EthExportProvider>
            <LandingContainerChild
              height={400}
              className="px-[15px] desktop:px-0 flex-1 w-[495px]"
            >
              <ExportChart />
            </LandingContainerChild>
            <LandingContainerChild
              head={
                <div className="flex text-blue2 gap-x-[5px] px-[15px] desktop:px-0">
                  Biggest ETHconomies
                </div>
              }
              height={400}
              className="w-full desktop:w-[600px]"
            >
              <div className="w-full mx-auto desktop:w-auto desktop:mx-0">
                <div className="overflow-x-auto px-[15px] pb-[15px] desktop:pb-0 desktop:px-0">
                  <div className="min-w-[500px] desktop:min-w-[600px]">
                    <ExportTable />
                  </div>
                </div>
              </div>
            </LandingContainerChild>
          </EthExportProvider>
        </Section>
        <EthHoldersProvider>
          <EthHoldersSection />
        </EthHoldersProvider>
        <Section
          name="fourth"
          head={Sections[2].label}
          desc={Sections[2].description}
          height={649}
        >
          <EthSupplyProvider>
            <IssuanceRateChart />
          </EthSupplyProvider>
        </Section>
        <Section name="fifth" head={Sections[3].label} height={671}>
          <div className="px-[15px] desktop:px-0 desktop:h-[534px] flex-col justify-start items-start inline-flex w-full -mt-[30px]">
            <div className="desktop:w-[757px]">
              <span className="text-blue1 highlight-text-lg">
                Ether (ETH) is the digital currency of the Ethereum blockchain,
                a decentralized network where transactions and applications run
                without central authority. As a form of money, Ether enables
                peer-to-peer transfers, powers decentralized applications, and
                serves as a store of value within a growing digital economy.
                <br />
              </span>
              <span className="text-blue1 text-md">
                <br />
                Unlike traditional currency, Ether operates on blockchain
                technology, making it globally accessible, secure, and
                transparent—a modern form of money for the digital age.
              </span>
            </div>

            {/* desktop */}
            <div className="hidden desktop:block h-[399px] overflow-visible relative -mt-[90px]">
              {/* <Image src={ExplanationSVG} alt="Explanation" width={1118} height={443} /> */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "calc(-162px - (100vw - 1380px)/2)",

                  backgroundImage: `url("/explanation.svg")`,
                  backgroundSize: "max(100vw, 1380px) 100%",
                  backgroundRepeat: "no-repeat",
                  overflow: "visible",
                  backgroundPosition: "center",
                  width: "100vw",
                  height: "100%",
                }}
              />
            </div>
          </div>
          {/* mobile */}
          <div className="block desktop:hidden px-[15px]">
            <MobileEthIsMoneyBecause />
          </div>

          {/* <div className="px-[15px] desktop:px-0 flex desktop:hidden flex-col w-full">
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
          </div> */}
        </Section>
        <Section name="sixth" head={Sections[4].label} className="flex flex-col">
          <div className="w-full">
            <div className="flex flex-col desktop:flex-row gap-[30px] w-full">
              <div className="px-[15px] desktop:px-0 flex flex-col gap-y-[30px] -mt-[15px]">
                <div className="headline-lg">
                  ETH is Money is an tribe of believers who hold, stake, and
                  propagate ETH as money.
                </div>
                <div>
                  <div className="headline-md ">Why?</div>
                  <div className="text-md ">
                    Because it’s time to be bullish again.
                  </div>
                </div>
                <div>
                  <div className="headline-lg">Mission</div>
                  <ul className="list-disc pl-5 pt-[10px] gap-y-[5px]">
                    <li className="text-blue1">
                      Build dashboards at ethismoney.xyz
                    </li>
                    <li className="text-blue1">Collect believers in our Discord</li>
                    <li className="text-blue1">
                      Propagate ETH is money to the world
                    </li>
                  </ul>
                </div>
                <div className="w-full flex flex-col desktop:flex-row gap-[15px] items-center">
                  <Link
                    href={
                      " https://docs.google.com/forms/d/e/1FAIpQLSeIMsPjx_mDLK_ubgXw0_SIh991mfNJ3cuOgWZgXhu9VPPWwA/viewform"
                    }
                    target="_blank"
                    rel="noopener"
                    className="w-[280px] h-[44px] bg-blue5 rounded-full flex items-center justify-center headline-md"
                  >
                    <div>Register your interest here</div>{" "}
                  </Link>
                  <div className="text-xs text-blue2">
                    You will be redirected to a Google Form.{" "}
                  </div>
                </div>
              </div>
              <div className="px-[15px] desktop:px-0 flex flex-col gap-y-[30px] -mt-[15px]">
                <div className="headline-lg">
                  Join forces with core contributors like
                </div>
                <div className="text-md ">
                  We launched this page with a long-term vision in mind. Come and
                  support us and be an early contributors
                </div>
                <Link
                  href={"https://www.bankless.com/"}
                  target="_blank"
                  rel="noopener"
                >
                  <Icon icon="gtp:bankless" className="w-[229px] h-[51px]" />
                </Link>
                <Link
                  href={"https://www.youtube.com/channel/UCvCp6vKY5jDr87htKH6hgDA"}
                  target="_blank"
                  rel="noopener"
                >
                  <Image
                    src="/The-Daily-Gwei.svg"
                    alt="Bankless"
                    width={181}
                    height={53}
                  />
                </Link>
                <Link
                  href={"https://www.growthepie.xyz/"}
                  target="_blank"
                  rel="noopener"
                >
                  <Image
                    src="/logo_full_light.png"
                    alt="Bankless"
                    width={226}
                    height={53}
                  />
                </Link>
              </div>
            </div>
            {/* Donate and mint your NFT section */}
            <div className="px-[15px] desktop:px-0 mt-[40px] flex flex-col gap-y-[20px]">
              <div className="text-[#2A6F97] text-[24px] desktop:text-[30px] font-semibold font-manrope">Donate and mint your NFT for Discord access</div>
              <div className="text-[#1B3555] text-[18px] font-bold font-manrope">
                By donating the stated amount you support and gain access to the exclusive Discord and can shape the ETH is Money movement with everyone.
              </div>

              {/* NFT Carousel/Slider for mobile */}
              <NFTTierDisplay />

              <div className="text-[#1B3555] text-[12px] font-normal font-manrope mt-[10px]">
                Eth is Money is an initiative of Ether Guild, a Wyoming Non-Profit Corporation. Ether Guild is applying for 501( c )( 3 ) status from the IRS, and pending IRS approval, your donations may be treated as tax deductible. While there is no assurance of the tax deductibility of your donation, if you would like a tax receipt, please email donate@etherguild.xyz
              </div>
            </div>

            {/* News Letter section */}
            {/* Custom hack didn't work :( */}
            {/* <NewsLetterSignup /> */}
            <div className="w-full desktop:w-1/2 flex flex-col items-center gap-[15px] !light">
              {/* Paragraph iframe with minimal styling */}
              {/* <iframe src="https://paragraph.xyz/@etherguild/embed?minimal=true&vertical=true" width="480" height="90" ></iframe> */}
              <iframe src="https://paragraph.xyz/@etherguild/embed" width="480" height="380" style={{ border: "1px solid #EEE", background: "transparent" }} scrolling="no"></iframe>
            </div>
            {/* <div className="px-[15px] desktop:px-0 mt-[40px] flex flex-col gap-y-[10px]">
              <div className="text-[#2A6F97] text-[24px] desktop:text-[30px] font-semibold font-manrope">Keep up-to-date with our newsletter</div>

              <div className="flex flex-col desktop:flex-row gap-[20px] items-start">
                <div className="w-full desktop:w-1/2">
                  <span className="text-[#1B3555] text-[18px] font-bold font-manrope">Every day, there is new data around the topic of ETH is Money. We want you to be up-to-date with the latest.</span>
                  <br /><br />
                  <span className="text-[#1B3555] text-[18px] font-normal font-manrope">We'll deliver it weekly to your inbox, alongside educational content what money actually is, how ETH is doing and how it's going. And of course what everyone can do themselves.</span>
                </div>

                <div className="w-full desktop:w-1/2 flex flex-col items-center gap-[10px]">
                  <div className="w-full max-w-[450px] h-[74px] px-[50px] py-[25px] bg-[#FEFEFE] rounded-full border-[3px] border-[#1B3555] flex justify-center items-center">
                    <div className="text-[#B0B7C3] text-[18px] font-semibold font-manrope">vitalik@ethismoney.xyz</div>
                  </div>

                  <div className="px-[25px] py-[10px] bg-[#B7DDE8] rounded-full flex justify-center items-center">
                    <div className="text-[#1B3555] text-[18px] font-semibold font-manrope">Register your interest here</div>
                  </div>

                  <div className="text-center text-[#2A6F97] text-[12px] font-normal font-manrope">We will only send informative emails and the latest data snapshots.</div>
                </div>
              </div>
            </div> */}
          </div>
        </Section>
        <Section
          name="seventh"
          head={Sections[5].label}
          desc={Sections[5].description}
        >
          <div className="px-[15px] desktop:px-0 flex flex-col desktop:flex-row gap-[30px]">
            <div className="flex flex-col gap-y-[5px]">
              <Faq />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
