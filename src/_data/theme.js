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
    }
};
