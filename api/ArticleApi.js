import Api from "./Api";

class ArticleApi extends Api{
  constructor(){
    super()
  }
  async saveArticleApi(params){
      params.url='/article/save'
    return await this.common(params)
  }
  async queryList(params){
    params.url='/article/list'
    return await this.common(params)
  }
  async queryById(params){
    params.url='/article/findOne'
    return await this.common(params)
  }
  async linkArticle(params){
      params.url='/article/link'
      return await this.common(params)
  }
}
export default ArticleApi