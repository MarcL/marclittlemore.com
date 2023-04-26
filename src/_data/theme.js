module.exports = {
    page: {
        font: 'font-sans antialiased',
        background: 'bg-white',
        text: {
            title: 'text-gray-900',
            subtitle: 'text-gray-600',
            content: 'text-gray-800',
        },
        sectionDark: {
            background: 'bg-gray-700 text-gray-800',
            text: {
                title: 'text-white',
                link: 'text-white hover:text-gray-200 hover:underline',
            }
        },
        sectionLight: {
            background: 'bg-gray-100 text-gray-800',
            text: {
                title: 'text-gray-800',
            }
        },
        metadata: {
            text: 'text-slate-700'
        },
        tableOfContents: {
            background: 'bg-blue-50 border-blue-100',
        },
        navigation: {
            text: {
                main: 'text-gray-900',
                selected: 'border-b-4 border-red-500',
                hover: 'border-white hover:border-red-500 hover:text-gray-700'
            }
        },
        footer: {
            background: 'bg-gradient-to-b from-gray-700 to-gray-900',
            column: {
                title: 'text-white',
                content: 'text-slate-100 hover:underline hover:text-slate-200',
            },
            icon: {
                main: 'text-white',
                fill: 'fill-white hover:fill-red-500'
            },
            copyright: {
                main: 'text-white'
            }
        }
    },
    article: {
        text: {
            title: 'text-gray-900 font-semibold',
            content: 'text-slate-600',
            hover: 'hover:decoration-red-500 hover:underline hover:decoration-red-500 hover:underline-offset-4'
        },
        icons: {
            main: 'text-red-700'
        }
    },
    bookshelf: {
        text: {
            title: 'text-gray-900',
            author: 'text-gray-600',
            content: 'text-gray-600',
            star: 'text-amber-400'
        }
    },
    card: {
        background: 'bg-white',
        text: {
            content: 'text-gray-500',
            link: 'underline hover:text-red-700'
        }
    },
    contact: {
        background: 'bg-white',
        text: {
            label: 'text-gray-700'
        },
        button: {
            background: 'bg-red-600',
            text: 'hover:bg-red-700 text-white font-bold'
        },
        input: {
            background: 'border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50'
        }
    }
};
