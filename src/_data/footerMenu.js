const popularPages = require('./popularPages');

module.exports = [
  {
    name: 'Explore',
    links: [
      {
        name: 'Notes',
        url: '/notes/',
        title: 'My microblog notes',
      },
      {
        name: 'Newsletter',
        url: '/newsletter/',
        title: 'Sign up for my intentional technical leadership newsletter',
      },
      {
        name: 'JavaScript Testing',
        url: '/javascript-testing/',
        title: 'Learn more about testing your JavaScript code',
      },
      {
        name: 'Chatbots',
        url: '/bots/',
        title: 'Learn how to create your own chatbot',
      },
      {
        name: 'Interviews',
        url: '/interviews/',
        title: 'Interviews with Marc Littlemore',
      },
      {
        name: 'Now',
        url: '/now/',
        title: "What I'm doing right now",
      },
      {
        name: 'Uses',
        url: '/uses/',
        title: 'Applications and hardware I use everyday',
      },
      {
        name: 'Writing Topics',
        url: '/topics/',
        title: 'Topics that I write about',
      },
    ],
  },
  {
    name: 'Popular pages',
    links: popularPages,
  },
  {
    name: 'More about me',
    links: [
      {
        name: 'Contact',
        url: '/contact/',
        title: 'Send me a message and say hello',
      },
      {
        name: 'About me',
        url: '/about/',
        title: 'Who is Marc Littlemore?',
      },
      {
        name: 'How I almost died',
        url: '/how-i-almost-died/',
        title: 'Learn how I almost died',
      },
      {
        name: 'Games I worked on',
        url: '/games/',
        title: 'Here are some of the video games I worked on.',
      },
    ],
  },
];
