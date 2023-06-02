/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: "always",
  printWidth: 120,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 4,
  useTabs: false,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  // tailwindConfig: "@protoxyz/config-tailwind",
};
