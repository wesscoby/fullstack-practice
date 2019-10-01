import { Request, Response } from 'express';
import User from 'entities/user';

interface options {
    username?: string;
    email?: string;
    password: string;
}
export interface MyContext {
    request?: Request;
    response?: Response;
    isAuthenticated(): boolean;
    login(name: string, options: options): Promise<boolean>;
    logout(): Promise<boolean>
    getUser(): Promise<User | null>
}

export interface AuthStatus {
    status: boolean;
    token?: string;
    message?: string;
}