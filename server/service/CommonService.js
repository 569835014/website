import Service from './Service'
let svgCaptcha = require('svg-captcha');
class CommonService extends Service{
    imgCode(){
        let codeConfig = {
            size: 5,// 验证码长度
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            height: 52,
            color: true
        }
        let captcha = svgCaptcha.createMathExpr(codeConfig);
       return this.successResult(captcha)
    }
}
const service=new CommonService()
export default service