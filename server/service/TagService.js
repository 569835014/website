import Service from './Service'
class TagService extends Service{
  constructor(){
    super()

  }
  init(model){
      this.Tag=model
  }
  async queryTags({paging}){

      let data;
      try{
          data=await this.Tag.find({}).skip((paging.pageSize-1)*paging.pageNum).limit(paging.pageNum).exec();
          return this.getResult({
              state:"S0001",
              data:data,
              message:"查询成功",
              success:true
          })
      }catch (e){
          return this.errorResult(e)
      }
  }
  async addTag(name,orderId){
      let data;
      try{
          data=await this.Tag.find({name:name}).exec();
          if(data){
              return this.getResult({
                  state:"A0001",
                  data:{},
                  message:"该标签已经存在",
                  success:false
              })
          }
          data=new this.Tag({
              name:name,
              orderId:orderId
          });
          await data.save();
          return this.getResult({
              state:"S0001",
              data:data,
              message:"添加成功",
              success:true
          })
      }catch (e){
          return this.errorResult(e)
      }

  }
}
const service=new TagService()
export default service