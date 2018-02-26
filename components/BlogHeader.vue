<template>
    <article class="app-header">
        <header class="ui main-header">
            <div class="container">
                <a href=""></a>
                <nav role="navigation" class="app-nav">
                    <ul class="nav-lists" flex="dir:left">
                        <li class="nav-item nav-menu">
                            <div class="phone-show-menu"  @click="addClassFun()">
                                <span >首页</span>
                                <i class="caret down icon"></i>
                            </div>


                            <ul flex="dir:left" class="phone-hide" :class="{ show: isShow}">
                                <li>
                                    <a href="">
                                        首页
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        画册
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        随笔
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        首页
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item search" flex="cross:center">
                            <form action="" class="ui form">
                                <div class="ui icon input">
                                    <input type="text" placeholder="搜索文章">
                                    <i class="search icon"></i>
                                </div>
                            </form>
                        </li>
                    </ul>


                </nav>
            </div>
        </header>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            addClassFun: function () {
                this.isShow=!this.isShow;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../static/stylus/style.styl"
    //app头部
    .app-header
        width 100%
        height $app-hearder-h
        .main-header
            z-index 5
            width 100%
            height $app-hearder-h
            position fixed
            left 0
            top 0
            box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
            margin-bottom 20px
            background #fff
            //app导航
            .container
                max-width 1127px
                margin 0 auto
                height: 100%;
                .app-nav
                    height: 100%;
                    .nav-lists
                        height: 100%;
                        a
                            display block
                            line-height $app-hearder-h
                            padding 0 20px
                            font-size $app-lg-font
                            text-align center
                        .search
                            margin-left 100px
        .phone-show-menu
            cursor pointer
            display none
    @import "../static/stylus/media.styl"
</style>