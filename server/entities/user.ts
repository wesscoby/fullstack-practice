import { Field, ID, ObjectType, Root } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { 
    prop, Typegoose, Ref, arrayProp, 
    staticMethod, instanceMethod, ModelType
} from '@hasezoey/typegoose';

import { Event } from './event';


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
    
    @Field(() => [Event])
    @arrayProp({ itemsRef: Event })
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
}

//! User Model
export const UserModel = new User().getModelForClass(User, {
    schemaOptions: { timestamps: true }
});