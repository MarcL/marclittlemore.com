module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.liquid',
    './src/**/*.md',
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
