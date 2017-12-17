import Service from './Service'

class TagService extends Service{
  constructor(){
    super()

  }
  async queryTags({paging}){
    // let result=this.axios.post('"/tag/tagList',{paging})
    let result=await this.common({
      url:" http://127.0.0.1:3000/tag/tagList",
      data:{
        paging
      }
    });
    return result.data
  }
}
const service=new TagService()
export default service