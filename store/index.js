/**
 * Created by Administrator on 2017/9/7.
 */
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'
const createStore=()=>{
    return new Vuex.Store({
        state:{
            user:null,
        },
        getters,
        actions,
        mutations,
        strict: debug,
        plugins: debug ? [createLogger()] : []
    })
}

export default createStore