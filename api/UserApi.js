import Api from "./Api";
class UserApi extends Api{
    constructor(){
        super()
    }
    async login(params){
        params.url='/admin/login'
        return await this.common(params);
    }
}
export default UserApi