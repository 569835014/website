import * as NAME from './constant'
import axios from 'axios'
import {queryTagList} from './action/tagsAction'
import * as articleAction from './action/articleAction'
import * as userAction from './action/userAction'
const saveUserInfo = function ({commit}, userInfo) {
    commit(NAME.SET_USER, userInfo);
};
export default {
    nuxtServerInit({commit},{req}){
        console.info(req.session)
        if(req.session&&req.session.user){
            const {email,nickname,avatarUrl}=req.session.user
            const user={
                email,nickname,avatarUrl
            }
            commit('SET_USER',user)
        }
    },
    saveUserInfo,
    queryTagList,
    ...articleAction,
    ...userAction
}