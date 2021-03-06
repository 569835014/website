import Service from './Service'
import Model from '../database/schema/article.js'
class ArticleService extends Service {
  constructor () {
    super({name:'Article',cName:'文章',model:Model})
  }

  async saveArticle (article, id) {
      let data
    try {

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
          .populate('tags comments')
          .exec();
      if(!data) return this.abnormalResult(null,'文章不存在')
      return this.successResult(data, '查询成功')
    } catch (e) {
      return this.errorResult(e)
    }
  }
  async linkArticle(id,ip){
      let data
      let msg='点赞成功'
      try {
          data=await this.Model.findOne({_id:id})
              .exec();

          if(!data) return this.abnormalResult(null,'文章不存在')
          else{
              let index=data.likesIP.indexOf(ip);
              if(index>-1){
                  data.likesIP.splice(index,1);
                  data.like-=1;
                  msg='取消成功'
              }else{
                  data.likesIP.push(ip);
                  data.like+=1;
              }

              data.save();
          }
           return this.successResult({like:data.like}, msg)
      } catch (e) {
          return this.errorResult(e)
      }
  }
  async updateComment(id,commentId){

      let data
      try{
          data=await this.Model.findOne({_id:id}).exec()
          if(!data){
              return  this.abnormalResult(null,'该文章不存在')
          }

          if(!data.comments.includes(commentId)){
              data.comments.push(commentId)
          }
          data.save()
          return this.successResult(data, '更新文章出成功')
      }catch (e){
          console.info(e)
          return this.errorResult(e)
      }
  }
}

const service = new ArticleService()
export default service