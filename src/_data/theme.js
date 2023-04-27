module.exports = {
    page: {
        font: 'font-sans antialiased',
        background: 'bg-white',
        text: {
            title: 'text-slate-900',
            subtitle: 'text-slate-600',
            content: 'text-slate-800',
        },
        sectionDark: {
            background: 'bg-slate-700 text-slate-800',
            text: {
                title: 'text-white',
                link: 'text-white hover:text-slate-200 hover:underline',
            }
        },
        sectionLight: {
            background: 'bg-slate-100 text-slate-800',
            text: {
                title: 'text-slate-800',
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
                main: 'text-slate-900',
                selected: 'border-b-4 border-red-500',
                hover: 'border-white hover:border-red-500 hover:text-slate-700'
            }
        },
        footer: {
            background: 'bg-gradient-to-b from-slate-700 to-slate-900',
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
            title: 'text-slate-900 font-semibold',
            content: 'text-slate-600',
            hover: 'hover:decoration-red-500 hover:underline hover:decoration-red-500 hover:underline-offset-4'
        },
        icons: {
            main: 'text-red-700'
        },
        image: {
            hover: 'hover:grayscale'
        }
    },
    bookshelf: {
        text: {
            title: 'text-slate-900',
            author: 'text-slate-600',
            content: 'text-slate-600',
            star: 'text-amber-400'
        }
    },
    card: {
        background: 'bg-white',
        text: {
            content: 'text-slate-600',
            link: 'underline hover:text-red-700'
        },
        image: {
            hover: 'hover:grayscale'
        }
    },
    contact: {
        background: 'bg-white',
        text: {
            label: 'text-slate-700'
        },
        button: {
            background: 'bg-red-600',
            text: 'hover:bg-red-700 text-white font-bold'
        },
        input: {
            background: 'border-slate-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50'
        }
    }
};
