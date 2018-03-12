import Service from './Service'
import ArticleService from './ArticleService'
import Model from "../database/schema/Comments";
class CommentsService extends Service{
    constructor () {
        super({name:'Comments',cName:'评论'})
    }
    async saveComment(comment){
        let data;
        let articel;
        try{
            if(!comment._id){
                data=new this.Model(comment)
                articel=await ArticleService.updateComment(comment.articleId,data._id);
                if(!articel.success){
                    return  this.abnormalResult(null,articel.message)
                }
                data.save();
                articel.save();
            }else{
                data=await this.Model.findOne({_id: comment._id}).exec()
                if(!data){
                    return  this.abnormalResult(null,'该标签不存在')
                }
                Object.assign(data,comment)
                data.save();
                // data.user=commont.user;
                // data.text=commont.text;
                // data.commont=commont.commont
            }

            return this.successResult(data, '保存成功！')
        }catch (e){
            return this.errorResult(e)
        }
    }

}
const commentsService =new CommentsService();
export default commentsService