<template>
  <section id="app">
        <blog-header></blog-header>
      <main class="ui container">
          <nuxt></nuxt>
      </main>

  </section>

</template>

<script>

  import Nuxt from '../.nuxt/components/nuxt'
  import BlogHeader from '../components/BlogHeader'
  export default {
    components: {
        BlogHeader,
        Nuxt
    },
    data: () => ({
    }),
    props: {
      source: String
    }
  }
</script>
<style  lang="stylus" scoped>
    @import "../static/stylus/style.styl"
    #app
        font-size $app-md-font
        background white
        //app头部
        .app-header
            height $app-hearder-h
            box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
            margin-bottom 20px
            //app导航
            .app-nav
                .nav-lists
                    .nav-item
                        line-height $app-hearder-h
                        a
                            display block
                            line-height $app-hearder-h
                            padding 0 20px
                            font-size $app-lg-font
                    .search
                        margin-left 100px

</style>