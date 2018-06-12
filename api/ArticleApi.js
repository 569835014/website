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
    return await this.common(params)1
  }
  async linkArticle(params){
      params.url='/article/link'2
      return await this.common(params)
  }
}
export default ArticleApi