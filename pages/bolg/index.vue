<template>
   <ul class="articles">
       <li class="ui card article-item">
           <a class="ui blue ribbon label article-label">Community</a>
           <div class="content">
               <h4 class="header">可爱的小狗</h4>
               <div class="meta">
                   <span class="right floated time">2 天前</span>
                   <span class="category">动物</span>
               </div>
               <div class="description article-description">
                   <p>这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章</p>
               </div>
           </div>
           <div class="extra content">
               <div class="left floated">
                   <div class="ui labeled button" tabindex="0">
                       <div class="ui red button button-icon"><i class="heart icon"></i></div>
                       <a class="ui basic red left pointing label">
                           1,048
                       </a>
                   </div>
                   <div class="ui labeled button" tabindex="0">
                       <div class="ui basic blue button"><i class="fork icon"></i></div>
                       <a class="ui basic left pointing blue label">
                           1,048
                       </a>
                   </div>
               </div>
               <div class="right floated author">
                   <img class="ui avatar image" src="http://www.semantic-ui.cn/images/avatar/small/matt.jpg">
                   Matt
               </div>
           </div>
       </li>
       <li class="ui card article-item">
           <div class="content">
               <div class="header">可爱的小狗</div>
               <div class="meta">
                   <span class="right floated time">2 天前</span>
                   <span class="category">动物</span>
               </div>
               <div class="description article-description">
                   <p>这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章</p>
               </div>
           </div>
           <div class="extra content">
               <div class="left floated">sdfsda</div>
               <div class="right floated author"><img class="ui avatar image" src="http://www.semantic-ui.cn/images/avatar/small/matt.jpg"> Matt </div>
           </div>
       </li>
       <li class="ui card article-item">
           <a class="ui blue ribbon label article-label">Community</a>
           <div class="content">
               <div class="header">可爱的小狗</div>
               <div class="meta">
                   <span class="right floated time">2 天前</span>
                   <div class="ui label"><i class="mail icon"></i> 23 </div>
                   <div class="ui label"><i class="mail icon"></i> 23 </div>
                   <div class="ui label"><i class="mail icon"></i> 23 </div>
               </div>
               <div class="description article-description">
                   <p>这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章这是一盘文章</p>
               </div>
           </div>
           <div class="extra content">
               <div class="left floated">sdfsda</div>
               <div class="right floated author"><img class="ui avatar image" src="http://www.semantic-ui.cn/images/avatar/small/matt.jpg"> Matt </div>
           </div>
       </li>
   </ul>
</template>

<script>
  export default {
    layout: 'Blog',
  }
</script>

<style scoped lang="stylus">
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