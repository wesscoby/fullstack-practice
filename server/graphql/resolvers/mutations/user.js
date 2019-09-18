import bcrypt from 'bcrypt';

export const createUser = async (
    parent, 
    { userInput: { email, password } }, 
    { db: { User } }
) => {
    try {
        const existingUser = await User.findOne({ email: email }).exec();

        if (existingUser) {
            throw new Error("A user with this email address already exists!");
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