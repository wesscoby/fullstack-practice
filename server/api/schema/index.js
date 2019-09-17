import { importSchema } from 'graphql-import';
import { join } from 'path';

const typeDefs = importSchema(join(__dirname, 'index.graphql'));

export default typeDefs;
