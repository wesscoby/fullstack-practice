import "reflect-metadata";
import { ApolloServer, ApolloError } from 'apollo-server-express';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
// import * as passport from 'passport';
import { buildSchema } from 'type-graphql';
import * as uuid from 'uuid/v4';

import { LocalDB_URI, PORT, SESSION_SECRET } from './config';

import { UserResolver } from './resolvers/user';
import { EventResolver } from './resolvers/event';
// import { signUser, LocalStrategy } from './helpers/auth';


const startServer = async () => {

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

    // passport.use();

    // Initialize Passport 
    // app.use(passport.initialize());
    // app.use(passport.session());

    // Serialize user
    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    // });
    
    // Deserialize User
    // passport.deserializeUser((userId, done) => {
    //     models.User.findById(userId, (error, user) => {
    //         const token = signUser(user);
    //         done(error, token);
    //     });
    // });

    const schema = await buildSchema({
        resolvers: [ UserResolver, EventResolver ],
        dateScalarMode: "isoDate"
    });

    // Apollo Server instance
    const server = new ApolloServer({
        schema,
        context: async ({ req, res }) => ({ req, res }),
        formatError: error => {
            if(error.originalError instanceof ApolloError ) return error;
            return {
                message: error.message,
                path: error.path,
            }
        }
    });


    server.applyMiddleware({ app, cors: false  });

    // Home Route
    app.get('/', (_request: any, response: { end: (arg0: string) => void; }) => {
        response.end('Welcome!')
    });

    // Api Route (Playground and Endpoint)
    // app.get('/api', expressPlayground({ endpoint: '/graphql' }));

    // Mongoose Schema Indexing
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