import { ObjectType, Field, ID } from "type-graphql";
import { prop, Ref, ReturnModelType, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { User, Event } from './'

type BookingModelType = ReturnModelType<typeof Booking>;

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export default class Booking extends TimeStamps {
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

export const BookingModel = getModelForClass(Booking)