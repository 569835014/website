import Api from '../../api/ArticleApi'
const Service=new Api();

const linkArticel=async (id)=>{
    return await Service.linkArticle({id:id})
}
export {linkArticel}