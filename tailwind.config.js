/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neutralSilver: "white",
                neutralDGrey: "#4D4D4D",
                brandPrimary: "#4CAF4F",
                neutralGrey: "#717171",
                gray900: "#18191F",
                primary: "#F5385D",
            },
            backgroundColor: {
                primary: "#F5385D",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};

