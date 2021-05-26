module.exports = {
    important: true,
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                top: '0 -5px 5px -5px #333'
            }
        },
    },
    variants: {
        extend: {
            width: ['responsive', 'hover', 'focus']
        },
    },
    plugins: [],
}
