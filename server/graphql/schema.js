import {GraphQLObjectType,GraphQLSchema} from 'graphql'

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name:"Queries",
        fields:Object.assign({})
    })
})