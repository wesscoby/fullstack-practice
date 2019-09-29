import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
// import * as passport from 'passport'

import User, { UserModel } from '../entities/user';
import { LoginInput, NewUserInput } from '../types/inputs';
import { MyContext } from '../types/interfaces';


@Resolver()
export class UserResolver {
    // Get all Users
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await UserModel.find({}).exec();
    }

    // User Login
    @Query(() => User, { nullable: true })
    async login(
        @Arg("loginInput") { email, password }: LoginInput,
        @Ctx() context: MyContext
    ): Promise<User | null> {
        const isAuth = await context.login(email, password);
        if(isAuth) {
            return await context.getUser();
        } else {
            return null;
        }
    }

    // Get Current User
    @Query(() => User, { nullable: true })
    async currentUser(@Ctx() { isAuthenticated, getUser }: MyContext): Promise<User | null> {
        if(!isAuthenticated()) {
            return null;
        } else {
            return await getUser();
        }
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
            firstName, 
            lastName,
            email,
            password: hashedPassword
        })
        const createdUser = await user.save();
        return await UserModel.populate(createdUser, [{ path: 'createdEvents' }])
    }
}