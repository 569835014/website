import Service from './Service'
class ArticleService extends Service{
  constructor(){
    super('Article')
  }
  async saveArticle(article,id){
    try{
      let data
      if(id)data=await Article.findOne({id:id}).exec();
      else data=new Article(article)
      data.title=article.title
      data.content=article.content;
      await data.save();
      return this.successResult(data,'保存成功！')
    }catch(e) {
      return this.errorResult(e)
    }
  }
}
const service=new ArticleService()
export default service