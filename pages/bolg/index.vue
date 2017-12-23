<template>
   <section>
       <div  flex="dir:left box:last">
           <ul class="articles">
               <li class="ui card article-item" v-for="(item,index) in articles" :key="index">
                   <nuxt-link :to="{path:`article/pubilsh/${item._id}`,param:{id:item._id}}">
                       <a class="ui blue ribbon label article-label">Community</a>
                       <div class="content">
                           <h4 class="header">{{item.title}}</h4>
                           <div class="meta">
                               <span class="right floated time">2 天前</span>
                               <span class="category">动物</span>
                           </div>
                           <div class="description article-description">
                               <p>{{item.abstract}}</p>
                           </div>
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
                   </nuxt-link>

               </li>
           </ul>
           <article class="main-right">
               dasfdsasda
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
        width 240px;
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


</style>