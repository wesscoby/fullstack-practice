import * as Query from './query.resolver';
import * as Mutation from './mutation.resolver';
import * as Scalar from './scalar.resolver';

const resolvers = {
        Query,
        Mutation,
        ...Scalar
}

export default resolvers;