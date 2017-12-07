import { controller, get, post ,required} from '../decorator/router'
import mongoose from 'mongoose'
const Article=mongoose.model('Article')
@controller('/article')
export class ArticleContorller{
  @post('save')
  @required({body:[]})
  async saveArticle(ctx,next){
  }
}
