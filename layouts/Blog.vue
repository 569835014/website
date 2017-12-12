<template>
  <section id="app">
      <article class="app-header">
          <header class="ui container">
              <a href=""></a>
              <nav role="navigation" class="app-nav">
                  <ul class="nav-lists" flex="dir:left">
                      <li class="nav-item nav-menu">
                          <ul flex="dir:left">
                              <li>
                                  <a href="">
                                      首页
                                  </a>
                              </li>
                              <li>
                                  <a href="">
                                      画册
                                  </a>
                              </li>
                              <li>
                                  <a href="">
                                      随笔
                                  </a>
                              </li>
                              <li>
                                  <a href="">
                                      首页
                                  </a>
                              </li>
                          </ul>
                      </li>
                      <li class="nav-item search">
                          <form action="" class="ui form">
                              <div class="ui icon input">
                                  <input type="text" placeholder="搜索文章">
                                  <i class="search icon"></i>
                              </div>
                          </form>
                      </li>
                  </ul>
              </nav>
          </header>
      </article>
      <main class="ui container">

          <nuxt></nuxt>
      </main>
  </section>

</template>

<script>

  import Nuxt from '../.nuxt/components/nuxt'
  export default {
    components: {Nuxt},
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', text: 'Contacts' },
        { icon: 'history', text: 'Frequently contacted' },
        { icon: 'content_copy', text: 'Duplicates' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }
      ]
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