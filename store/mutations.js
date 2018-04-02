import * as NAME from './constant'

const mutations = {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [NAME.SET_USER](state, userInfo) {
        state.user = userInfo
    },
    [NAME.TAG_LIST](state, tags) {
        state.tags = tags
    },
    [NAME.ARTICLE_LIST](state, articles) {
        state.articles = articles
    },
    [NAME.ARTICLE](state, article) {
        state.article = article
    },
    [NAME.COMMENTS](state, comments) {
        state.comments = comments
    }
}
export default mutations