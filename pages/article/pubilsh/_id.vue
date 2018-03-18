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
        <comment v-if="article" :list="article.comments" @addComment="addComment"></comment>
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
                title: this.article.title,
                meta: [{
                    "http-equiv": "keywords", "content": this.article.keyWords||this.tagNames.join(',')
                }]
            }

        },
        async asyncData({store, params}) {
            await store.dispatch('queryById', {id: params.id})
            let tagNames =[]
            return {
                article: store.state.article,
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
                console.info(this.article.tags)
                // this.html= mark.mavonEditor.render(this.article.content)
            })
        },
        methods:{
            async addComment(item){
                console.info(item)
                item.articleId=this.id;
                item.avatar='http://www.semantic-ui.cn/images/avatar/small/jenny.jpg';
                item.author='Jenny Hess';
                let data=await saveComment(item);
                // this.article.comments.push(data);
                let newArticle=Object.assign({},this.article);
                newArticle.comments=this.article.comments.slice(0)
                newArticle.comments.push(data);
                this.updateArticle(newArticle);
            },
            ...mapActions([
                'updateArticle'
            ])
        },
        watch:{
            uArticle(val){
                this.article=val
            }
        },
        computed: {
            ...mapGetters({
                uArticle:'article'
            })
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