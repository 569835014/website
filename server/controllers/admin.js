import { controller, get, post ,required} from '../decorator/router'
import mongoose from 'mongoose'
const User=mongoose.model('User')
@controller('/admin')
export class AdminContorller{
  @post('login')
  @required({body:[]})
  async login(ctx,next){

  }
  @get('add')
  async addUser(ctx,next){
    let user=await User.findOne({
      account:'jtzm1237'
    })
    console.info(user);
    if(!user){
      user=new User({
        nickname:"你的智商已下线",
        phone:"13588067285",
        sex:"1",
        email:"569835014@qq.com",
        avatarUrl:"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoG8ib2gglicEVjyCy7z1ORtxVicSVE7XSaGhzlM3thIQgziaE8keJpl2NcuUmKia0hRupvGziajJoIia9TQ/0",
        account:"jtzm1237"
      })
      await user.save();

    }
    return (ctx.body={
      success:true,
      data:user
    })
  }
}
