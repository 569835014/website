import { controller, get, post ,required} from '../decorator/router'
import mongoose from 'mongoose'
import Service from '../service/CommentsService'
const Comments=mongoose.model('Comments')
Service.init(Comments)
@controller('/comments')
export class CommontsController{
    @post('save')
    @required({body:['comments']})
    async saveComments(ctx,next){
        let {comments}=ctx.request.body
        let data=await Service.saveComment(comments);
        return ctx.body=data
    }
}