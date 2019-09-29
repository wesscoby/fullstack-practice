import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ACCESS_TOKEN_SECRET } from '../config';
import User, { UserModel } from '../entities/user';
import { MyContext } from '../types/interfaces';


export function buildContext(request: Request, response: Response): MyContext {
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
    
    const login = async (email: string, password: string): Promise<boolean> => {
        const user = await UserModel.findOne({ email: email });
        if(!user) return false;
    
        const isPasswordMatch = await user.isPasswordMatch(password);
        if(!isPasswordMatch) return false;
    
        const token = signUser(user);
        request.session!.token = token;
        return true ;
    }

    const isAuthenticated = (): boolean => (request.session!.token) ? true : false;
    
    const getUser = async(): Promise<User | null> => {
        const token = request.session!.token
        if(token) {
            const { userId }: any = verifyUser(token);
            return await UserModel.getById(userId);
        } else {
            return null;
        }
    }

    return {
        request, response, getUser, login, isAuthenticated
    }
}
