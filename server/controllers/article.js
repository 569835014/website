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
}
