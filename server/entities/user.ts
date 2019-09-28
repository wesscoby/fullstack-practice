import { prop, Typegoose, Ref, arrayProp } from '@hasezoey/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { Event } from './event';

//! User Class 
@ObjectType()
export default class User extends Typegoose {
    @Field(() => ID)
    id: string;

    // @prop()
    // public firstName: string;
    
    // @prop()
    // public lastName: string;
    
    @Field()
    @prop()
    public name: string;
    
    @Field()
    @prop({ unique: true, required: true, index: true })
    public email: string;
    
    @prop()
    public password: string;
    
    @Field(() => [Event])
    @arrayProp({ itemsRef: Event })
    public createdEvents: Ref<Event>;

    @Field()
    public createdAt: Date

    @Field()
    public updatedAt: Date;
}

//! User Model
export const UserModel = new User().getModelForClass(User, {
    schemaOptions: { timestamps: true }
});

