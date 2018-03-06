import  BaseSchema from '../base/base'

class ArticleType extends BaseSchema{
  constructor (){
    const config={
      name:String
    }
    super(config,"ArticleType")
  }
}

new ArticleType().entity()