import  BaseSchema from '../base/base'
import mongoose from 'mongoose'
const {Schema}=mongoose;
const ObjectId=Schema.Types.ObjectId;
class Article extends BaseSchema{
  constructor (){
    const config= {
      title: String,//标题
      content: String,//内容
      richType: {//1为markdown,2为富文本编辑器
        type: Number,
        default: 1
      },
      abstract: String,//摘要
      openComment: {//1为开启评论,2为关闭评论
        type: Number,
        default: 1
      },
      status: {//文章状态，1为审核中 2已发布 3待审核 4已退回
        type: Number,
        default: 1
      },
      avatarUrl: String,
      comments: [//评论
        {
          type: ObjectId,
          ref: "Comment"
        }
      ],
      likesIP:[],
      like:{
        type:Number,
        default:0
      },
      //分享数
      share:{
        type:Number,
        default:0
      },
      keyWords:String,
      subtitle: String, //副标题
      articleType: { //文章类型
        type: ObjectId,
        ref: "ArticleType"
      },
      tags: [
        {//文章标签
          type: ObjectId,
          ref: "Tag"
        }
      ],
      user:{
        type:ObjectId,
        ref:"User"
      }
    }
    super(config,"Article")
  }
}

new Article().entity()