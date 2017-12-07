<template>
    <v-app light>
        <v-toolbar
                color="blue darken-3"
                dark
                app
                clipped-left
                fixed
        ></v-toolbar>
        <main>
            <img :src="img" alt="">
        </main>
    </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Your Logo',
        img:require('../static/img/Macbook_001.jpg')
      }
    },
    created(){
    }
  }
</script>
<style lang="stylus" scoped>
    main
        width 100%
        height 100vh
</style>
