<template>
    <div v-html="article.content" v-if="article.content">

    </div>
</template>

<script>
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
      console.info(params)
      await store.dispatch('queryById', {id:params.id})
      return {
        article:store.state.article
      }
    }
  }
</script>

<style scoped>

</style>