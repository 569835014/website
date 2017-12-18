import {SUCCESS,ABNORMAL} from '../../assets/common/states'
class Result{
  constructor(success=true){

    this.result={
      success,
      state:success?SUCCESS:ABNORMAL,
      message:"",
      data:null
    }
  }
}