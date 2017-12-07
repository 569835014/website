/**
 * 数据库连接
 */
import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import {resolve} from 'path'
import R from 'ramda'
const models=resolve(__dirname,'../database/schema')
//同步读取所有的models文件,并通过正则筛选出js文件
fs.readdirSync(models)
    .filter(file=>~file.search(/^[^\.].*js$/))
    .forEach(file=>require(resolve(models,file)))
export const database=app=>{
    //开启调试
    mongoose.set('debug',true)
    //加载数据库配置信息，连接数据库
    mongoose.connect(config.db)
    //数据连接异常的时候，从新连接数据库
    mongoose.connection.on('disconnected',()=>{
        mongoose.connect(config.db)
    })
    //数据连接出错的时候，打印日志
    mongoose.connection.on('error',err=>{
        console.error(err)
    })
    //连接数据库
    mongoose.connection.on('open',async ()=>{
        console.log('欢迎连接数据库')

    })

}