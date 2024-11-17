const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "500",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        raleway: ["var(--font-raleway)", "sans-serif"],
        sans: ["var(--font-manrope)", ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
        num: ["var(--font-fira-sans)", "sans-serif"],
      },
      /* From Figma */
      // --text--xxs: 10px;
      // --text--xs: 12px;
      // --text--sm: 13px;
      // --text--md: 18px;
      // --text--lg: 20px;
      // --text--xl: 24px;
      fontSize: {
        xxxs: "9px",
        xxs: "10px",
        xs: "12px",
        sm: "13px",
        md: "16px",
        lg: "20px",
        xl: "24px",
      },
      lineHeight: {
        snug: "1.2",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      screens: {
        cxl: "1100px",
        exl: "1330px",
        mdl: "1000px",
        xs: "480px",
        "2xs": "420px",
        "3xs": "340px",
        desktop: "1118px", // custom screen size from Figma
      },
      colors: {
        positive: "#4CFF7E",
        negative: "#FF3838",
        forest: {
          DEFAULT: "#293332",
          50: "#EAECEB", // updated
          100: "#F0F5F3",
          200: "#B5C4C3",
          300: "#9FB2B0",
          400: "#88A09D",
          500: "#CDD8D3",
          600: "#5F7775",
          700: "#364240",
          800: "#5A6462",
          900: "#2A3433",
          950: "#1B2524",
          1000: "#151A19",
        },
        beige: "#e5d7b2",
        blue1: "#1b3555",
        blue2: "#2a6f97",
        blue3: "#5fa8d3",
        blue4: "#a8dadc",
        blue5: "#b7dde8",
        burgundy: "#9f4039",
        "eth-logo": "#5f8ad3",
        gray: "#b0b7c3",
        "gray-blue": "#a1c4d1",
        green: "#7dbf7b",
        ice: "#f1f9fc",
        lavendar: "#cabed0",
        mint: "#c2e1c9",
        "soft-red": "#c35c5a",
      },

      animation: {
        shake: "shake 0.5s ease-in-out infinite",
        "slow-pulse": "slow-pulse 5s infinite",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "slow-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.0)", opacity: "0.3" },
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/container-queries"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-utility": {
          "scrollbar-width": "thin",
          "scrollbar-gutter": "stable both-edges",
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-track": {
            "background-color": "rgba(34, 85, 50, 0.05)",
            "border-radius": "12px",
          },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "#2d2f2e",
            "border-radius": "12px",
            border: "3px solid rgba(34, 85, 50, 0.05)",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    function ({ addUtilities, theme }) {
      // Define base styles for each category
      const baseStyles = {
        headline: {
          fontFamily: theme("fontFamily.manrope"),
          fontWeight: "800", // bold
          lineHeight: "120%",
        },

        "highlight-text": {
          fontFamily: theme("fontFamily.manrope"),
          fontWeight: "700", // bold
          lineHeight: "120%",
        },
        numbers: {
          fontFamily: theme("fontFamily.num"),
          fontWeight: "800", // bold
          letterSpacing: "0.05em", // 5%
          lineHeight: "100%",
          textRendering: "optimizeLegibility",
        },
      };
      // Define size variants for each category
      const sizeVariants = {
        /* From Figma */
        // --headline--xs: 14px;
        // --headline--sm: 16px;
        // --headline--md: 18px;
        // --headline--lg: 24px;
        // --headline--xl: 30px;
        // --headline--xl-link: 30px;
        // --headline--xxl: 48px;
        headline: {
          xs: "14px",
          sm: "16px",
          md: "18px",
          lg: "24px",
          xl: "30px",
          "xl-link": "30px",
          xxl: "48px",
        },
        /* From Figma */
        // --highlight--text--sm: 13px;
        // --highlight--text--md: 16px;
        // --highlight--text--lg: 18px;
        // --highlight--text--xl: 30px;
        "highlight-text": {
          sm: "13px",
          md: "16px",
          lg: "18px",
          xl: "30px",
        },
        /* From Figma */
        // --numbers--xxxs-bold: 9px;
        // --numbers--xs: 11px;
        // --numbers--sm: 13px;
        // --numbers--sm-bold: 13px;
        numbers: {
          "xxxs-bold": "9px",
          xs: "11px",
          sm: "13px",
          "sm-bold": "13px",
        },
      };

      const letterSpacingVariants = {
        headline: {
          "xl-link": "-0.04em",
          xxl: "-0.04em",
        },
      };

      const lineHeightVariants = {
        headline: {
          xs: "120%",
          sm: "133%",
          md: "133%",
          "xl-link": "30px",
          xxl: "48px",
        },
        "highlight-text": {
          sm: "150%",
          md: "133%",
        },
        numbers: {
          "xxxs-bold": "120%",
          xs: "120%",
          sm: "100%",
          "sm-bold": "120%",
        },
      };

      const fontWeights = {
        headline: {
          xs: "600", // bold
          sm: "600", // bold
          md: "600", // bold
          lg: "600", // semibold
          xxl: "800", // black
        },
        "highlight-text": {
          sm: "700", // bold
          md: "700", // bold
          lg: "700", // bold
          xl: "700", // black
        },
        numbers: {
          "xxxs-bold": "800", // bold
          xs: "800", // bold
          sm: "700", // semibold
          "sm-bold": "800", // bold
        },
      };

      const newUtilities = {};

      // Iterate over each category to generate utilities
      Object.keys(baseStyles).forEach((category) => {
        // Base class (e.g., .heading-large)
        newUtilities[`.${category}`] = baseStyles[category];

        // Size variants
        Object.entries(sizeVariants[category]).forEach(([size, fontSize]) => {
          newUtilities[`.${category}-${size}`] = {
            ...baseStyles[category],
            fontSize: fontSize,
          };
        });

        // Line height variants
        if (lineHeightVariants[category])
          Object.entries(lineHeightVariants[category]).forEach(
            ([size, lineHeight]) => {
              newUtilities[`.${category}-${size}`].lineHeight = lineHeight;
            }
          );

        // Font weight variants
        if (fontWeights[category])
          Object.entries(fontWeights[category]).forEach(
            ([weight, fontWeight]) => {
              newUtilities[`.${category}-${weight}`].fontWeight = fontWeight;
            }
          );

        // Letter spacing variants
        if (letterSpacingVariants[category])
          Object.entries(letterSpacingVariants[category]).forEach(
            ([weight, letterSpacing]) => {
              newUtilities[`.${category}-${weight}`].letterSpacing =
                letterSpacing;
            }
          );
      });

      // Add the generated utilities to Tailwind
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
