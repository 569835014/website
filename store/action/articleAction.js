import * as NAME from '../constant'
import Api from '../../api/ArticleApi'
const Service=new Api();
const queryArticleList = async function ({commit},{paging}) {
  commit(NAME.ARTICLE_LIST,await Service.queryList({paging})||[]);
};
const queryById = async function ({commit},id) {
  let article=await Service.queryById({
      data:{id:id},
  });
  commit(NAME.ARTICLE,article);
  commit(NAME.COMMENTS,article.comments);
};
const updateArticle=async function ({commit},article) {
  commit(NAME.ARTICLE,article)
}
const updateArticleCommit=async function ({commit,state},articleComments) {
    if(articleComments instanceof Array){
        return  commit(NAME.COMMENTS,articleComments)
    }
    const arr=state.comments.slice(0);
    arr.push(articleComments);
    commit(NAME.COMMENTS,arr)
}
export {queryArticleList,queryById,updateArticle,updateArticleCommit}