<template>
    <article>
        <textarea id="articleEditor"></textarea>
    </article>
</template>

<script>
  export default {
    name: 'index',
    layout:'Blog',
    head:{

      script:[
        {
          src:'https://cloud.tinymce.com/stable/tinymce.min.js'
        }
      ]
    },
    mounted(){
      this.$nextTick(()=>{
        tinymce.init({
          selector: '#articleEditor',
          branding: false,
          elementpath: false,
          height: 600,
          language: 'zh_CN.GB2312',
          language_url : '../../langs/zh_CN.GB2312.js',
          menubar: 'edit insert view format table tools',
          plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
            'searchreplace visualblocks visualchars code fullscreen fullpage',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons paste textcolor colorpicker textpattern imagetools codesample'
          ],
          toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
          autosave_interval: '20s',
          image_advtab: true,
          table_default_styles: {
            width: '100%',
            borderCollapse: 'collapse'
          }
        });
      })
    },
    components:{
    }
  }
</script>

<style scoped>

</style>