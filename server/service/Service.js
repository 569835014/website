import axios from 'axios'
import config from './config'
class Service{
  constructor(){
    this.axios=axios
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
}
export default Service