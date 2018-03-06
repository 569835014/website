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
        <comment v-if="article"></comment>
    </div>

</template>

<script>
    import Comment from '~/components/Comment'
    const R=require('ramda')
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
                tagNames: tagNames
            }
        },
        mounted() {
            this.$nextTick(() => {
                console.info(this.article.tags)
                // this.html= mark.mavonEditor.render(this.article.content)
            })
        },
        computed: {},
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