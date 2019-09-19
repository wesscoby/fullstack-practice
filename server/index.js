import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { buildContext } from 'graphql-passport';
import { default as expressPlayground } from 'graphql-playground-middleware-express';
import mongoose from 'mongoose';
import passport from 'passport';
import uuid from 'uuid/v4';
import schema from './graphql';
import { LocalDB_URI, PORT, SESSION_SECRET } from './config';
import * as db from './db/model';
import { createAuthorizationToken, LocalStrategy } from './helpers/auth';
import { GraphQLLocalStrategy } from 'graphql-passport';


const startServer = async () => {

    // Express instance
    const app = express();
    app.use(cookieParser());
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));

    // Use Express Sesion
    app.use(
        session({
            genid: (req) => uuid(),
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        })
    );

    passport.use(new GraphQLLocalStrategy(LocalStrategy));

    // Initialize Passport 
    app.use(passport.initialize());
    app.use(passport.session());

    // Serialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    // Deserialize User
    passport.deserializeUser((userId, done) => {
        db.User.findById(userId, (error, user) => {
            const token = createAuthorizationToken(user)
            done(error, token);
        });
    });

    // Apollo Server instance
    const server = new ApolloServer({
        schema,
        context: async ({ req, res }) => buildContext({ req, res, db })
    });


    server.applyMiddleware({ app, cors: false  });

    // Home Route
    app.get('/', (request, response) => {
        response.end('Welcome!')
    });

    // Api Route (Playground and Endpoint)
    app.get('/api', expressPlayground({ endpoint: '/graphql' }));

    // Mongoose Promise and Schema Indexing
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);

    // Start Express and Mongoose Server
    mongoose.connect(LocalDB_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log('Mongoose connection created');
        app.listen(PORT, () => {
            console.log(`GraphQL Server Running on http://localhost:${PORT}${server.graphqlPath}`)
        });
    })
    .catch(console.log);
}

startServer();