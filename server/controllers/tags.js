import { controller, get, post ,required} from '../decorator/router'
import mongoose from 'mongoose'
const Tag=mongoose.model('Tag')
@controller('/tag')
export class TagContorller{

  @get('tagList')
  async tagList(ctx,next){

    let tags=await Tag.find({}).limit(20).exec()

    return (ctx.body={
      success:true,
      data:{
        list:tags
      }
    })
  }

  @post('add')
  async addTag(ctx,next){

    let tags=await Tag.findOne({
      name:"原型"
    })
    if(!tags){
      tags=new Tag({
        name:'原型',
        orderId:'10'
      })
      await tags.save();
    }
    return (ctx.body={
      success:true,
      data:{
        list:tags
      }
    })
  }
}
