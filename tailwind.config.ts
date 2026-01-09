import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EndPhone 색상 팔레트
        primary: {
          DEFAULT: "#00A77C",
          dark: "#008F6B",
          light: "#00C78E",
        },
        secondary: {
          DEFAULT: "#377DFF",
          dark: "#2563EB",
          light: "#60A5FA",
        },
        accent: {
          DEFAULT: "#505BF0",
          dark: "#4338CA",
          light: "#818CF8",
        },
        text: {
          primary: "#191919",
          secondary: "#333333",
          muted: "#555555",
          light: "#888888",
        },
        background: {
          DEFAULT: "#FFFFFF",
          alt: "#F9F9F9",
          dark: "#F3F4F6",
        },
        border: {
          DEFAULT: "#DBDBDB",
          light: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
