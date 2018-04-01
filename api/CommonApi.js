import Api from "./Api";
class CommonApi extends Api{
    constructor(){
        super()
    }
    async imgCode(params){
        params.url='/common/imgCode'
        return await this.common(params);
    }
}
export default CommonApi