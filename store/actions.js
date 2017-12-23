import * as NAME from './constant'
import axios from 'axios'
import {queryTagList} from './action/tagsAction'
import {queryArticleList,queryById} from './action/articleAction'
const saveUserInfo = function ({commit}, userInfo) {
    commit(NAME.USER_INFO, userInfo);
};
const login = async function ({commit},loginInfo) {
    try{

        let res=await axios.post('/admin/login',loginInfo)
        console.info(res)
        const {data}=res.data
        if(data.success) commit(NAME.USER_INFO,data.result)
    }catch (e){
        if(e.response.status===401){
            throw new Error('来错地方了')
        }
    }
};
export default {saveUserInfo,login,queryTagList,queryArticleList,queryById}