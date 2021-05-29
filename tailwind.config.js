module.exports = {
    important: true,
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                top: '0 -5px 5px -5px #333',
                // right: '5px 0 5px -5px #333',
                bottom: '0 5px 5px -5px #333',
                // left: '-5px 0 5px -5px #333',
            },
            maxHeight: {
                '2/4-screen': '50vh',
                '3/4-screen': '80vh'
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
