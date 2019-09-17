import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { join } from 'path';
import * as Query from './resolvers/query.resolver';
import * as Mutation from './resolvers/mutation.resolver';
import * as Scalar from './resolvers/scalar.resolver';
import * as Interface from './resolvers/interface.resolver';


const typeDefs = importSchema(join(__dirname, 'schema', 'index.graphql'));

export const resolvers = {
    Query,
    Mutation,
    ...Scalar,
    ...Interface
}

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;