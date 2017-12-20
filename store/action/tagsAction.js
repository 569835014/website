import * as NAME from '../constant'
import Api from '../../api/TagApi'
const Service=new Api();
const queryTagList = async function ({commit},{paging}) {
    commit(NAME.TAG_LIST,await Service.queryTags({paging}));
};
export {queryTagList}