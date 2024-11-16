"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export const BackgroundImage = () => {

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger);


  // })


  return (
    <div className="w-[2027px] h-[565px]">
      {/* <svg className="background-image" width="2027" height="565" viewBox="0 0 2027 565" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_910_2193" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="2027" height="565">
          <rect width="2027" height="565" fill="url(#paint0_radial_910_2193)" />
        </mask>
        <g mask="url(#mask0_910_2193)">
          <path d="M476.911 197.152C444.233 204.679 -105.388 197.152 -139 197.152V556L2351 555.999V-150C2218.94 58.3769 1783 53.9055 1358.8 53.9055C1242.5 53.9055 1191.43 75.7632 1163.53 99.3452C1128.28 129.145 1089.55 121.522 1051.98 102.883C1027.91 90.9406 996.479 58.5713 969.323 67.754C944.671 76.0901 935.438 113.017 919.947 136.496C909.719 151.999 898.051 144.349 885.384 138.266C853.928 123.159 814.55 90.1244 780.323 107.053C764.992 114.636 755.457 134.205 738.811 138.518C719.204 143.599 701.536 130.556 682.394 127.651C665.948 125.155 652.891 131.43 637.499 137.507C631.304 139.953 621.76 133.056 616.377 130.178C605.502 124.364 596.859 114.542 586.568 107.685C579.46 102.949 568.673 118.725 563.983 123.228C542.322 144.026 503.006 191.141 476.911 197.152Z" fill="url(#paint1_linear_910_2193)" />
          <path d="M1929.27 148.537C1571.33 471.115 543.812 342.015 298.567 46.659C-73.5715 -154.181 -1217.62 611.364 229.56 563.873L1784.95 563.873C3407.96 563.873 2215.62 -109.525 1929.27 148.537Z" fill="url(#paint2_linear_910_2193)" />
        </g>
        <defs>
          <radialGradient id="paint0_radial_910_2193" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1013.5 282.5) scale(1013.5 282.5)">
            <stop stopColor="white" />
            <stop offset="1" />
          </radialGradient>
          <linearGradient id="paint1_linear_910_2193" x1="1030.59" y1="58.605" x2="1030.59" y2="293.352" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5F8AD3" />
            <stop offset="1" stopColor="#5FA8D3" />
          </linearGradient>
          <linearGradient id="paint2_linear_910_2193" x1="1064.1" y1="280.086" x2="1049.22" y2="466" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D9D9D9" stop-opacity="0" />
            <stop offset="1" stopColor="#DBEEF5" />
          </linearGradient>
        </defs>
      </svg> */}
      <svg className="background-image" width="2027" height="565" viewBox="0 0 2027 565" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <mask id="mask0_910_2193" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="2027" height="565">
          <rect width="2027" height="565" fill="url(#paint0_radial_910_2193)" />
        </mask>
        <g mask="url(#mask0_910_2193)">
          <path d="M476.911 197.152C444.233 204.679 -105.388 197.152 -139 197.152V556L2351 555.999V-150C2218.94 58.3769 1783 53.9055 1358.8 53.9055C1242.5 53.9055 1191.43 75.7632 1163.53 99.3452C1128.28 129.145 1089.55 121.522 1051.98 102.883C1027.91 90.9406 996.479 58.5713 969.323 67.754C944.671 76.0901 935.438 113.017 919.947 136.496C909.719 151.999 898.051 144.349 885.384 138.266C853.928 123.159 814.55 90.1244 780.323 107.053C764.992 114.636 755.457 134.205 738.811 138.518C719.204 143.599 701.536 130.556 682.394 127.651C665.948 125.155 652.891 131.43 637.499 137.507C631.304 139.953 621.76 133.056 616.377 130.178C605.502 124.364 596.859 114.542 586.568 107.685C579.46 102.949 568.673 118.725 563.983 123.228C542.322 144.026 503.006 191.141 476.911 197.152Z" fill="url(#paint1_linear_910_2193)" />
          <path d="M1929.27 148.537C1571.33 471.115 543.812 342.015 298.567 46.659C-73.5715 -154.181 -1217.62 611.364 229.56 563.873L1784.95 563.873C3407.96 563.873 2215.62 -109.525 1929.27 148.537Z" fill="url(#paint2_linear_910_2193)" />
        </g>
        {/* <mask id="mask0_0_1" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="661" y="80" width="582" height="582">
          <circle cx="952" cy="371" r="291" fill="white" />
        </mask> */}
        <mask id="mask1_0_1" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="925" y="0" width="1000" height="1000">
          <rect x="980" y="70" width="658" height="658" fill="url(#pattern0_0_1)" />
        </mask>
        <g mask="url(#mask1_0_1)">
          <circle cx="1100" cy="100" r="900" fill="white" />
        </g>
        <defs>
          <radialGradient id="paint0_radial_910_2193" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1013.5 282.5) scale(1013.5 282.5)">
            <stop stopColor="white" />
            <stop offset="1" />
          </radialGradient>
          <linearGradient id="paint1_linear_910_2193" x1="1030.59" y1="58.605" x2="1030.59" y2="293.352" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5F8AD3" />
            <stop offset="1" stopColor="#5FA8D3" />
          </linearGradient>
          <linearGradient id="paint2_linear_910_2193" x1="1064.1" y1="280.086" x2="1049.22" y2="466" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D9D9D9" stopOpacity="0" />
            <stop offset="1" stopColor="#DBEEF5" />
          </linearGradient>
          <pattern id="pattern0_0_1" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_0_1" transform="scale(0.000976562)" />
          </pattern>
          <linearGradient id="paint0_linear_0_1" x1="672.586" y1="58.605" x2="672.586" y2="293.352" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5F8AD3" />
            <stop offset="1" stopColor="#5FA8D3" />
          </linearGradient>
          <image id="image0_0_1" width="1024" height="1024" xlinkHref="/graphic_of_Ether.png" />
        </defs>
      </svg>
    </div>
  )

}

