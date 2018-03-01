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
  async queryList(params){
    return await this.common({
      url:'/article/list',
      data:params
    })
  }
  async queryById(params){
    return await this.common({
      url:'/article/findOne',
      data:params
    })
  }
  async linkArticle(params){
      return await this.common({
          url:'/article/link',
          data:params
      })
  }
}
export default ArticleApi