import Service from './Service'
class UserService extends Service{
    constructor(){
        super({name:'User',cName:'用户'})
    }
    async login(account,password,ctx){
        let data;
        try{
            data=await this.Model.findOne({account:account});
            console.info(data)
            if(data){
                let res=await this.schema.comparePassword(password,data.password);
                console.info(res);
                if(res){

                    delete data.password
                     ctx.session.user={
                        account:account,
                        ...data
                    }
                    return this.successResult(data,'操作成功')
                }
                return this.abnormalResult(null,`密码错误`);
            }
            return this.abnormalResult(null,`该${this.cName}不存在`);
        }catch (e){
            return this.errorResult(e)
        }
    }
}
const service=new UserService()
export default service