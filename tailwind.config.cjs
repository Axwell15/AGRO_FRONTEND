/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: ["./src/**/**/*.{jsx,css}"],
  theme: {
    extend: {
      height: {
        "w-card": 'calc(100vw + 2rem)',
        "w-image": "calc(100vw - 6rem)",
        600: '600px',
        360: '360px',
      },
      width: {
        600: '600px',
        360: '360px',
      },
      fontFamily: {
        "title-font": ["Inter", "sans-serif"],
      },
      colors: {
        "primary-color": '#476A17',
        "primary-alt": '#476A17',
        "secondary-color": '#476A17',
        "alt-bg": '#D9D9D9',
      },

    }
  }
} 
