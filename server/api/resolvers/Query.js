import { User } from '../../db/model'

export const user = async (parent, args, context) => {
    const { email } = args;
    return await User.findOne({ email: email }).exec()
}

export const users = async (parent, args, context) => {
    return await User.find({}).exec();
}