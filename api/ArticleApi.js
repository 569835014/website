import Api from "./Api";

class ArticleApi extends Api{
  constructor(){
    super()
  }
  async saveArticleApi(params){
    return await this.common({
      url:'/article/save',
      data:params
    })
  }
}
export default ArticleApi