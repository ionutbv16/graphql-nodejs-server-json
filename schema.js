const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Client Type
const ClientType = new GraphQLObjectType({
    name:'Client',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        address: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});

// Root Query
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        clientab:{
            type:ClientType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                
                return axios.get('http://localhost:3000/clientsab/'+ args.id)
                    .then(res => res.data);

            }
        },
        clientsab:{
            type: new GraphQLList(ClientType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/clientsab')
                    .then(res => res.data);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addClient:{
            type:ClientType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                address: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/clientsab', {
                    name:args.name,
                    email: args.email,
                    address: args.address,
                    age:args.age
                })
                .then(res => res.data);
            }
        },
        deleteClient:{
            type:ClientType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/clientsab/'+args.id)
                .then(res => res.data);
            }
        },
        editClient:{
            type:ClientType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                address: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/clientsab/'+args.id, args)
                .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});