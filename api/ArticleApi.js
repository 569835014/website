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
      params.url='/article/link'
      return await this.common(params)
  }
}
export default ArticleApi