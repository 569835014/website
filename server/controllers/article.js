import { controller, get, post ,required} from '../decorator/router'
import Service from '../service/ArticleService'
@controller('/article')
export class ArticleContorller{
  @post('save')
  @required({body:['article']})
  async saveArticle(ctx,next){
    let {article,id}=ctx.request.body
    let data=await Service.saveArticle(article,id);
    return ctx.body=data
  }
  @post('list')
  async queryList(ctx,next){
    let {paging,type,tagName}=ctx.request.body;
    return ctx.body=await Service.queryList(paging,type,tagName)
  }
  @post('findOne')
  @required({body:['id']})
  async queryById(ctx,next){
    let{id}=ctx.request.body;
    return ctx.body=await Service.queryById(id)
  }
  @post('link')
  @required({body:['id']})
  async linkArticle(ctx,next){
      let{id}=ctx.request.body;
      const ip = ctx.ip.replace('::ffff:', '');
      return ctx.body=await Service.linkArticle(id,ip)
  }
}
