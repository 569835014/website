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
      { rel: 'stylesheet',  href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  //js插件
  plugins:[
    {
      src:'~plugins/iview.js',ssr:true

    },
    {
      src:'~plugins/vuetify.js',ssr:true
    },
    {
      src:'~plugins/flex.js',ssr:false
    }
  ],
  /*
  ** Global CSS
  */
  css: ['~static/css/main.css','~static/semantic/dist/semantic.min.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
