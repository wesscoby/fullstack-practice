import { prop, ReturnModelType, Ref, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Field, Float, ObjectType, ID } from 'type-graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { User } from './';

type EventModelType = ReturnModelType<typeof Event>;

//! Event Class
@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export default class Event extends TimeStamps {
    @Field(() => ID)
    readonly id: string;
    
    @Field()
    @prop({ required: true })
    public title: string;
    
    @Field()
    @prop()
    public description: string;
    
    @Field(() => Float)
    @prop()
    public price: number;
    
    @Field()
    @prop()
    public date: Date;
    
    // Reference to creator (User)
    @Field(() => User)
    @prop({ ref: "User" })
    public creator: Ref<User>;

    @Field()
    public createdAt: Date;

    @Field()
    public updatedAt: Date;

    // Static Methods
    public static async getOne(
        this: EventModelType,
        id: string
    ): Promise<Event | null> {
        return await this
                        .findById(id)
                        .populate({
                            path: 'creator',
                            populate: [
                                { path: 'createdEvents'}
                            ]
                        });
    }

    public static async getAll(
        this: EventModelType
    ): Promise<Event[]> {
        return await this
                        .find({})
                        .populate({
                            path: 'creator',
                            populate: [
                                { path: 'createdEvents'}
                            ]
                        });
    }
}

//! Event Model
export const EventModel = getModelForClass(Event);

