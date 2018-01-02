import * as states from '../../assets/common/states'
class Result{
  constructor(){
    this.result={
      success:true,
      state:'',
      message:"",
      data:null
    }
    this.rules={}
    Object.assign(this.rules,states)
  }
  getResult({success,state,message,data}){
    this.result={
      success,
      state:this.rules[state],
      message,
      data
    }
  }
}
const result=new Result()
export default result