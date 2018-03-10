import  BaseSchema from '../base/base'
import mongoose from 'mongoose'
const {Schema}=mongoose;
const ObjectId=Schema.Types.ObjectId;
class Comments extends BaseSchema{
  constructor (){
    const config= {
        articleId:{
            type:String
        },
        user:{
            type:ObjectId,
            ref:"User"
        },
        text:{
          type:String,
        },
        comment:{
          type:Array
        }
    }
    super(config,"Comments")
  }
}
const Model=new Comments().entity()
export default Model