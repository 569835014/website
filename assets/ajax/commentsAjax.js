import Api from '../../api/CommentApi'
const commentsApi=new Api();
const saveComment=async (comment)=>{
    return await commentsApi.saveComments({
        data:{comments:comment},
        showNotice:true
    })
}
export {saveComment}