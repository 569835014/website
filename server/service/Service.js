import axios from 'axios'
import config from './config'
import * as CODE from '../../assets/common/states'
import mongoose from 'mongoose'
class Service{
  constructor(option){
    if(option){
        this.axios=axios;
        this.name=option.name;
        this.cName=option.cName
        this.result={
            state:"",
            data:{},
            message:"",
            success:true
        }
        this.Model=mongoose.model(this.name)
    }
  }
  async queryList(paging,populate){
      let data
      try {
          data = await this.Model.find({}).skip((paging.pageSize - 1) * paging.pageNum).limit(paging.pageNum)
              .populate(populate)
              .exec();
          return this.successResult(data, '查询成功')
      } catch (e) {
          return this.errorResult(e)
      };
  }
  async queryById(_id,populate){
      let data
      try {

          data = await this.Model.findOne({_id:id})
              .populate(populate)
              .exec();
          if(!data) return this.abnormalResult(null,`该${this.cName}不存在`);
          return this.successResult(data, '查询成功')
      } catch (e) {
          return this.errorResult(e)
      };
  }
  async deleteById(_id){
    let data=await this.queryById(_id);
    if(!data.data){
      return data
    }
    try{
      data.data.remove().exec();
    }catch (e){
      return this.errorResult(e)
    }
    return this.successResult(data,'删除成功')
  }
  async update(model){
    let data;
    try{
      if(model._id){
         data=await this.queryById(model._id);
         if(!data.data){
             return data
         }
          data=Object.assign(data.data,model)
      }else{
          data=new this.Model(model);
      }
      data.save();
      return this.successResult(data,'更新成功')
    }catch (e){
      this.errorResult(e)
    }
  }
  extend(param) {

    return Object.assign({}, config, param)
  }
  async common(param){
    let result=null;
    let _config=this.extend(param)
    try{
      let data=await axios(param.url,_config);
      result=data.data
    }catch (e){
      return this.errorResult(e)
    }
    return result
  }
  errorResult(e){
    this.result.message=e
    this.result.data={}
    this.result.state=CODE.ERROR
    this.result.success=false
    return this.result
  }
  successResult(data,message='操作成功'){
    this.result={
      state:CODE.SUCCESS,
      data:data,
      message:message,
      success:true
    }
    return this.result
  }
  abnormalResult(data,message='操作成功',state=CODE.ABNORMAL){
    this.result={
      state:state,
      data:{},
      message:message,
      success:false
    }
    return this.result
  }
}
export default Service