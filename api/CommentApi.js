import Api from "./Api";
class CommentApi extends Api{
    async saveComments(params){
        params.url='/comments/save'
        return await this.common(params)
    }
}
export default CommentApi