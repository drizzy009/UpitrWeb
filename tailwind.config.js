/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Montserrat', 'Sans-serif']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
