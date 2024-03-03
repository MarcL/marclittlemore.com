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
            background: 'bg-white',
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
            hover: 'group-hover:underline group-hover:underline-offset-4'
        },
        date: {
            text: 'text-slate-600 font-light',
            icon: 'fill-slate-600',
        },
        icons: {
            main: 'text-red-700'
        },
        image: {
            hover: 'group-hover:opacity-50'
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
            link: 'underline hover:text-red-700',
            groupLink: 'group-hover:underline group-hover:text-red-700'
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
    },
    landingpage: {
        background: 'bg-white',
        header: {
            background: 'bg-slate-200',
        },
        text: {
            title: 'text-slate-700'
        },
        form: {
            button: 'bg-red-600 hover:bg-red-800 text-white font-bold',
            text: {
                title: 'text-slate-800 font-semibold',
                content: 'text-slate-600'
            },
            input: {
                background: 'border-slate-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50'
            }
        }
    },
    confirmationPage: {
        background: 'bg-slate-200',
        card: {
            background: 'bg-white',
            text: {
                title: 'text-slate-900 font-bold',
                subtitle: 'text-slate-600 font-semibold',
                timer: 'text-slate-800 font-extrabold'
            },
            timer: {
                background: 'bg-red-100',
                main: 'bg-red-600'
            },
            step: {
                completed: 'bg-slate-200 text-slate-600',
                selected: 'bg-white text-slate-600',
                icon: 'fill-red-600'
            }
        }
    },
    biography: {
        background: 'bg-slate-600 font-sans antialiased',
        text: {
            title: 'text-white'
        },
        card: {
            background: 'bg-white hover:bg-red-300',
            text: {
                main: 'text-slate-900'
            },
            icon: 'fill-slate-800 hover:fill-slate-600'
        }
    },
    authorCard: {
        background: 'bg-blue-50 border border-blue-100',
        text: {
            main: 'text-slate-600'
        },
        image: 'bg-white'
    },
    webmentions: {
        like: 'text-red-500',
        repost: 'text-blue-500',
        reply: 'text-emerald-500',
        mention: 'text-slate-500',
        replyCard: {
            background: 'bg-white',
            author: 'bg-blue-50'
        }
    },
    newsletterForm: {
        background: 'bg-slate-50 border border-slate-100 ',
        text: {
            title: 'text-slate-800',
            link: 'text-purple-900 hover:underline hover:text-purple-600'
        },
        input: {
            background: 'border-slate-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50'
        },
        checkbox: {
            background: 'border-slate-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50'
        },
        message: {
            error: 'text-red-600'
        },
        button: 'bg-red-600 hover:bg-red-500 text-white font-bold'
    }
};
