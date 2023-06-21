declare global {
    const __DEV__: boolean;
}

console.log("__DEV__", __DEV__);

const tailwindPaths = __DEV__
    ? "../../packages/auth-react/src/components/**/*.{js,ts,jsx,tsx}"
    : "./node_modules/@protoxyz/auth-next/node_modules/@protoxyz/auth-react/dist/**/*.{js,ts,jsx,tsx}";

export { tailwindPaths };
