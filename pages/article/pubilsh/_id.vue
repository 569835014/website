<template>
    <div class="article-content">
        <h1 class="article-title">{{article.title}}</h1>
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
    </div>

</template>

<script>
    import marked from 'marked'
    import mark from 'mavon-editor'
    // import R from 'ramda'
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
        computed: {}
    }
</script>

<style lang="stylus" scoped>
    .article-content
        .article-title
            font-weight: 700;
            font-size: 2.7rem;
            padding: 0 0 20px;
            line-height: 1.3;
        .v-note-wrapper
            box-shadow none
</style>