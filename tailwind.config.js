module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        foodTheme: {
          "primary": "#EF4444",       /* Red */
          "secondary": "#FCD34D",     /* Yellow */
          "accent": "#22C55E",        /* Green */
          "neutral": "#1C1917",       /* Dark Brown */
          "base-100": "#FFF7ED",      /* Off White */
          "info": "#38BDF8",
          "success": "#4ADE80",
          "warning": "#FB923C",
          "error": "#DC2626",
        },
      },
      "light",
      "dark",
    ],
  },
};
