export const LoginStatus =  {
    __resolveType: async (parent, args, context) => {
        if(parent._id) return 'LoginSuccess'

        if(parent.message) return 'LoginFailure';

        return null;
    }
}