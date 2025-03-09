import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Inter, Roboto_Mono, Fira_Sans, Manrope } from "next/font/google";
import Header from "@/components/Header";
import { Metadata } from "next";
import Head from "./(layout)/head";
import DeveloperTools from "@/components/development/DeveloperTools";
import SidebarContainer from "@/components/layout/SidebarContainer";
import MobileNav from "@/components/layout/MobileNav";
import "./background.css";


// const jsonLd = [jsonLdOrg, jsonLdWebSite];
export const viewport = {
  width: "device-width",
  initialScale: "1.0",
  themeColor: "#b7dde8",
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.ethismoney.xyz/`),
  title: "ETH is Money",
  description: "ETH is money is an tribe of believers who hold, stake, and propagate ETH as money.",
  openGraph: {
    title: "ETH is Money",
    description: "ETH is money is an tribe of believers who hold, stake, and propagate ETH as money.",
    url: "https://www.ethismoney.xyz/",

    images: [
      {
        url: "https://www.ethismoney.xyz/og-image.png",
        width: 1200,
        height: 627,
        alt: "ETH is Money",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETH is Money",
    description: "ETH is money is an tribe of believers who hold, stake, and propagate ETH as money.",
    site: "@ethismoneyHQ",
    siteId: "1846672231507566592",
    creator: "@ethismoneyHQ",
    creatorId: "1846672231507566592",
    images: ["https://www.ethismoney.xyz/og-image.png"],
  },
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
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
  })();
`;

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${robotoMono.variable} ${firaSans.variable}`}
      suppressHydrationWarning
    >

      <Head />
      <body className="overflow-x-hidden">
        <script
          dangerouslySetInnerHTML={{
            __html: script,
          }}
        />
        {children}
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