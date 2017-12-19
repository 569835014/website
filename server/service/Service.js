import axios from 'axios'
import config from './config'
class Service{
  constructor(){
    this.axios=axios;
    this.ERROR={
        state:"E0001",
        data:{},
        message:"",
        success:false
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
      result={
        success:false,
        state:'A0001',
        message:e,
        data:{}
      }
    }
    console.info(result)
    return result
  }
  errorResult(e){
    this.ERROR.message=e
    return this.ERROR
  }
  getResult({success,state,message,data}){
    return {
        success,
        state,
        message,
        data
    }
  }
}
export default Service