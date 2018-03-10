import  BaseSchema from '../base/base'

class Tag extends BaseSchema{
  constructor (){
    const config={
      name:{
          type:String,
          required:true
      },
      orderId:{
        type:Number,
        default:1
      }
    }
    super(config,"Tag")
  }
}
const Model= new Tag().entity()
export default Model