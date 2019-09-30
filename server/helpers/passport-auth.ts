import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config';
import User, { UserModel } from '../entities/user';


const signUser = (user: User): string => {
    return sign(
        { userId: user.id },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
};

const verifyUser = (token: string): object => {
    return verify(token, ACCESS_TOKEN_SECRET) as object;
}

passport.use(new LocalStrategy(
    async (email: string, password: string, done: any) => {
        try {
            const user: User | null = await UserModel.getByEmail(email);
            if(!user) done("Invalid Credentials!", false);

            const isPasswordMatch = await user!.isPasswordMatch(password);
            if(!isPasswordMatch) done("Invalid Credentials!", false);
            
            done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Serialize user
passport.serializeUser((user: User, done: any) => {
    const token = signUser(user);
    done(null, token);
});

// Deserialize User
passport.deserializeUser((token: string, done: any) => {
    const { userId }: any = verifyUser(token) as object;
    // UserModel.findById(userId, (error: Error, user: User) => {
    //     if(error) throw new Error(error.message);
        done(null, userId);
    // });
});