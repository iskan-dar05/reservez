/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          light: "#4796A9",
          dark: "#3A7988",
        },
      },
      boxShadow: {
        custom: "20px 20px 60.2px rgba(0, 0, 0, 0.10)", // removed spread (6 not valid in Tailwind)
        custom2: "10px 10px 6.7px rgba(0, 0, 0, 0.25)", // spread is 0 (by default)
        form: "6px 6px 11.4px -10px rgba(0, 0, 0, 0.25)", // added missing 'px' for spread
        filter: "58px 44px 61.4px rgba(0, 0, 0, 0.15)", // completed rgba value
        search: "18px 10px 31.1px rgba(0, 0, 0, 0.10)", // completed rgba value
        notifichationButton: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)", // completed rgba value
        chatRoom: "41px 57px 66px 0px rgba(0, 0, 0, 0.06)", // completed rgba value

      },
      
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #4796A9, #3A7988)",
        "custom-gradient1": "linear-gradient(to right, #4796A90A, #3A79880A)",
        "card-gradient":
          "linear-gradient(to bottom, #181C1D1A 10%, #242828 100%)",
        'card-gradient2': 'linear-gradient(to right, #2D555FDB 50%, #203135DB 86%)', 
        'deatils-gradient': 'linear-gradient(to left,  #5DB0C500 20% , #2D555F 100% )', 
        'profileCard-gradient': 'linear-gradient(to bottom,  #5E8F9B00 0% , #203135 100% )', 

      },
    },
  },
  plugins: [],
};
