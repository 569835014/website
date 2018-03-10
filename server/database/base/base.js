import mongoose from 'mongoose'
const Schema=mongoose.Schema
//基础模型
class BaseSchema{
  constructor (config,name){
    this.config={
      meta:{
        createdAt:{//创建时间
          type:Date,
          default:Date.now()
        },
        updatedAt:{//更新时间
          type:Date,
          default:Date.now()
        }
      }
    }
    this.name=name
    config=Object.assign({}, config,this.config)
    this.schema=new Schema(config);
    this.init();
  }
  init(){
    this.pre();
    this.statics()
  }
  pre(){
    this.schema.pre('save',function (next) {
      if(this.isNew){//如果是现在更新创建和更新
        this.createdAt= this.updatedAt=Date.now();
      }else{//只更新更新时间
        this.updatedAt=Date.now()
      }
      next();
    })
  }
  statics(){}
  entity(){
    console.info(this.name)
   return mongoose.model(this.name,this.schema);
  }
}
export default BaseSchema