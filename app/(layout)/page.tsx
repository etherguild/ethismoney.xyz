"use client";
import Section from "@/components/LandingPageContainer";
import LandingContainerChild from "@/components/LandingContainerChild";
import IssuanceRateChart from "@/components/layout/EthIssuance/IssuanceRateChart";
import { EthExportProvider } from "@/components/layout/EthExport/ExportContext";
import ExportChart from "@/components/layout/EthExport/ExportChart";
import ExportTable from "@/components/layout/EthExport/ExportTable";
import { EthSupplyProvider } from "@/components/layout/EthSupply/EthSupplyContext";
import { EthHoldersProvider } from "@/components/layout/EthHolders/EthHoldersContext";
import { EthHoldersSection } from "@/components/layout/EthHolders/EthHoldersSection";
import Faq from "@/components/layout/FAQ/Glossary";
import { Sections } from "@/lib/sections";
import FirstSection from "@/components/layout/FirstSection/FirstSection";
import { MobileEthIsMoneyBecause } from "@/components/MobileEthIsMoneyBecause";
import Footer from "@/components/Footer";

export default function Page() {
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
        </Section>
        <Section
          name="seventh"
          head={Sections[4].label}
          desc={Sections[4].description}
        >
          <div className="flex flex-col gap-y-[30px]">
            <div className="px-[15px] desktop:px-0 flex flex-col desktop:flex-row gap-[30px]">
              <div className="flex flex-col gap-y-[5px]">
                <Faq />
              </div>
            </div>
            <Footer />
          </div>
        </Section>
      </div>
    </>
  );
}
