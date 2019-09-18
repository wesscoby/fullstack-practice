import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Event, User, Booking } from '../../db/model';
import { authenticateUser, retrieveAuthorizationToken } from '../../helpers/auth';

export const event = async (parent, { id }, context) => {
    try {
        return await Event.getOne(id);
    } catch(error) {
        throw error;
    }
}

export const events = async (parent, args, context) => {
    try {
        return await Event.getAll();
    } catch(error) {
        throw error;
    }
}

export const user = async (parent, { email }, context) => {
    return await User.getByEmail(email);
}

export const users = async (parent, args, context) => {
    try {
        return await User
                        .find({})
                        .populate({ path: 'createdEvents' })
                        .exec();
    } catch(error) {
        throw error;
    }
}

export const login = async (parent, { userInput }, context) => {
    try {
        const { email, password } = userInput;

        const { user } = await context.authenticate('graphql-local', { email, password });
        context.login(user);

        return {
            status: 'successful',
            _id: user.id,
            email: user.email
        }
    } catch(error) {
        return {
            status: 'failed',
            message: error
        };
    }
}

export const logout = (parent, args, context) => {
    try {
        if(!context.user) return true;

        context.logout();

    return true;
    } catch(error) {
        return false;
    }
}

export const currentUser = async (parent, args, { user, isAuthenticated, isUnauthenticated }) => {
    if(isUnauthenticated()) return null;
    const { userId, role } = retrieveAuthorizationToken(user);

    return await User.getById(userId);
}

export const bookings = async (parent, args, context) => {
    try {
        return await Booking
                    .find({})
                    .populate({
                        path: 'user',
                        populate: [ { path: 'createdEvents' } ]
                    })
                    .populate({
                        path: 'event',
                        populate: [ { path: 'creator' } ]
                    })
                    .exec();
    } catch (error) {
        throw error;
    }
}