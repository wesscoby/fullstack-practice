import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config';
import { User } from '../entities';

export const signUser = (user: User): string => {
    return sign(
        { userId: user.id },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
};

export const verifyUser = (token: string): object => {
    return verify(token, ACCESS_TOKEN_SECRET) as object;
}