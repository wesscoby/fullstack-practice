import * as Query from './query.resolver';
import * as Mutation from './mutation.resolver';
import * as Scalar from './scalar.resolver';
import * as Interface from './interface.resolver';

const resolvers = {
        Query,
        Mutation,
        ...Scalar,
        ...Interface
}

export default resolvers;