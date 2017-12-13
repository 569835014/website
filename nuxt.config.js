module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  //js插件
  plugins:[
    {
      src:'~plugins/iview.js',ssr:true

    },
    {
      src:'~plugins/flex.js',ssr:false
    }
  ],
  /*
  ** Global CSS
  */
  css: ['~static/css/main.css','~static/semantic/lib/semantic.min.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
