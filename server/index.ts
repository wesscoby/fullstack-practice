import "reflect-metadata";
import { ApolloServer, ApolloError } from 'apollo-server-express';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import { set, connect } from 'mongoose';
// import * as passport from 'passport';
import { buildSchema } from 'type-graphql';
import * as uuid from 'uuid/v4';

import { LocalDB_URI, PORT, SESSION_SECRET } from './config';
import { UserResolver } from './resolvers/user';
import { EventResolver } from './resolvers/event';
import BookingResolver from './resolvers/booking.resolver';
// import './helpers/passport-auth';
import { buildContext } from './helpers/auth';


const startServer = async () => {
    const schema = await buildSchema({
        resolvers: [ UserResolver, EventResolver, BookingResolver ],
        dateScalarMode: "isoDate",
        authChecker: async (
            { context: { isAuthenticated } }
        ) => (isAuthenticated()) ? true : false
    });

    // Express instance
    const app  = express();
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));

    // Use Express Sesion
    app.use(
        session({
            genid: () => uuid(),
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        })
    );

    // Initialize Passport 
    // app.use(passport.initialize());
    // app.use(passport.session());

    // Apollo Server instance
    const server = new ApolloServer({
        schema,
        context: async ({ req, res }) => buildContext( req, res ),
        formatError: error => {
            if(error.originalError instanceof ApolloError ) return error;
            return {
                message: error.message,
                path: error.path
            }
        }
    });

    // Add Express Middleware to ApolloServer
    server.applyMiddleware({ app, cors: false  });

    // Mongoose Schema Indexing
    set('useCreateIndex', true);
    // Start Express and Mongoose Server
    connect(LocalDB_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log('Mongoose connection created');
        app.listen(PORT, () => {
            console.log(
                `GraphQL Server Running on http://localhost:${PORT}${server.graphqlPath}`
            )
        });
    })
    .catch(console.log);
}

startServer();