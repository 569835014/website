import  BaseSchema from '../base/base'

class Tag extends BaseSchema{
  constructor (){
    const config={
      name:String,
      orderId:Number
    }
    super(config,"Tag")
  }
}

new Tag().entity()