import  BaseSchema from '../base/base'

class ArticleType extends BaseSchema{
  constructor (){
    const config={
      typeId:Number,
      name:String
    }
    super(config,"ArticleType")
  }
}

new ArticleType().entity()