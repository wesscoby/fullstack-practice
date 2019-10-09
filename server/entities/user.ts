import { Field, ObjectType, ID, Root } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { 
    prop, arrayProp, Ref, ReturnModelType, getModelForClass, modelOptions, DocumentType
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { Event } from './';


type UserModelType = ReturnModelType<typeof User>;

//! User Class 
@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export default class User extends TimeStamps {
    @Field(() => ID)
    readonly id: string;

    @prop()
    public firstName: string;
    
    @prop()
    public lastName: string;
    
    @Field(() => String)
    public async name(@Root() { firstName, lastName }: DocumentType<User>): Promise<string> {
        return await `${firstName} ${lastName}`;
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
    public createdAt: Date;

    @Field()
    public updatedAt: Date;

    // Static Methods
    public static async getByEmail(
        this: UserModelType,
        email: string
    ): Promise<User | null> {
        return await this
                        .findOne({ email: email })
                        .populate({ path: 'createdEvents' })
    }

    public static async getById(
        this: UserModelType,
        id: string
    ): Promise<User | null> {
        return await this.findById(id).populate({ path: 'createdEvents' });
    }

    // Instance Methods
    public async isPasswordMatch(
        password: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, this.password)
    }

    public async addEvent(
        // this: ReturnModelType<typeof User>,
        event: Event
    ) {
        this.createdEvents.push(event);
        // return await this.save();
    }
}

//! User Model
export const UserModel = getModelForClass(User);