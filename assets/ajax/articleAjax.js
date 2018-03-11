import Api from '../../api/ArticleApi'
const Service=new Api();

const linkArticel=async (id)=>{

    return await Service.linkArticle({
        data:{id:id},
        showNotice:true
    })
}
const publilshArticle=async (params)=>{
    return await Service.saveArticleApi(params)
}
export {linkArticel,publilshArticle}