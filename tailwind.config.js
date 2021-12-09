module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.liquid',
    './_eleventy/**/*.js'
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
