import { Field, ObjectType, Root, ID } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { 
    prop, Typegoose, arrayProp, staticMethod, 
    instanceMethod, ModelType, Ref
} from '@hasezoey/typegoose';

import { Event } from './';


type UserModelType = ModelType<User> & typeof User;
type UserInstanceType = InstanceType<User | any>;

//! User Class 
@ObjectType()
export default class User extends Typegoose {
    @Field(() => ID)
    readonly id: string;

    @prop()
    public firstName: string;
    
    @prop()
    public lastName: string;
    
    @Field(() => String)
    public name(@Root() { firstName, lastName }: UserInstanceType): string {
        return `${firstName} ${lastName}`;
    }
    
    @Field()
    @prop({ unique: true, required: true, index: true })
    public email: string;
    
    @prop()
    public password: string;
    
    // Reference to Event
    @Field(() => [Event])
    @arrayProp({ itemsRef: "Event" })
    public createdEvents: Ref<Event>[];

    @Field()
    public createdAt: Date

    @Field()
    public updatedAt: Date;

    // Static Methods
    @staticMethod
    public static async getByEmail(
        this: UserModelType,
        email: string
    ): Promise<User | null> {
        return await this
                        .findOne({ email: email })
                        .populate({ path: 'createdEvents' })
    }

    @staticMethod
    public static async getById(
        this: UserModelType,
        id: string
    ): Promise<User | null> {
        return await this.findById(id).populate({ path: 'createdEvents' });
    } 

    // Instance Methods
    @instanceMethod
    public async isPasswordMatch(
        this: UserInstanceType, 
        password: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, this.password)
    }

    @instanceMethod
    public async addEvent(
        this: UserInstanceType,
        event: Event
    ): Promise<User> {
        this.createdEvents.push(event)
        return this.save();
    }
}

//! User Model
export const UserModel = new User().getModelForClass(User, {
    schemaOptions: { timestamps: true }
});