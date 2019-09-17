import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config';
import { User } from '../db/model';
import { GraphQLLocalStrategy } from 'graphql-passport';

// export const generateTokens = payload => {}

export const createTokens = user => {
    const refreshToken = sign(
        { userId: user.id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    const accessToken = sign(
        { userId: user.id },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    return { accessToken, refreshToken }
};

export const createAuthorizationToken = (user) => {
    return sign(
        { userId: user.id, role: 'some role' },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
};

export const retrieveAuthorizationToken = token => {
    return verify(token, ACCESS_TOKEN_SECRET);
}

export const retrieveTokenData = (token, secret) => {
    return verify(token, secret);
}

export const authenticateUser = async (email, password) => {
    const user = await User.getByEmail(email);
    if(!user) {
        throw new Error("Login Failed: Invalid Credentials!");
    }

    const isPasswordMatch = await user.isPasswordMatch(password);
    if(!isPasswordMatch) {
        throw new Error("Login Failed: Invalid Credentials!");
    }

    return await { user, tokens: createTokens(user) }
}

export const LocalStrategy = async (email, password, done) => {
    try {
        const user = await User.getByEmail(email);
        if(!user) done("Login Failed: Invalid Credentials!", false);

        const isPasswordMatch = await user.isPasswordMatch(password);
        if(!isPasswordMatch) done("Login Failed: Invalid Credentials!: Password", false);
        
        done(null, user);
    } catch (error) {
        return done(error);
    }
};