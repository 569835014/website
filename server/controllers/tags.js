import { controller, get, post ,required} from '../decorator/router'
import mongoose from 'mongoose'
import Service from '../../store/service/TagService'
const Tag=mongoose.model('Tag')
@controller('/tag')
export class TagContorller{

  @post('tagList')
  @required({body:['paging']})
  async tagList(ctx,next){
    const {paging} = ctx.request.body;
    try{
      let tags=await Tag.find({}).skip((paging.pageSize-1)*paging.pageNum).limit(paging.pageNum).exec()
      return (ctx.body={
        success:true,
        data:{
          list:tags
        }
      })
    }catch (e){
      return (ctx.body={
        success:true,
        state:'A0001',
        message:e,
        data:{}
      })
    }


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
