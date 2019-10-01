import * as passport from 'passport';
import { Request, Response } from 'express';
import { User, UserModel } from '../entities';
import { MyContext } from '../types';
import { verifyUser } from '../local-auth';

const promisifiedAuthenticate = (
    request: Request, response: Response, name: string, options: any
) => new Promise(
    (resolve, reject) => passport.authenticate(name, options, (error: Error, user: User, info: any) => {
        if(error) reject(error);
        resolve({ user, info });
    })(request, response)
)

const promisifiedLogin = (
    request: Request, user: User, options: any
) => new Promise(
    (resolve, reject) => request.login(user, options, (error: Error) => {
        if(error) reject(error);
        else resolve();
    })
)

const buildContext = async (
    request: Request, response: Response
): Promise<MyContext> => {
    const authenticate = (
        name: string, options: any
    ) => promisifiedAuthenticate(request, response, name, options);

    const login = async (name: string, options: any) => {
        const { user }: any = await authenticate(name, options);
        await promisifiedLogin(request, user, options);
        return true;
    }

    const logout = async () => {
        request.logout();
        response.clearCookie("connect.sid");
        return true;
    }

    const getUser = async () => {
        const token: string = request.user as string;
        const { userId }: any = verifyUser(token);
        const user = await UserModel.getById(userId);
        if(user) return user;
        else return null;
    }

    return {
        login,
        logout,
        getUser,
        isAuthenticated: () => request.isAuthenticated()
    }
}

export default buildContext;