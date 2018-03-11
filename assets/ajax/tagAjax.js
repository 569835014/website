import Api from '../../api/TagApi'
const Service=new Api();

const addTag=async (tag)=>{
    return await Service.addTag({
        data:tag,
        showNotice:true
    })
}
export {addTag}