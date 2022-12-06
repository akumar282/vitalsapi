import { ApolloServer } from 'apollo-server-azure-functions';
import { CosmosDataSource } from 'apollo-datasource-cosmosdb';
import { typeDefs } from './schema';
import { User, Observation } from '../models/user';
import { CosmosClient } from '@azure/cosmos';
// Resolver map.
const resolvers = {
    Query: {
        user: async (_: any, params: { id: any; }, context: { dataSources: { user: { findOneById: (arg0: any) => any}; }; }) => {
            return context.dataSources.user.findOneById(params.id);
      },
        observation: async (_: any, params: { id: any; }, context: { dataSources: { observation: { findOneById: (arg0: any) => any}; }; }) => {
            return context.dataSources.observation.findOneById(params.id);
      },
    },
    // Mutation: {
    //     user : async (_ , params: {createUser})
    // }
  };
  

// Create our server.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => ({
      user: buildCosmosDataSource<User>('usercont'),
      observation: buildCosmosDataSource<Observation>('observe')
    }) 
  });
export const run = server.createHandler();



const buildCosmosDataSource = <TData extends { id: string }>(
    containerId: string
  ) => {
    const client = new CosmosClient(
      process.env.COSMOS_CONNECTION_STRING!
    );
    const container = client
      .database(process.env.COSMOS_DATABASE_NAME!)
      .container(containerId);
      
    return new CosmosDataSource<TData, unknown>(container);
}

