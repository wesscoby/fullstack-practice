import { User } from '../../db/model'

export const logout = async (parent, args, { logout }) => logout();

export const login = async (parent, { email, password }, context) => {
    const { user } = await context.authenticate('graphql-local', { email, password });
    context.login(user);
    return { user }
}