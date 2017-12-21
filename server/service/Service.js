import axios from 'axios'
import config from './config'
import * as CODE from '../../assets/common/states'
class Service{
  constructor(){
    this.axios=axios;
    this.result={
        state:"",
        data:{},
        message:"",
        success:true
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