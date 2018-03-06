<template>
    <div class="ui threaded comments">
        <h3 class="ui dividing header">评论</h3>
        <comment-item v-for="(item,index) in list" :key="index" :data="item"></comment-item>
        <!--<div class="comment" >-->
            <!--<a class="avatar">-->
                <!--<img src="/images/avatar/small/matt.jpg">-->
            <!--</a>-->
            <!--<div class="content">-->
                <!--<a class="author">Matt</a>-->
                <!--<div class="metadata">-->
                    <!--<span class="date">今天下午 5:42</span>-->
                <!--</div>-->
                <!--<div class="text">太赞了！ </div>-->
                <!--<div class="actions">-->
                    <!--<a class="reply">Reply</a>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="comment">-->
            <!--<a class="avatar">-->
                <!--<img src="/images/avatar/small/elliot.jpg">-->
            <!--</a>-->
            <!--<div class="content">-->
                <!--<a class="author">Elliot Fu</a>-->
                <!--<div class="metadata">-->
                    <!--<span class="date">昨天上午12:30</span>-->
                <!--</div>-->
                <!--<div class="text">-->
                    <!--<p>這對我的研究是非常有用.謝謝!</p>-->
                <!--</div>-->
                <!--<div class="actions">-->
                    <!--<a class="reply">Reply</a>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="comments">-->
                <!--<div class="comment">-->
                    <!--<a class="avatar">-->
                        <!--<img src="/images/avatar/small/jenny.jpg">-->
                    <!--</a>-->
                    <!--<div class="content">-->
                        <!--<a class="author">Jenny Hess</a>-->
                        <!--<div class="metadata">-->
                            <!--<span class="date">刚刚</span>-->
                        <!--</div>-->
                        <!--<div class="text">艾略特你永远是多么正确 :) </div>-->
                        <!--<div class="actions">-->
                            <!--<a class="reply">Reply</a>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="comment">-->
            <!--<a class="avatar">-->
                <!--<img src="/images/avatar/small/joe.jpg">-->
            <!--</a>-->
            <!--<div class="content">-->
                <!--<a class="author">Joe Henderson</a>-->
                <!--<div class="metadata">-->
                    <!--<span class="date">5 天以前</span>-->
                <!--</div>-->
                <!--<div class="text">老兄，这太棒了。非常感谢。 </div>-->
                <!--<div class="actions">-->
                    <!--<a class="reply">Reply</a>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <form class="ui reply form" >
            <div class="field">
                <textarea v-model="reply"></textarea>
            </div>
            <div class="ui blue labeled submit icon button" @click="addComment"><i class="icon edit"></i>评论</div>
        </form>
    </div>
</template>

<script>
    import CommentItem from './CommentItem'
    export default {
        data(){
            return {
                reply:'',
                index:5
            }
        },
        name: "comment",
        props:{
            list:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            addComment(){
                console.info(this.$route.params.id)
                this.index++
                let newComment={
                    avatar:'http://www.semantic-ui.cn/images/avatar/small/jenny.jpg',
                    author:'Jenny Hess',
                    text:this.reply||`第${this.index}条评论`
                }
                this.$emit('addComment',newComment)
            }
        },
        components:{
            CommentItem
        }
    }
</script>

<style scoped>

</style>