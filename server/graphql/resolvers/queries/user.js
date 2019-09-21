import { verifyUser } from '../../../helpers/auth'

// Search for a user by email
export const user = async (
    parent, 
    { email }, 
    { db: { User } }
) => await User.getByEmail(email);

// Get all users
export const users = async (
    parent,
    args,
    { db: { User } }
) => {
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
export const login = async (
    parent, 
    { userInput: { email, password } }, 
    { authenticate, login }
) => {
    try {
        const { user } = await authenticate('graphql-local', { email, password });
        login(user);

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
export const logout = (parent, args, { isUnauthenticated, logout }) => {
    try {
        if(isUnauthenticated()) return true;

        logout();

    return true;
    } catch(error) {
        return false;
    }
}

// Get Currently logged in user
export const currentUser = async (
    parent, 
    args, 
    { user, isAuthenticated, isUnauthenticated, db: { User } }
) => {
    if(isUnauthenticated()) return null;
    const { userId, role } = verifyUser(user);

    return await User.getById(userId);
}