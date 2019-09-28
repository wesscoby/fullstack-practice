import { prop, Typegoose, Ref } from '@hasezoey/typegoose';
import { Field, ID, Float, ObjectType } from 'type-graphql';
import { User } from './user';


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
}

//! Event Model
export const EventModel = new Event().getModelForClass(Event, {
    schemaOptions: { timestamps: true }
})

