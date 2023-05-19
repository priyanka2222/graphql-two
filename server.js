const express = require('express')
const GraphQL = require('express-graphql').graphqlHTTP
const app = express()
const EmployeeData = require('./data/employees')

const { 
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLNonNull,
        GraphQLList
} = require('graphql')

const EmployeeType = new GraphQLObjectType({
    name:"employees",
    description:"A GraphQL employees schema",
    fields: ()=>(
        {
            id:{ 
                type: new GraphQLNonNull(GraphQLInt)
            },
            emp_name:{
                type: new GraphQLNonNull(GraphQLString)
            },
            emp_designation:{
                type: new GraphQLNonNull(GraphQLString)
            },
            emp_address:{
                type: new GraphQLNonNull(GraphQLString)
            }
        })
})

const RootQueryType = new GraphQLObjectType({
    name:"Query",
    description:"Root Query",
    fields:()=>({
        employee:{
            type: EmployeeType,
            description:"A single employee",
            args:{
                id:{ type: GraphQLInt }
            },
            resolve: (parent, args)=> EmployeeData.find(item => item.id === args.id ) 
        },
        employees:{
            type: new GraphQLList(EmployeeType),
            description:"List of employees",
            resolve: ()=> EmployeeData
        }
    })
})

const schema = new GraphQLSchema({
    query:RootQueryType,
})

app.use('/', GraphQL({ 
    schema: schema,
    graphiql: true, 
}))

const PORT = 8080
app.listen(PORT,()=> console.log('GraphQL Server is Running!'))