import * as NAME from '../constant'
import Service from '../../server/service/TagService'

const queryTagList = async function ({commit},{paging}) {
  let data=await Service.queryTags({paging});

  if(data.list){
    commit(NAME.TAG_LIST, data.list);
  }else{
    commit(NAME.TAG_LIST, []);
  }

};
export {queryTagList}