import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop, Ref, ModelType, staticMethod } from "@hasezoey/typegoose";

import { User, Event } from './'

type BookingModelType = ModelType<Booking> & typeof Booking;
@ObjectType()
export default class Booking extends Typegoose {
    @Field(() => ID)
    readonly id: string;

    @Field(() => Event)
    @prop({ ref: "Event" })
    public event: Ref<Event>;

    @Field(() => User)
    @prop({ ref: "User" })
    public user: Ref<User>;

    @Field()
    public createdAt: Date;

    @Field()
    public updatedAt: Date;

    // Static Methods
    @staticMethod
    public static async getOne(
        this: BookingModelType,
        id: string
    ): Promise<Booking | null> {
        return await this
                        .findById(id)
                        .populate({
                            path: 'user',
                            populate: [ { path: 'createdEvents' } ]
                        })
                        .populate({
                            path: 'event',
                            populate: [ { path: 'creator' } ]
                        })
    }

    @staticMethod
    public static async getAll(
        this: BookingModelType
    ): Promise<Booking[]> {
        return await this
                        .find({})
                        .populate({
                            path: 'user',
                            populate: [ { path: 'createdEvents' } ]
                        })
                        .populate({
                            path: 'event',
                            populate: [ { path: 'creator' } ]
                        })
    }
}

export const BookingModel = new Booking().getModelForClass(Booking, {
    schemaOptions: { timestamps: true }
})