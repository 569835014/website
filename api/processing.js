import {Notice} from 'iview'

import * as CODE from '../assets/common/states'
class Processing{
  constructor (){
    this.config={
      title:"",
      desc:"",
      duration:2
    }
  }
  async proceResult(params,result){
    switch (result.state){
      case CODE.ABNORMAL:
        if (params.abnormal)  await params.abnormal(result);
        this.config.title='温馨提示';
        this.config.desc=result.message;
        Notice.warning(this.config);
        return false
      case CODE.ERROR:
        this.config.title='系统异常';
        if(typeof result.message==='object'){
          this.config.desc=result.message.message;
        }else{
          this.config.desc=result.message
        }
        if (params.error)  await params.error(result);
        Notice.error(this.config);
        return false
      case CODE.SUCCESS:

        if(params.showNotice) {
          this.config.title='恭喜你';
          this.config.desc=result.message;
          Notice.success(this.config);
          return true
        }
    }
    return true
  }
}
export default new Processing()