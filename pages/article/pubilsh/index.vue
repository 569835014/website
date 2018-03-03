<template>
    <article class="publish">
        <div class="ui form ">
            <div class="inline fields">
                <label>标题</label>
                <div class="ui input field  form-field">
                    <input type="text" placeholder="文章标题" v-model="article.title">
                </div>

            </div>
            <div class="inline fields">
                <label>摘要</label>
                <div class="ui input field  form-field">
                    <input type="text" placeholder="文章摘要" v-model="article.abstract">
                </div>

            </div>
            <div class="inline fields">
                <label>关键词</label>
                <div class="ui input field  form-field">
                    <input type="text" placeholder="搜索关键词" v-model="article.keyWords">
                </div>
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
                    <button class="ui negative button" v-if="false">
                        <i class="save icon"></i> 保存
                    </button>
                    <button class="ui positive  button" v-if="false">
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
                            添加
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
    import ValiForm from '~/assets/common/util/valiForm.js'
    let valiForm=ValiForm.created();
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
                    content: 'Markdown 语法简介\n' +
                    '=============\n' +
                    '> [语法详解](http://commonmark.org/help/)\n' +
                    '\n' +
                    '## **粗体**\n' +
                    '```\n' +
                    '**粗体**\n' +
                    '__粗体__\n' +
                    '```\n' +
                    '## *斜体*\n' +
                    '```\n' +
                    '*斜体*\n' +
                    '_斜体_\n' +
                    '```\n' +
                    '## 标题\n' +
                    '```\n' +
                    '# 一级标题 #\n' +
                    '一级标题\n' +
                    '====\n' +
                    '## 二级标题 ##\n' +
                    '二级标题\n' +
                    '----\n' +
                    '### 三级标题 ###\n' +
                    '#### 四级标题 ####\n' +
                    '##### 五级标题 #####\n' +
                    '###### 六级标题 ######\n' +
                    '```\n' +
                    '## 分割线\n' +
                    '```\n' +
                    '***\n' +
                    '---\n' +
                    '```\n' +
                    '****\n' +
                    '## ^上^角~下~标\n' +
                    '```\n' +
                    '上角标 x^2^\n' +
                    '下角标 H~2~0\n' +
                    '```\n' +
                    '## ++下划线++ ~~中划线~~\n' +
                    '```\n' +
                    '++下划线++\n' +
                    '~~中划线~~\n' +
                    '```\n' +
                    '## ==标记==\n' +
                    '```\n' +
                    '==标记==\n' +
                    '```\n' +
                    '## 段落引用\n' +
                    '```\n' +
                    '> 一级\n' +
                    '>> 二级\n' +
                    '>>> 三级\n' +
                    '...\n' +
                    '```\n' +
                    '\n' +
                    '## 列表\n' +
                    '```\n' +
                    '有序列表\n' +
                    '1.\n' +
                    '2.\n' +
                    '3.\n' +
                    '...\n' +
                    '无序列表\n' +
                    '-\n' +
                    '-\n' +
                    '...\n' +
                    '```\n' +
                    '## 链接\n' +
                    '```\n' +
                    '[链接](www.baidu.com)\n' +
                    '![图片描述](http://www.image.com)\n' +
                    '```\n' +
                    '## 代码段落\n' +
                    '\\``` type\n' +
                    '\n' +
                    '代码段落\n' +
                    '\n' +
                    '\\```\n' +
                    '\n' +
                    '\\` 代码块 \\`\n' +
                    '\n' +
                    '```c++\n' +
                    'int main()\n' +
                    '{\n' +
                    '    printf("hello world!");\n' +
                    '}\n' +
                    '```\n' +
                    '`code`\n' +
                    '## 表格(table)\n' +
                    '```\n' +
                    '| 标题1 | 标题2 | 标题3 |\n' +
                    '| :--  | :--: | ----: |\n' +
                    '| 左对齐 | 居中 | 右对齐 |\n' +
                    '| ---------------------- | ------------- | ----------------- |\n' +
                    '```\n' +
                    '| 标题1 | 标题2 | 标题3 |\n' +
                    '| :--  | :--: | ----: |\n' +
                    '| 左对齐 | 居中 | 右对齐 |\n' +
                    '| ---------------------- | ------------- | ----------------- |\n' +
                    '## 脚注(footnote)\n' +
                    '```\n' +
                    'hello[^hello]\n' +
                    '```\n' +
                    '\n' +
                    '见底部脚注[^hello]\n' +
                    '\n' +
                    '[^hello]: 一个注脚\n' +
                    '\n' +
                    '## 表情(emoji)\n' +
                    '[参考网站: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\n' +
                    '```\n' +
                    ':laughing:\n' +
                    ':blush:\n' +
                    ':smiley:\n' +
                    ':)\n' +
                    '...\n' +
                    '```\n' +
                    ':laughing::blush::smiley::)\n' +
                    '\n' +
                    '## $\\KaTeX$公式\n' +
                    '\n' +
                    '我们可以渲染公式例如：$x_i + y_i = z_i$和$\\sum_{i=1}^n a_i=0$\n' +
                    '我们也可以单行渲染\n' +
                    '$$\\sum_{i=1}^n a_i=0$$\n' +
                    '具体可参照[katex文档](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函数](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文档](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\n' +
                    '\n' +
                    '## 布局\n' +
                    '\n' +
                    '::: hljs-left\n' +
                    '`::: hljs-left`\n' +
                    '`居左`\n' +
                    '`:::`\n' +
                    ':::\n' +
                    '\n' +
                    '::: hljs-center\n' +
                    '`::: hljs-center`\n' +
                    '`居中`\n' +
                    '`:::`\n' +
                    ':::\n' +
                    '\n' +
                    '::: hljs-right\n' +
                    '`::: hljs-right`\n' +
                    '`居右`\n' +
                    '`:::`\n' +
                    ':::\n' +
                    '\n' +
                    '## 定义\n' +
                    '\n' +
                    '术语一\n' +
                    '\n' +
                    ':   定义一\n' +
                    '\n' +
                    '包含有*行内标记*的术语二\n' +
                    '\n' +
                    ':   定义二\n' +
                    '\n' +
                    '        {一些定义二的文字或代码}\n' +
                    '\n' +
                    '    定义二的第三段\n' +
                    '\n' +
                    '```\n' +
                    '术语一\n' +
                    '\n' +
                    ':   定义一\n' +
                    '\n' +
                    '包含有*行内标记*的术语二\n' +
                    '\n' +
                    ':   定义二\n' +
                    '\n' +
                    '        {一些定义二的文字或代码}\n' +
                    '\n' +
                    '    定义二的第三段\n' +
                    '\n' +
                    '```\n' +
                    '\n' +
                    '## abbr\n' +
                    '*[HTML]: Hyper Text Markup Language\n' +
                    '*[W3C]:  World Wide Web Consortium\n' +
                    'HTML 规范由 W3C 维护\n' +
                    '```\n' +
                    '*[HTML]: Hyper Text Markup Language\n' +
                    '*[W3C]:  World Wide Web Consortium\n' +
                    'HTML 规范由 W3C 维护\n' +
                    '```\n',
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
                let res=valiForm.form({
                    title:{
                        rules:[
                            {
                                type:'inFun',
                                rule:'required',
                                msg:'标题不能为空！'
                            },

                            {
                                type:'inFun',
                                rule:'maxLength(40)',
                                msg:'最大长度不能超过40个字符'
                            },
                        ] ,
                        value:this.article.title,
                        join:'and'
                    },
                    content:{
                        rules:[
                            {
                                type:'inFun',
                                rule:'required',
                                msg:'标题不能为空！'
                            }
                        ] ,
                        value:this.article.content,
                        join:'or'
                    }
                });
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
            .form-field
                width calc(100% - 50px)
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