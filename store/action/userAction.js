import * as NAME from '../constant'
import Api from '../../api/UserApi'

const Service=new Api();
const login=async ({commit},loginInfo)=>{
    // console.info(loginInfo)
    try{
        let res=await Service.login({
            data:loginInfo,
            showNotice:true
        })
        if(res) commit(NAME.SET_USER,res)
    }catch (e){
        if(e.response.status===401){
            throw new Error('来错地方了')
        }
    }
}
export {
    login
}