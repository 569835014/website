/**
 * Created by Administrator on 2017/9/1.
 */
// import _ from 'lodash'
// import {resolve} from 'path'
// const host=process.env.HOST||'localhost'
// const env=process.env.NODE_ENV||'development'
// const conf=require(resolve(__dirname),`./${env}.json`)
// console.info(conf )
// export default _.assign({
//   env,
//   host,
// },conf)
export default {
  "db": "mongodb://localhost/website",
  "SITE_ROOT_URL": "http://icessr.ngrok.cc",
  "wechat": {
    "token": "cdmacctvccav",
    "appId": "wx3bd4658fa7c863d3",
    "appSecret": "2b00f20a3c557d6812992b0e3562f3f1"
  },
  "mina":{
    "appid": "wx3bd4658fa7c863d3",
    "secret":"a4e90ac0fa246e6e543f0927412ac1e4"
  },
  "shop":{
    "appId": "wx3bd4658fa7c863d3",
    "partnerKey":"",
    "mchId":""
  },
  "qiniu": {
    "AK": "6khcv_DEBzqInV9q-CWI89OvtKhAaWemh-0QuVt3",
    "SK": "W4x4QnO_1YmSpJ1t3fPhG8nJSfFo1us535mrY7Uw",
    "URL": "ow9zt0jku.bkt.clouddn.com"
  }

}


