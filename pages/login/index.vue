<template>
    <div class="login" flex="main:center cross:center">
        <div flex="dir:left">
            <div  flex="main:center cross:center">
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
                    <input type="text" placeholder="请填入账号" v-model="account">
                </div>
                <div class="zm-input" flex="dir:left">
                    <span flex="main:center cross:center">
                          <i class="privacy icon"></i>
                    </span>
                    <input type="password" placeholder="请填入密码" v-model="password">
                </div>
                <div class="zm-input" flex="dir:left" v-if="!isLogin">
                    <span flex="main:center cross:center">
                          <i class="privacy icon"></i>
                    </span>
                    <input type="password" placeholder="请填入重复密码" v-model="passwordRepeat">
                </div>
                <div flex="main:justify" v-if="!isLogin">
                    <div class="zm-input code" flex="dir:left">
                        <input type="text" placeholder="请填入验证码结果" v-model="code">
                    </div>
                    <div class="code">
                        <div v-html="this.captcha" v-if="this.captcha" @click="imgCode"></div>
                    </div>
                </div>
                <div class="submit">
                    <button class="positive ui button" @click="submitBtn" v-if="isLogin">{{btnText}}</button>
                    <button class="positive ui button" @click="register" v-else>{{btnText}}</button>
                </div>
                <div class="tips" @click="isLogin=!isLogin" v-if="isLogin">注册</div>
            </div>
        </div>

    </div>
</template>

<script>
    import UserApi from '~/api/UserApi.js'
    import CommonApi from '~/api/CommonApi.js'
    const userApi=new UserApi()
    const commonApi=new CommonApi();
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                account:'',
                password:'',
                passwordRepeat:'',

                code:'',
                captcha:'',
                isLogin:true,
                btnText:'登录'
            }
        },
        created(){
            this.imgCode();
        },
        methods:{
            async imgCode(){
                let data=await commonApi.imgCode({
                    method:'get'
                });
                this.captcha=data?data.data:''
            },
            async submitBtn(){
                await this.login({
                    account:this.account,
                    password:this.password
                })
                this.$router.push({
                    path:'/article/pubilsh'
                })
            },
            // async login(){
            //     let data=await userApi.login({
            //         data:{
            //             account:this.account,
            //             password:this.password
            //         }
            //     })
            // },
            async register(){
                let data=await userApi.register({
                    data:{
                        account:this.account,
                        password:this.password,
                        code:this.code
                    },
                    showNotice:true
                })
            },
            ...mapActions([
                'login'
            ])
        },
        watch:{
            isLogin(newVal){
                if(newVal){
                    this.btnText='登录'
                }else {
                    this.btnText='注册'
                }
            }
        },
        computed:{
            ...mapGetters([
                'user'
            ])
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
        .code
            width 170px
            input
                width 168px !important
        .submit
            .positive
                margin-top 20px
                width:348px;
                padding 0;
                height 54px
        .tips
            height:13px;
            font-size:13px;
            color:rgba(105,146,255,1);
            margin-top 20px
            cursor pointer
        .register
            text-align right


</style>