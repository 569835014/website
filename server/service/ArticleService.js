import Service from './Service'
class ArticleService extends Service{
  constructor(){
    super('Article')
  }
  async saveArticle(article,id){
    try{
      let data
      if(id)data=await this.Model.findOne({id:id}).exec();
      else data=new this.Model(article)
      console.info(data)
      await data.save();
      return this.successResult(data,'保存成功！')
    }catch(e) {
      console.info(e)
      return this.errorResult(e)
    }
  }
}
const service=new ArticleService()
export default service