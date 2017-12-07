import  BaseSchema from '../base/base'

class User extends BaseSchema{
  constructor (){
    const config={
      nickname:String,
      phone:String,
      sex:String,
      email:String,
      avatarUrl:String,
      account:String,
      password:String
    }
    super(config,"User")
  }
}

new User().entity()