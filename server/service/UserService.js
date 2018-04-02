import Service from './Service'
class UserService extends Service{
    constructor(){
        super({name:'User',cName:'用户'})
    }
    async login(account,password,ctx){
        let data;
        try{
            data=await this.Model.findOne({account:account});

            if(data){
                let res=await data.comparePassword(password,data.password||'');
                console.info(res);
                if(res){

                    delete data.password
                     ctx.session.user={
                        account:account,
                        ...data
                    }
                    console.info(ctx.session)
                    return this.successResult(data,'操作成功')
                }
                return this.abnormalResult(null,`密码错误`);
            }
            return this.abnormalResult(null,`该${this.cName}不存在`);
        }catch (e){
            return this.errorResult(e)
        }
    }
    async register(params,ctx){
        let {account,password,code}=params;
        let sessionCode=ctx.session.captcha;
        let data;
        try{
            if(code!==sessionCode){
                return this.abnormalResult(null,`验证码不正确`);
            }
            data=await this.Model.findOne({account:account});
            if(data){
                return this.abnormalResult(null,`账号已存在`);
            }
            data=new this.Model({
                account:account,
                password:password
            })
            data.save();
            delete data.password
            ctx.session.user=data
            return this.successResult(data,'注册成功')
        }catch (e){
            return this.errorResult(e)
        }
    }
}
const service=new UserService()
export default service