


let config={
  //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
  url: '',
  // 请求方法同上
  method: 'post', // default
  // 请求头信息
  headers: {},
  baseURL:"http://127.0.0.1:3000",
  //parameter参数
  params: {
  },
  //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {
  },
  //设置超时时间
  timeout: 5000,
  //返回数据类型
  responseType: 'json', // default
}
export default config