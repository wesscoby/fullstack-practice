import { buildSchema } from 'type-graphql';

import { UserResolver, EventResolver, BookingResolver } from './resolvers';

// Build Schema
const schema = async() => await buildSchema({
    resolvers: [ UserResolver, EventResolver, BookingResolver ],
    dateScalarMode: "isoDate",
    authChecker: async (
        { context: { isAuthenticated } }
    ) => (isAuthenticated()) ? true : false
});

export default schema;