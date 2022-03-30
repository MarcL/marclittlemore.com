// Point to localhost URL for development builds
const url = process.env.ELEVENTY_ENV === 'dev' ?
  'http://localhost:8080' : 'https://www.marclittlemore.com';

module.exports = {
  title: 'Marc Littlemore',
  headerImage: '/images/banners/home-bg.jpg',
  name: 'Marc Littlemore',
  email: 'marc@marclittlemore.com',
  description: 'Interesting articles from Marc Littlemore, an engineering manager, technical leader, full-stack developer, teacher, and life-long learner.',
  url,
  domain: 'www.marclittlemore.com',
  googleAnalyticsId: 'UA-810717-3',
  twitterUsername: 'marclittlemore',
  author: 'https://www.facebook.com/marcdavidlittlemore',
  facebookAppId: '534953096696612'
};
