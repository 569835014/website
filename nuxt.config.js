module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'starter',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ]
    },
    //js插件
    plugins: [
        {
            src: '~plugins/iview.js', ssr: true

        },

        {
            src: '~plugins/jquery', ssr: false
        },
        {
            src: '~plugins/mavonEdit', ssr: false
        },
        {
            src: '~plugins/aplayer.js', ssr: false
        },
        {
            src: '~plugins/vuelidate.js', ssr: false
        }
    ],
    /*
    ** Global CSS
    */
    css: ['~static/css/main.css', '~static/semantic/lib/semantic.min.css','flex.css'],
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#3B8070'}
}
