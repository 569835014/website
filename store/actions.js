import * as NAME from './constant'
import {queryTagList} from './action/tagsAction'
import * as articleAction from './action/articleAction'
import * as userAction from './action/userAction'
const saveUserInfo = function ({commit}, userInfo) {
    commit(NAME.SET_USER, userInfo);
};
export default {
    nuxtServerInit({commit},{req}){
        if(req.session&&req.session.user){
            const {account}=req.session.user
            const user={
                account
            }
            commit('SET_USER',user)
        }
    },
    saveUserInfo,
    queryTagList,
    ...articleAction,
    ...userAction
}