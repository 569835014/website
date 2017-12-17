import Service from './Service'
const mongoose=require('mongoose')
const Article=mongoose.model('Article')
class ArticleService extends Service{
  constructor(){
    super()
  }
  async saveArticle(article,id){
    let result=null;
    try{
      let data
      if(id)data=await Article.findOne({id:id}).exec();
      else data=new Article(article)
      data.title=article.title
      data.content=article.content;
      await data.save();
      return {
        success:true,
        state:'A0001',
        message:"更新成功!",
        data:data
      }
    }catch(e) {
      return result={
        success:true,
        state:'A0001',
        message:e,
        data:{}
      }
    }


    return result.data
  }
}
const service=new ArticleService()
export default service