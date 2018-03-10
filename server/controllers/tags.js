import { controller, get, post ,required} from '../decorator/router'
import Service from '../service/TagService'
@controller('/tag')
export class TagContorller{

  @post('tagList')
  @required({body:['paging']})
  async tagList(ctx,next){
    const {paging} = ctx.request.body;
    let data=await Service.queryTags({paging});
    return ctx.body=data
  }

  @post('add')
  @required({body:['name','orderId']})
  async addTag(ctx,next){
    let {name,orderId}= ctx.request.body;
    return ctx.body=await Service.addTag(name,orderId)
  }
}
