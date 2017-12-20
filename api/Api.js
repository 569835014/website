
/**
 * Created by Administrator on 2017/5/22 0022.
 */
import config from './config'
import axios from 'axios'
import * as CODE from '../assets/common/states'

class Api {
    constructor() {
    }

    //出错
    error(res) {
    }

    //ajax调用前
    before() {

    }

    //ajax调用后
    after() {
    }

    //通用异常返回code不为10000的时候做通用处理也可以在参数里自定义
    abnormal(res) {
    }

    //token超时重新登录
    loginAgain() {

    }

    /*
     * 对象合并把用户参数和基本配置合并
     * */
    configure(param) {

        return Object.assign({}, config, param)
    }

    //通用api
    async common(param) {

        let result = true;
        let _config = this.configure(param);

        await this.before();//等待请求前的操作完成
        let res
        try {
            res = await axios(param.url, _config);

        } catch (e) {

            res = e;
            param.error ? param.error(res) : this.error(res)
            return false
        }
        if (res.data.state === CODE.SUCCESS) {//状态为成功的时候
            if (res.data.data) {
                if(param.success) param.success(res.data.data);
                result=res.data.data;
            } else {//没有返回参数，操作成功直接打印信息
            }
        }
        else {//异常处理，需要特殊处理的时候再参数里面加入异常函数
            if (res.data.status === "L0001") {
                this.vm.$swal({
                    title: '温馨提示',
                    text: "登录超时",
                    type: 'error',
                })
                setTimeout(() => {
                    this.loginAgain();
                }, 1600)
                return
            }
            if (param.abnormal) {//如果配置了异常处理走配置，没有配置走通用异常
                param.abnormal(res.data);
            } else {
                this.abnormal(res.data)
            }
            result = false
        }
        await this.after();
        return new Promise((r)=>{
            r(result)
        })
    };

    //ajax嵌套，像父ajax返回的结果子ajax拿来继续发ajax这类的调用这个
    async nesting(params) {
        await this.common(params)
        let obj = params.child;
        while (true) {
            if (obj) {
                await this.common(obj);
                obj = obj.child;
            } else {
                return;
            }
        }

    }

    all(params) {
        let arr = [];
        let _this = this;
        params.map(function (item, index) {
            arr[index] = _this.common(item);
        });
        return axios.all(arr)
            .then(axios.spread(function (acct, perms) {
                // Both requests are now complete
            }));
    }

    init(vue) {

        this.vm = vue;
        if (!Service.isinIt) {//相当于静态属性当属性被调用过就不再初始化axios
            // http request 拦截器
            axios.interceptors.request.use(
                config => {
                    if (this.vm.$store.state.userInfo.token && config.authorization) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                        config.headers['X-ZX-TOKEN'] = `${this.vm.$store.state.userInfo.token}`;//公司约定的token方式
                    }
                    return config;
                },
                err => {
                    return Promise.reject(err);
                });

// http response 拦截器
            axios.interceptors.response.use(
                response => {
                    return response;
                },
                error => {
                    if (error.response) {
                        switch (error.response.status) {
                            case 401:
                                // 返回 401 清除token信息并跳转到登录页面
                                // this.vm.commit(types.LOGOUT);
                                this.vm.$router.replace({
                                    path: 'login',
                                    query: {redirect: this.vm.$router.currentRoute.fullPath}
                                })
                        }
                        return Promise.reject(error.response.data)
                    }
                    return Promise.reject(error) // 返回接口返回的错误信息
                });
            Api.isinIt = true;
        }
    }

}

Api.isinIt = false;
export default Api
