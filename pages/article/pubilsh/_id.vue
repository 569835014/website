<template>
    <mavon-editor
            v-if="article.richType===1"
            :ishljs = "true"
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
</template>

<script>
  import marked from 'marked'
  import mark from 'mavon-editor'
  export default {
    layout: 'Blog',
    head(){

      return {
        meta:[{
          "http-equiv":"keywords","content":this.article.keyWords
        }]
      }

    },
    async asyncData({store,params}){

      await store.dispatch('queryById', {id:params.id})
      return {
        article:store.state.article,
        html:""
      }
    },
    mounted(){
      this.$nextTick(()=>{
        console.info(this.article.tags)
        // this.html= mark.mavonEditor.render(this.article.content)
      })
    },
    computed:{
    }
  }
</script>

<style scoped>

</style>