import { Request, Response } from 'express';
import User from 'entities/user';

export interface MyContext {
    request: Request;
    response: Response;
    isAuthenticated(): boolean;
    login(email: string, password: string): Promise<boolean>;
    logout(): Promise<boolean>
    getUser(): Promise<User | null>
}

export interface AuthStatus {
    status: boolean;
    token?: string;
    message?: string;
}