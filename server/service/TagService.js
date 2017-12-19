import Service from './Service'
const mongoose=require('mongoose')
class TagService extends Service{
  constructor(){
    super()

  }
  async queryTags({paging}){
    // let result=this.axios.post('"/tag/tagList',{paging})
    let result=await this.common({
      url:"/tag/tagList",
      data:{
        paging
      }
    });
    return result.data
  }
  async addTag(name){
    let tag;
    try{
      tag=await Tag.findOne({name:name})
    }catch(e){
      return {

      }
    }
  }
}
const service=new TagService()
export default service