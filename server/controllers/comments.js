import { controller, get, post ,required} from '../decorator/router'
import Service from '../service/CommentsService'
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