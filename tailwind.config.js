const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        cyan: colors.cyan,
        // prettier-ignore
        "aquamarine": "#9DC6D8",
        // prettier-ignore
        "scuba-blue": "#00B2CA",
        // prettier-ignore
        "lucite-green": "#7ACCB8",
        // prettier-ignore
        "classic-blue": "#0F4C81",
        // prettier-ignore
        "toasted-almond": "#D2B29A",
        // prettier-ignore
        "strawberry-ice": "#E3868F",
        // prettier-ignore
        "tangerine": "#F79256",
        // prettier-ignore
        "custard": "#EAD98B",
        // prettier-ignore
        "marsala": "#955251",
        // prettier-ignore
        "glacier-gray": "#C6CBCC",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
