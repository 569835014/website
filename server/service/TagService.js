import Service from './Service'
class TagService extends Service{
  constructor(){
      super({name:'Tag',cName:'标签'})

  }

  async queryTags({paging}){
      console.info(this.Model)
      let data;
      try{
          data=await this.Model.find({}).skip((paging.pageSize-1)*paging.pageNum).limit(paging.pageNum).exec();
        return this.successResult(data,'查询成功')
      }catch (e){
          return this.errorResult(e)
      }
  }
  async addTag(name,orderId){
      let data;
      try{
          data=await this.Model.findOne({name:name}).exec();
          console.info(data);
          if(data){
              return this.abnormalResult(null,'该标签已存在')
          }
          data=new this.Model({
              name:name,
              orderId:orderId
          });
          await data.save();
          return this.successResult(data,'添加成功')
      }catch (e){
          return this.errorResult(e)
      }

  }
}
const service=new TagService()
export default service