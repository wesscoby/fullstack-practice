import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config';
import { User } from '../models';
import { GraphQLLocalStrategy } from 'graphql-passport';

export const signUser = (user) => {
    return sign(
        { userId: user.id, role: 'some role' },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
};

export const verifyUser = token => {
    return verify(token, ACCESS_TOKEN_SECRET);
}

export const retrieveTokenData = (token, secret) => {
    return verify(token, secret);
}

export const LocalStrategy = async (email, password, done) => {
    try {
        const user = await User.getByEmail(email);
        if(!user) done("Invalid Credentials!", false);

        const isPasswordMatch = await user.isPasswordMatch(password);
        if(!isPasswordMatch) done("Invalid Credentials!", false);
        
        done(null, user);
    } catch (error) {
        return done(error);
    }
};