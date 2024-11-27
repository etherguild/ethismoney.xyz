import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "../providers";
import { Inter, Roboto_Mono, Fira_Sans, Manrope } from "next/font/google";
import Header from "@/components/Header";

import { Metadata } from "next";
import Head from "./head";
import { Graph } from "schema-dts";

import "../background.css";
import DeveloperTools from "@/components/development/DeveloperTools";
import SidebarContainer from "@/components/layout/SidebarContainer";
import { BackgroundImage } from "./BackgroundImage";
import Image from "next/image";


const jsonLd: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.ethismoney.xyz/#organization",
      name: "ethismoney",
      url: "https://www.ethismoney.xyz",
      logo: "https://www.ethismoney.xyz/eth-is-money-logo.png",
      sameAs: [
        "https://x.com/ethismoneyHQ",
        "https://github.com/ethismoney-xyz",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ethismoney.xyz/#website",
      url: "https://www.ethismoney.xyz",
      name: "ethismoney",
      description:
        "At growthepie, our mission is to provide comprehensive and accurate analytics of layer 2 solutions for the Ethereum ecosystem, acting as a trusted data aggregator from reliable sources such as L2Beat and DefiLlama, while also developing our own metrics.",
      publisher: {
        "@type": "Organization",
        name: "ethismoney",
        logo: {
          "@type": "ImageObject",
          url: "https://www.ethismoney.xyz/eth-is-money-logo.png",
        },
      },
    },
  ],
};

// const jsonLd = [jsonLdOrg, jsonLdWebSite];
export const viewport = {
  width: "device-width",
  initialScale: "1.0",
  themeColor: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://eth-is-money.vercel.app/`),
  title: "ETH is Money",
  description: "ETH is money is an tribe of believers who hold, stake, and propagate ETH as money.",
  // openGraph: {
  //   title: "",
  //   description: "",
  //   url: "",

  //   images: [
  //     {
  //       url: "",
  //       width: 1200,
  //       height: 627,
  //       alt: "",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "",
  //   description: "",
  //   site: "",
  //   siteId: "",
  //   creator: "",
  //   creatorId: "",
  //   images: [""],
  // },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// If loading a variable font, you don't need to specify the font weight

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: false,
  weight: ["300", "400", "500", "600", "700", "800"],
});


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
  adjustFontFallback: false,
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-fira-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],

});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const script = `
  (function() {
    // Set dark theme
    document.documentElement.classList.add('light');
    // Optionally, set dark theme in local storage
    localStorage.setItem('theme', 'light');
  })();
`;

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${robotoMono.variable} ${firaSans.variable}`}
      suppressHydrationWarning
    // style={{
    //   fontFeatureSettings: "'pnum' on, 'lnum' on",
    //   scrollSnapType: "y mandatory",
    // }}
    >

      <Head />
      <body className="overflow-x-hidden">
        <script
          dangerouslySetInnerHTML={{
            __html: script,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {/* <div className="flex items-center h-fit w-full justify-center"> */}
          <LayoutGrid />
          <Backgrounds />
          {/* </div> */}
          <div className="flex max-w-[1380px] mx-auto">
            <SidebarContainer />
            <div id="content-panel" className="w-full flex flex-col desktop:pl-[30px] relative min-h-full text-blue1 pb-[165px]"
            // style={{ scrollSnapType: "y mandatory", }}
            >
              <Header />
              {children}
            </div>
          </div>
          {/* </div> */}
          <DeveloperTools />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

// 10 column w/ 30px gap layout grid for making sure the layout is consistent
const LayoutGrid = () => {
  return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center">
      <div className="grid grid-cols-10 gap-[30px] h-full w-[1280px]">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="h-full bg-red-500/[4%]" />
        ))}
      </div>
    </div>
  );
}



const Backgrounds = () => {
  return (
    <>
      <div className="background-container !fixed">
        <div className="background-gradient-eth">
          <div className="from-lavendar to-"></div>
          <div className="background-gradient-ice"></div>
        </div>
      </div>
      {/* <div className="relative w-full overflow-hidden"> */}
      <div className="background-image-container">
      </div>
    </>
  );
}