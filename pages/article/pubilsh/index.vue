<template>
    <article class="publish">
        <div class="ui fluid icon input">
            <span>文章标题</span>
            <input type="text" placeholder="广泛搜索">
        </div>
        <Row :gutter="20">
            <Col :md="15" >
                <textarea id="articleEditor"></textarea>
            </Col>
            <Col :md="9">
               <div class="ui card">
                <div class="content">
                    <div class="header">
                        <i class="send outline icon"></i>
                        发布
                    </div>
                </div>
                <div class="content">
                    <h4 class="ui sub header">活动</h4>
                    <div class="ui small feed">
                       <div >
                           <i class="icon wait"></i>
                           发布
                           <span>公开</span>
                       </div>
                    </div>
                </div>
                <div class="extra content " flex="main:right">
                    <button class="ui primary  button" @click="publish">
                        <i class="send outline icon"></i>
                        发布
                    </button>
                    <button class="ui negative button">
                        <i class="save icon"></i> 保存 </button>
                    <button class="ui positive  button">
                        <i class="unhide icon"></i> 预览 </button>
                </div>
            </div>
                <div class="ui card">
                <div class="content">
                    <div class="header">
                        <i class="tags  icon"></i>
                        标签
                    </div>
                </div>
                <div class="content">
                    <a class="ui label" v-for="(item,index) in tagList">
                        <i class="mail icon"></i> {{item.name}}
                    </a>
                </div>
                <div class="extra content">
                    <button class="ui button">Join Project</button>
                </div>
            </div>
            </Col>
        </Row>

    </article>
</template>

<script>
  import axios from 'axios'
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
    async asyncData({store}){
      let paging={
        pageSize:1,
        pageNum:10
      }
      await store.dispatch('queryTagList',{paging});
      return {
        articleJSON:"",
        tagList:store.state.tags,
        paging
      }
    },
    mounted(){
      this.$nextTick(async ()=>{
        this.tinymce=await tinymce.init({
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
    methods:{
      publish(){
        console.info(tinymce.activeEditor.getContent())
      }
    },
    components:{
    }
  }
</script>

<style scoped lang="stylus">
    .publish
        .card
                width 100%
        .button
            &:last-child
                margin-right 0
</style>