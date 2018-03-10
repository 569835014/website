import  BaseSchema from '../base/base'

class ArticleType extends BaseSchema{
  constructor (){
    const config={
      name:String
    }
    super(config,"ArticleType")
  }
}

const Model=new ArticleType().entity()
export default Model