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
}


