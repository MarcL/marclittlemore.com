const CANONICAL_URL = 'https://www.marclittlemore.com';
const isDevelopmentBuild = process.env.ELEVENTY_ENV === 'dev';
const isNetlifyProductionDeployment = process.env.CONTEXT === 'production';

// Netlify build URL
const netlifyBuildUrl = isNetlifyProductionDeployment ?
  CANONICAL_URL : process.env.DEPLOY_PRIME_URL;

// Point to localhost URL for development builds
const url = isDevelopmentBuild ? 'http://localhost:8080' : netlifyBuildUrl;

module.exports = {
  title: 'Marc Littlemore',
  headerImage: '/images/banners/home-bg.jpg',
  name: 'Marc Littlemore',
  email: 'marc@marclittlemore.com',
  description: 'Interesting articles from Marc Littlemore, an engineering manager, technical leader, full-stack developer, teacher, and life-long learner.',
  canonicalUrl: CANONICAL_URL,
  url,
  domain: 'www.marclittlemore.com',
  googleAnalyticsId: 'UA-810717-3',
  twitterUsername: 'marclittlemore',
  author: 'https://www.facebook.com/marcdavidlittlemore',
  facebookAppId: '534953096696612',
  author: {
    name: 'Marc Littlemore',
    email: 'marc@marclittlemore.com',
  }
};
