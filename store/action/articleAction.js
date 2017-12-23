import * as NAME from '../constant'
import Api from '../../api/ArticleApi'
const Service=new Api();
const queryArticleList = async function ({commit},{paging}) {
  commit(NAME.ARTICLE_LIST,await Service.queryList({paging})||[]);
};
const queryById = async function ({commit},{id}) {
  commit(NAME.ARTICLE,await Service.queryById({id})||[]);
};
export {queryArticleList,queryById}