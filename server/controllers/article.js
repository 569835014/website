import { controller, get, post ,required} from '../decorator/router'
import mongoose from 'mongoose'
import Service from '../service/ArticleService'
const Article=mongoose.model('Article')
Service.init(Article)
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
}
