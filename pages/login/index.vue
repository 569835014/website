<template>
    <div class="login">
        <div>
            <img src="~/static/img/login.png" alt="">
        </div>
        <div class="">
            <button class="ui facebook button"><i class="github icon"></i> GitHub Login </button>
            <button class="ui google plus button"><i class="google plus icon"></i> Google Login </button>
            <div class="ui horizontal divider">Or </div>
            <div class="ui left icon input">
                <input type="text" placeholder="搜索用户……">
                <i class="users icon"></i>
            </div>
            <div class="zm-input" flex="dir:left">
                <span></span>
                <input type="text" placeholder="Email">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="stylus">
    .login
        width 100vw;
        height 100vh;
        .zm-input
            margin-top 20px
            border 1px solid #d7d7d7
            border-radius: 5px
            width:348px;
            height 54px
            span
                width 52px
                height 52px
                border-right 1px solid #d7d7d7
            input
                width (346 - 52)px
                padding 20px
                height 52px
                border none
                outline none

</style>