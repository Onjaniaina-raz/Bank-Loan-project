/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        //Enchanted forest
        'bank-01': '#f1fffa',
        'bank-02': '#ccfccb',
        'bank-03': '#96e6b3',
        'bank-04': '#568259',
        'bank-05': '#464e47',

        //Forest green
        'bank-1': '#dce1de',
        'bank-2': '#9cc5a1',
        'bank-3': '#49a078',
        'bank-4': '#216869',
        'bank-5': '#1f2421',

        //Sky blue freshness
        'bank-11': "#ebf2fa",
        'bank-12': "#427aa1",
        'bank-13': "#05668d",
        'bank-14': "#a5be00",
        'bank-15': "#679436",
      },
    },
  },
  plugins: [],
};

