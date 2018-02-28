<template>
    <article class="publish">
        <div class="ui form ">
            <div class="inline fields">
                <label>标题</label>
                <input type="text" placeholder="文章标题" v-model="article.title">

            </div>
            <div class="inline fields">
                <label>摘要</label>
                <input type="text" placeholder="文章摘要" v-model="article.abstract">
                <span class="error"></span>
            </div>
            <div class="inline fields">
                <label>关键词</label>
                <input type="text" placeholder="seo关键词" v-model="article.keyWords">
                <span class="error"></span>
            </div>
        </div>
        <div class="ui toggle checkbox switch-mark-down">
            <input type="checkbox" name="public" v-model="isEditor">
            <label>切换至富文本编辑器</label>
        </div>
        <Row :gutter="20">
            <Col :md="15">
            <div v-show="isEditor">
                <textarea id="articleEditor" ></textarea>
            </div>

            <mavon-editor :ishljs="true" v-model="article.content" v-show="!isEditor"></mavon-editor>
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
                        <div>
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
                        <i class="save icon"></i> 保存
                    </button>
                    <button class="ui positive  button">
                        <i class="unhide icon"></i> 预览
                    </button>
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
                    <a class="ui label" :class="includes(item.name)?'teal':''" v-for="(item,index) in tagList"
                       @click="selectTag(item)">
                        {{item.name}}
                    </a>
                </div>
                <div class="extra content tag-btn">
                    <div class="ui right labeled left icon input">
                        <button class="ui primary  button" @click="visible=true">
                            <i class="add square outline icon"></i>
                            发布
                        </button>
                    </div>
                </div>
            </div>
            </Col>
        </Row>

        <model :visible.sync="visible" @confirm="saveTag">
            <form class="ui form addTag" ref="tags">
                <div class="field">

                    <div class="two fields">
                        <div class="field">
                            <label>标签名称</label>
                            <input type="text" name="tagname" v-model="tag.name" placeholder="请填入标签名称"></div>
                        <div class="field">
                            <label>标签排序</label>
                            <input type="text" name="tagorderId" v-model="tag.orderId" placeholder="请填入标签排序">
                        </div>
                    </div>
                </div>
            </form>
        </model>
    </article>
</template>

<script>
    import Model from '../../../components/Model'
    import TagApi from '../../../api/TagApi'
    import ArticleApi from '../../../api/ArticleApi'
    import valiForm from '~/assets/common/util/valiForm.js'
    let vali=new valiForm();
    const Service = new TagApi()
    const Article = new ArticleApi()
    export default {
        name: 'index',
        layout: 'Blog',
        head: {
            script: [
                {
                    src: 'https://cdn.bootcss.com/tinymce/4.7.4/tinymce.min.js'
                }
            ]
        },
        async asyncData({store}) {
            let paging = {
                pageSize: 1,
                pageNum: 10
            }
            await store.dispatch('queryTagList', {paging})
            return {
                visible: false,
                tag: {
                    name: '',
                    orderId: null,
                },
                markdown: "",
                article: {
                    title: '',
                    content: '',
                    richType: 1,
                    abstract: '',
                    openComment: 1,
                    status: 2,
                    avatarUrl: '',
                    comments: [],
                    subtitle: '',
                    // articleType:"",
                    keyWords: "",
                    tags: []
                },
                tagList: store.state.tags,
                paging,
                isEditor: false
            }
        },
        methods: {
            async initEdit() {
                if (!this.tinymce) {
                    this.$nextTick(() => {
                        setTimeout(async () => {
                            this.tinymce = await tinymce.init({
                                selector: '#articleEditor',
                                branding: false,
                                elementpath: false,
                                height: 600,
                                language: 'zh_CN.GB2312',
                                language_url: '../../langs/zh_CN.GB2312.js',
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
                            })
                        }, 20)
                    })

                }

            },
            async publish() {
                let res=vali.form({
                    title:{
                        rules:[
                            {
                                type:'inFun',
                                rule:'required',
                                msg:'标题不能为空！'
                            },
                            {
                                type:'patter',
                                rule:'email',
                                msg:'邮箱格式不正确！'
                            },
                            {
                                type:'inFun',
                                rule:'minLength(20)',
                                msg:'最小不得小于20长度！'
                            },
                        ] ,
                        value:this.article.title,
                        join:'or'
                    }
                })
                console.info(res);
                //如果是文本编辑器
                // if (this.isEditor) {
                //     this.article.content = tinymce.activeEditor.getContent()
                // }
                // let data = await Article.saveArticleApi({article: this.article})
                // console.info(data)
            },
            //新增标签
            async saveTag() {
                let data = await Service.addTag(this.tag)
                if (data) {
                    this.visible = false
                    this.tagList.push(data)
                }

            },
            selectTag(item) {
                let len = this.article.tags.length - 1
                for (let i = len; i > -1; i--) {
                    if (this.article.tags[i].name === item.name) {
                        return this.article.tags.splice(i, 1)
                    }
                }
                this.article.tags.push(item)
            },
            includes(name) {
                for (let i = 0; i < this.article.tags.length; i++) {
                    if (this.article.tags[i].name === name) {
                        return true
                    }
                }
                return false
            }
        },
        watch: {
            isEditor(newVal) {
                if (!newVal) {
                    this.article.richType = 1
                } else {
                    this.article.richType = 2
                    this.initEdit();
                }
            }
        },
        components: {
            Model
        }
    }
</script>
<style lang="stylus">
    .ui.dimmer

        z-index 999 !important
</style>
<style scoped lang="stylus">
    .v-note-wrapper
        position static

    .addTag
        width 100%

    .publish

        .switch-mark-down
            margin 0 0 1em
        .form
            label
                text-align right
                width 50px !important
        .tag-btn
            text-align right
        .card
            width 100%
        .button
            &:last-child
                margin-right 0

</style>