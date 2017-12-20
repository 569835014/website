import {Notice} from 'iview'
console.info(Notice)
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
        this.config.desc=result.message;
        Notice.error(this.config);
        return false
    }
    return true
  }
}
export default new Processing()