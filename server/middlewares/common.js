import KoaBodyParser from 'koa-bodyparser'
import session from 'koa-session'
import KoaBody from 'koa-body'
export const addBodyParser=app=>{
  app.use(KoaBodyParser())
}
export const addBody=app=>{

    app.use(KoaBody({
        multipart: true,
        formidable: {
            maxFileSize: 500000*1024*1024    // 设置上传文件大小最大限制，默认2M
        }
    }));
}
export const addSession=app=>{
  app.keys=['website']
  const CONFIG={
    key:'koa:sess',
    maxAge:86400000,
    overwrite:true,
    signed:true,
    rolling:false
  }
  app.use(session(CONFIG,app))
}