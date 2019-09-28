import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import * as bcrypt from 'bcryptjs';

import User, { UserModel } from '../entities/user';
import { LoginInput, NewUserInput } from './types/user.input';


@Resolver()
export class UserResolver {
    // Get all Users
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await UserModel.find({}).exec();
    }

    // User Login
    @Query(() => User)
    async login(
        @Arg("loginInput") { email, password }: LoginInput
    ): Promise<User> {
        const user = await UserModel.findOne({ email: email });
        if(!user) throw new Error("Invalid Credentials!");

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) throw new Error("Invalid Credentials!");
        
        return user;
    }

    // Get Current User
    @Query(() => User)
    async currentUser(): Promise<User[]> {
        return await UserModel.find({}).exec();
    }

    // User Signup
    @Mutation(() => User)
    async register(
        @Arg("newUserInput") { 
            firstName, lastName, email, password 
        }: NewUserInput
    ): Promise<User> {
        const existingUser = await UserModel.findOne({ email: email }).exec();

        if (existingUser) {
            throw new Error("A user with this email address already exists!");
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new UserModel({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword
        })
        const createdUser = await user.save();
        return await UserModel.populate(createdUser, [{ path: 'createdEvents' }])
    }
}