import Service from './Service'

class ArticleService extends Service {
  constructor () {
    super('Article')
  }

  async saveArticle (article, id) {
    try {
      let data
      if (id) data = await this.Model.findOne({id: id}).exec()
      else data = new this.Model(article)
      await data.save()
      return this.successResult(data, '保存成功！')
    } catch (e) {
      return this.errorResult(e)
    }
  }

  async queryList (paging) {
    let data
    try {
      data = await this.Model.find({}).skip((paging.pageSize - 1) * paging.pageNum).limit(paging.pageNum)
        .populate('tags')
        .exec()
      return this.successResult(data, '查询成功')
    } catch (e) {
      return this.errorResult(e)
    }
  }

  async queryById (id) {
    let data
    try {
      data=await this.Model.findOne({_id:id})
          .populate('tags')
          .exec();
      if(!data) return this.abnormalResult(null,'文章不存在')
      return this.successResult(data, '查询成功')
    } catch (e) {
      return this.errorResult(e)
    }
  }
  async linkArticle(id,ip){
      let data
      try {
          data=await this.Model.findOne({_id:id})
              .exec();
          if(!data) return this.abnormalResult(null,'文章不存在')
          return this.successResult(data, '查询成功')
      } catch (e) {
          return this.errorResult(e)
      }
  }
}

const service = new ArticleService()
export default service