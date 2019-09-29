import { prop, Typegoose, Ref, ModelType, staticMethod } from '@hasezoey/typegoose';
import { Field, ID, Float, ObjectType } from 'type-graphql';
import User from './user';

type EventModelType = ModelType<Event> & typeof Event;
// type EventInstanceType = InstanceType<Event | any>;

//! Event Class
@ObjectType()
export class Event extends Typegoose {
    @Field(() => ID)
    public id: string;
    
    @Field()
    @prop({ required: true })
    title: string;
    
    @Field()
    @prop()
    description: string;
    
    @Field(() => Float)
    @prop()
    price: number;
    
    @Field()
    @prop()
    date: Date;
    
    @Field(() => User)
    @prop({ ref: User })
    creator: Ref<User>;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    // Static Methods
    @staticMethod
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

    @staticMethod
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
export const EventModel = new Event().getModelForClass(Event, {
    schemaOptions: { timestamps: true }
})

