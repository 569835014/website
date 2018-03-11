import Api from "./Api";

class TagApi extends Api{
    constructor(){
        super()
    }
    async addTag(params){
        params.url='/tag/add';
        return await this.common(params);
    }
    async queryTags(params){

       return await this.common({
            url:'/tag/tagList',
            data:params
        })
    }
}
export default TagApi