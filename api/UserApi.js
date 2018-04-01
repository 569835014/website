import Api from "./Api";
class UserApi extends Api{
    constructor(){
        super()
    }
    async login(params){
        params.url='/admin/login'
        return await this.common(params);
    }
    async register(params){
        params.url='/admin/register'
        return await this.common(params);
    }
}
export default UserApi