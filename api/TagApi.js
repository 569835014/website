import Api from "./Api";

class TagApi extends Api{
    constructor(){
        super()
    }
    async addTag(params){
        return await this.common({
            url:'/tag/add',
            data:params
        })
    }
    async queryTags(params){

       return await this.common({
            url:'/tag/tagList',
            data:params
        })
    }
}
export default TagApi