<template>
    <div class="login" flex="main:center cross:center">
        <div flex="dir:left">
            <div  >
                <img src="~/static/img/login.png" alt="">
            </div>
            <div class="form">
                <div  flex="main:justify">
                    <button class="ui facebook button"><i class="github icon"></i> GitHub Login </button>
                    <button class="ui google plus button"><i class="google plus icon"></i> Google Login </button>
                </div>

                <div class="ui horizontal divider">Or </div>
                <div class="zm-input" flex="dir:left">
                    <span flex="main:center cross:center">
                        <i class="user icon"></i>
                    </span>
                    <input type="text" placeholder="Email" v-model="account">
                </div>
                <div class="zm-input" flex="dir:left">
                    <span flex="main:center cross:center">
                          <i class="privacy icon"></i>
                    </span>
                    <input type="password" placeholder="Email" v-model="password">
                </div>
                <div class="submit">
                    <button class="positive ui button" @click="login">LOGIN</button>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import UserApi from '~/api/UserApi.js'
    const userApi=new UserApi()
    export default {
        name: "index",
        data(){
            return {
                account:'',
                password:''
            }
        },
        methods:{
            async login(){
                let data=await userApi.login({
                    data:{
                        account:this.account,
                        password:this.password
                    }
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
    .login
        width 100vw;
        height 100vh;
        overflow hidden
        .form
            width 348px
            margin-left 185px
            .horizontal
                margin 43px 0

        .zm-input
            border 1px solid #d7d7d7
            border-radius: 5px
            width:348px;
            height 54px
            margin-bottom 20px
            .icon
                font-size 16px
                width auto
                height auto
            span
                width 52px
                height 52px
                border-right 1px solid #d7d7d7
            input
                width (345 - 52)px
                padding 20px
                height 52px
                border none
                outline none;
                font-size 14px
        .submit
            .positive
                margin-top 20px
                width:348px;
                padding 0;
                height 54px


</style>