<template>
    <div class="article-content" >
        <h1 class="article-title">{{article.title}}</h1>
        <section v-if="article">
            <mavon-editor
                    v-if="article.richType===1"
                    :ishljs="true"
                    language="cn"
                    :scrollStyle="true"
                    :toolbarsFlag="false"
                    :editable="false"
                    :subfield="false"
                    default_open="preview"
                    v-model="article.content"
                    :readmodel="true"
            >

            </mavon-editor>
            <div class="" v-else v-html="article.content"></div>
        </section>
        <comment v-if="article" :list="comments" @addComment="addComment"></comment>
    </div>

</template>

<script>
    import {saveComment} from "~/assets/ajax/commentsAjax.js";
    import Comment from '~/components/Comment'
    import {mapActions,mapGetters} from 'vuex'
    export default {
        layout: 'Blog',
        head() {

            return {
                title: this.title,
                meta: [{
                    "http-equiv": "keywords", "content": this.keyWords||this.tagNames.join(',')
                }]
            }

        },
        async asyncData({store, params}) {
            await store.dispatch('queryById',  params.id)
            let tagNames =[]
            return {
                title:store.state.article.title,
                keyWords:store.state.article.keyWords,
                html: "",
                tagNames: tagNames,
                list:[
                    {
                        avatar:'http://www.semantic-ui.cn/images/avatar/small/jenny.jpg',
                        author:'Jenny Hess',
                        text:"第一条评论",
                        comment:{
                            avatar:'http://www.semantic-ui.cn/images/avatar/small/jenny.jpg',
                            author:'Jenny Hess',
                            text:"第一条评论",
                        }
                    },
                    {
                        avatar:'http://www.semantic-ui.cn/images/avatar/small/jenny.jpg',
                        author:'Jenny Hess',
                        text:"第2条评论",
                    }
                ]
            }
        },
        mounted() {
            this.id=this.$route.params.id;

            this.$nextTick(() => {
                // this.html= mark.mavonEditor.render(this.article.content)
            })
        },
        methods:{
            async addComment(item){

                item.articleId=this.id;
                item.avatar='http://www.semantic-ui.cn/images/avatar/small/jenny.jpg';
                item.author='Jenny Hess';
                let data=await saveComment(item);
                let arr=JSON.parse(JSON.stringify(this.comments));
                console.info(arr);
                let index=this.findIndex(arr,data);
                if(index>-1){
                    arr[index]=data

                }else{
                    arr.push(data)
                }
                this.updateArticleCommit(arr);
            },
            findIndex(arr,comment){
               return arr.findIndex((item)=>{
                    return item._id===comment._id
                })
            },
            ...mapActions([
                'updateArticleCommit'
            ])
        },
        computed: {

            ...mapGetters(
                ['article','comments']
            )
        },
        components:{
            Comment
        }
    }
</script>
<style lang="stylus">
    .article-content
        .v-note-panel
            box-shadow unset !important
            .v-show-content
                background white !important
                padding 15px 0  15px !important


</style>
<style lang="stylus" scoped>
    .article-content
        .article-title
            font-weight: 700;
            font-size: 2.7rem;
            padding: 0 0 20px;
            line-height: 1.3;
        .v-note-wrapper
            box-shadow none
            position unset
            background white



</style>