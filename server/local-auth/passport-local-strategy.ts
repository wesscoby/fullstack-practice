import * as passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';

import { signUser } from './'
import { UserModel } from '../entities';

// Using Strategy from module graphql-passport
passport.use(
    new GraphQLLocalStrategy( async (email: string, password: string, done: Function) => {
        const user = await UserModel.getByEmail(email);
        if(!user) done("Invalid Credentials", false);

        const isPasswordMatch = await user!.isPasswordMatch(password);
        if(!isPasswordMatch) done("Invalid Credentials", false);

        const token = signUser(user!);
        done(null, token);
    })
);

// Serialize user
passport.serializeUser((token: string, done: any) => {
    done(null, token);
});

// Deserialize User
passport.deserializeUser((token: string, done: any) => {
    done(null, token);
});