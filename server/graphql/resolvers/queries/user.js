import { User, Event} from '../../../db/model';
import { retrieveAuthorizationToken } from '../../../helpers/auth'

// Search for a user by email
export const user = async (parent, { email }, context) => {
    return await User.getByEmail(email);
}

// Get all users
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

// User login
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

// User Logout
export const logout = (parent, args, context) => {
    try {
        if(!context.user) return true;

        context.logout();

    return true;
    } catch(error) {
        return false;
    }
}


// Get Currently logged in user
export const currentUser = async (parent, args, { user, isAuthenticated, isUnauthenticated }) => {
    if(isUnauthenticated()) return null;
    const { userId, role } = retrieveAuthorizationToken(user);

    return await User.getById(userId);
}