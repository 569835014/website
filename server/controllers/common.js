import { controller, get, post ,required} from '../decorator/router'
import Service from '../service/CommonService'
@controller('/common')
export class CommonController{
    @get('/imgCode')
    async imgCode(ctx,next){
        let data=Service.imgCode();
        ctx.session.captcha=data.data.text;
        delete data.data.text
        return ctx.body=data;
    }
}