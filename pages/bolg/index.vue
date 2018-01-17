<template>
   <section>
       <div  flex="dir:left box:last">
           <ul class="articles" flex-box="1">
               <li class="ui card article-item" v-for="(item,index) in articles" :key="index">
                   <a class="ui blue ribbon label article-label">Community</a>
                   <div class="content">
                       <nuxt-link :to="{path:`article/pubilsh/${item._id}`,param:{id:item._id}}">
                           <h4 class="header">{{item.title}}</h4>
                           <div class="meta">
                               <span class="right floated time">2 天前</span>
                               <span class="category">动物</span>
                           </div>
                           <div class="description article-description">
                               <p>{{item.abstract}}</p>
                           </div>
                       </nuxt-link>

                   </div>
                   <div class="extra content">
                       <div class="left floated">
                           <div class="ui labeled button" tabindex="0">
                               <div class="ui red button button-icon"><i class="heart icon"></i></div>
                               <a class="ui basic red left pointing label">
                                   {{item.like+400}}
                               </a>
                           </div>
                           <div class="ui labeled button" tabindex="0">
                               <div class="ui basic blue button"><i class="fork icon"></i></div>
                               <a class="ui basic left pointing blue label">
                                   {{item.share+300}}
                               </a>
                           </div>
                       </div>
                       <div class="right floated author">
                           <img class="ui avatar image" src="http://www.semantic-ui.cn/images/avatar/small/matt.jpg">
                           Matt
                       </div>
                   </div>


               </li>
           </ul>
           <article class="main-right" flex-box="0">
              <div class="new-article-list-con">
                  <h3 class="ui header blue hotHeader">最热排行榜</h3>
                  <div class="ui items">
                      <div class="item">
                          <div class="middle aligned content" flex="dir:left">
                              <i class="remove bookmark icon red"></i>
                              <a class="header">12 Years a Slave</a>
                          </div>
                      </div>
                      <div class="item">
                          <div class="middle aligned content" flex="dir:left">
                              <i class="remove bookmark icon orange"></i>
                              <a class="header">My Neighbor Totoro</a>
                          </div>
                      </div>
                      <div class="item">
                          <div class="middle aligned content" flex="dir:left">
                              <i class="remove bookmark icon green"></i>
                              <a class="header">Watchmen</a>
                          </div>
                      </div>
                      <div class="item">
                          <div class="middle aligned content" flex="dir:left">
                              <i class="remove bookmark icon green"></i>
                              <a class="header">你好你好你好你好你好你好你好你好你好你好你好你好</a>
                          </div>
                      </div>
                      <div class="item">
                          <div class="middle aligned content">
                              <i class="remove bookmark icon green"></i>
                              <a class="header">Watchmen</a>
                          </div>
                      </div>
                  </div>
              </div>
           </article>
       </div>

   </section>

</template>

<script>
  import ArticleApi from '../../api/ArticleApi'
  const Article=new ArticleApi()
  export default {
    layout: 'Blog',
    async asyncData({store}){
      let paging={
        pageSize:1,
        pageNum:10
      }
      await store.dispatch('queryArticleList',{paging});
      return {
        articles:store.state.articles
      }
    }
  }
</script>

<style scoped lang="stylus">
    @import "../../static/stylus/style.styl"
    .main-right
        width 340px;
        padding-left 20px
    .articles
        width 100%
        .article-item
            width 100%
            .header
                font-size 18px !important
            .description
                min-height 50px
            .article-description
                font-size 14px
            .meta
                padding 5px 0
            .article-label
                left -1.2em
                max-width 100px
    .hotHeader
        padding 7px 10px
        border-bottom 1px solid rgba(34, 36, 38, .2)
    .ui.header:first-child
        margin-top 0
    .new-article-list-con
        -webkit-box-shadow 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5
        box-shadow 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5
        border-radius 0.3rem
        padding-bottom 20px
        .item
            padding 0 10px
            .bookmark
                font-size 1.3rem
    .new-article-list-con .item a.header
        font-size 1.17rem !important
        font-weight normal !important
        color #909090 !important
    @import "../../static/stylus/media.styl"
</style>