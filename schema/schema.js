// const { projects, clients } = require("../sampleData.js");
const Project = require(".././models/Project")
const Client = require(".././models/Client")

const {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const clientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const projectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: { 
        type: clientType,
        resolve(parent, args) {
          return Client.findById(parent.clientId);
        },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: clientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    clients: {
      type: GraphQLList(clientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    project: {
      type: projectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    projects: {
      type: GraphQLList(projectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
  },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        /* ------------------------------- Add client ------------------------------- */
        addClient: {
            type: clientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },
        /* ------------------------------ delete client ----------------------------- */

        deleteClient:{
            type: clientType,
            args: {id: {type: GraphQLNonNull(GraphQLID)}}
        }
        
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
