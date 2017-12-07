import Vue from 'vue'
if(!process.BROWSER_BUILD){
  const iview=require('iview/dist/iview.min');
  require('iview/dist/styles/iview.css')
  Vue.use(iview)
}