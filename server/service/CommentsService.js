import Service from './Service'

class CommentsService extends Service{
    constructor () {
        super('Article')
    }
    async saveComment(comment){
        let data;
        try{
            if(!comment._id){
                data=new this.Model(comment)
            }else{
                data=this.Model.findOne({_id: comment._id}).exec()
                if(!data){
                    return  this.abnormalResult(null,'该文章不存在')
                }
                Object.assign(data,comment)
                // data.user=commont.user;
                // data.text=commont.text;
                // data.commont=commont.commont
            }
            data.save();
            return this.successResult(data, '保存成功！')
        }catch (e){
            return this.errorResult(e)
        }
    }

}
const commentsService =new CommentsService();
export default commentsService