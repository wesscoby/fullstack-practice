import express from 'express';
import session from 'express-session';
import uuid from 'uuid/v4';
import mongoose from 'mongoose';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express';
import { default as expressPlayground } from 'graphql-playground-middleware-express';
import passport from 'passport';
import { GraphQLLocalStrategy, buildContext  } from 'graphql-passport';

import { PORT, SESSION_SECRET, LocalDB_URI } from './config';
import * as db from './db/model';
import resolvers from './api/resolvers'

const typeDefs = importSchema('api/schema/index.graphql');
const schema = makeExecutableSchema({ typeDefs, resolvers });


const startServer = async () => {

    // Express instance
    const app = express();

    // Use Express Sesion
    app.use(
        session({
            genid: (req) => uuid(),
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        })
    );

    passport.use(
        new GraphQLLocalStrategy( async (email, password, done) => {
        // const users = User.getUsers();
        // const matchingUser = users.find(user => email === user.email && password === user.password);
        const matchingUser = await db.User.find({ email: email, password: password }).exec();
        const error = matchingUser ? null : new Error('no matching user');
        done(error, matchingUser);
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser( async (user, done) => {
        // const users = await db.User.find({}).exec();
        // const matchingUser = users.find(user => user.id === id);
        // const matchingUser = await db.User.findOne({ _id: id }).exec();
        done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    // Apollo Server instance
    const server = new ApolloServer({
        schema,
        context: async ({ req, res }) => buildContext({ req, res })
    });
    server.applyMiddleware({ app });

    // Home Route
    app.get('/', (request, response) => {
        response.end('Welcome!')
    });

    // Api Route (Playground and Endpoint)
    app.get('/api', expressPlayground({ endpoint: '/graphql' }));

     // Mongoose Connection
    mongoose.connect(LocalDB_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);

     // Start Server
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection created');
        app.listen(PORT, () => {
            console.log(`GraphQL Server Running on http://localhost:${PORT}${server.graphqlPath}`)
        });
    });
}

startServer();