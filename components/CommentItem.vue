<template>
    <div class="comment" >
        <a class="avatar">
            <!--<img :src="comments.avatar||''">-->
            <img :src="'http://www.semantic-ui.cn/images/avatar/small/jenny.jpg'">
        </a>
        <div class="content">
            <a class="author">admin</a>
            <!--<a class="author">{{comments.author||'admin'}}</a>-->
            <div class="metadata">
                <span class="date">{{comments.meta.updatedAt}}</span>
            </div>
            <div class="text">{{comments.text}}</div>
            <div class="actions">
                <a class="reply" v-if="reply" @click="showInput=true">回复</a>
                <form class="ui reply form"  v-if="reply&&showInput">
                    <div class="field">
                        <textarea v-model="commentsText"></textarea>
                    </div>
                    <div class="ui blue labeled submit icon button" @click="addComment"><i class="icon edit"></i>评论</div>
                </form>
            </div>

        </div>
        <div class="comments" v-if="comments.comment&&comments.comment.length>0">
            <comment-item  :comments="item" :reply="false" v-for="(item,index) in comments.comment" :key="new Date().getTime()+index"></comment-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment-item",
        data(){
            return {
                showInput:false,
                commentsText:''
            }
        },
        props:{
            comments:{
                type:Object,
                default(){
                    return {
                        text:'',
                        meta:{
                            updatedAt:''
                        }
                    }
                }
            },
            reply:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            addComment(){
                if(!this.comments.comment){
                    this.$set(this.comments,'comment',[])
                }
                this.comments.comment.push({
                    text:this.commentsText,
                    meta:{
                        updatedAt:''
                    }
                })
                this.$emit('addChildComment',this.comments);
                this.commentsText=''
            }
        }
    }
</script>

<style scoped>

</style>