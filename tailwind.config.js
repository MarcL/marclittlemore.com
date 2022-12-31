module.exports = {
  content: [
    './src/**/*.{html,liquid,md,js}',
    './_eleventy/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
}
