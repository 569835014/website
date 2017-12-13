const userInfo = state => {
    console.info("执行getters")
    console.info(state)
    return state.user
};
export default {userInfo}