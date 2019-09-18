import bcrypt from 'bcrypt';
import { User } from '../../../db/model';

export const createUser = async (parent, args, context) => {
    try {
        // const { User } = context.db;
        const { email, password } = args.userInput;
        const existingUser = await User.findOne({ email: email }).exec();

        if (existingUser) {
            throw new Error("User already exists!");
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashedPassword
        })
        const createdUser = await user.save();
        return await User.populate(createUser, [{ path: 'createdEvents' }])
    } catch(error) {
        throw error;
    }
}