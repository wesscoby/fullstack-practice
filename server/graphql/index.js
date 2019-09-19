import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { join } from 'path';
import * as Scalar from './resolvers/scalar.resolver';
import * as Interface from './resolvers/interface.resolver';
// Import Queries
import * as UserQueries from './resolvers/queries/user';
import * as EventQueries from './resolvers/queries/event';
import * as BookingQueries from './resolvers/queries/booking';
// Import Mutations
import * as UserMutations from './resolvers/mutations/user';
import * as EventMutations from './resolvers/mutations/event';
import * as BookingMutations from './resolvers/mutations/booking';

// Combine imported queries and mutations
const Query = { ...UserQueries, ...EventQueries, ...BookingQueries };
const Mutation = { ...UserMutations, ...EventMutations, ...BookingMutations };

// Import type definitions 
const typeDefs = importSchema(join(__dirname, 'schema', 'index.graphql'));

// Create resolvers object
const resolvers = {
    Query,
    Mutation,
    ...Scalar,
    ...Interface
}

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;