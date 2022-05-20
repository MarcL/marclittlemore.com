const popularPages = require('./popularPages');

module.exports = [
    {
        name: 'Explore',
        links: [
            {
                name: 'Newsletter',
                url: '/newsletter/',
                title: 'Sign up for my intentional technical leadership newsletter'
            },
            {
                name: 'JavaScript Testing',
                url: '/javascript-testing/',
                title: 'Learn more about testing your JavaScript code'
            },
            {
                name: 'Chatbots',
                url: '/bots/',
                title: 'Learn how to create your own chatbot'
            },
            {
                name: 'Now',
                url: '/now/',
                title: 'What I\'m doing right now'
            },
            {
                name: 'Uses',
                url: '/uses/',
                title: 'Applications and hardware I use everyday'
            },
            {
                name: 'Topics',
                url: '/topics/',
                title: 'Topics that I write about'
            }
        ]    
    },
    {
        name: 'Popular pages',
        links: popularPages 
    },
    {
        name: 'More',
        links: [
            {
                name: 'Contact me',
                url: '/contact/',
                title: 'Send me a message and say hello'
            },
            {
                name: 'About me',
                url: '/about/',
                title: 'Who is Marc Littlemore?'
            },
        ] 
    }
];
