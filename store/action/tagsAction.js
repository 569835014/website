import * as NAME from '../constant'
import Service from '../service/TagService'

const queryTagList = async function ({commit},{paging}) {
  let data=await Service.queryTags({paging});
  console.info(data.data)
  if(data.list){
    commit(NAME.TAG_LIST, data.list);
  }else{
    commit(NAME.TAG_LIST, []);
  }

};
export {queryTagList}