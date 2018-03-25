import { controller, get, post ,required} from '../decorator/router'
import mongoose from 'mongoose'
const User=mongoose.model('User')
@controller('/admin')
export class AdminContorller{
  @post('login')
  @required({body:[]})
  async login(ctx,next){
    let {userName,password}=ctx.request.body;

    let json={
      state:'S0000',
      message:'登录成功',
      data:null
    }
    if(userName==='admin'&&password==='111111'){

        json.data={
            nickname:"你的智商已下线",
            phone:"13588067285",
            sex:"1",
            email:"569835014@qq.com",
            token:'f62396fa-b7f5-4411-a30e-155f730e891b',
            avatarUrl:"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoG8ib2gglicEVjyCy7z1ORtxVicSVE7XSaGhzlM3thIQgziaE8keJpl2NcuUmKia0hRupvGziajJoIia9TQ/0",
        }

    }else if(userName!=='admin'){
        json.data=null
        json.state='A0000'
        json.message='账号不存在'
    }else if(password!=='111111'){
        json.data=null;
        json.state='A0000'
        json.message='密码有误'
    }

      return ctx.body=json
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
      })
      await user.save();

    }
    return (ctx.body={
      success:true,
      data:user
    })
  }
}
