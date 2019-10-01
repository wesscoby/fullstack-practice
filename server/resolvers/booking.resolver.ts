import { Resolver, Query, Arg, Ctx, Mutation, Authorized } from 'type-graphql';

import { Booking, BookingModel, EventModel } from '../entities/';
import { MyContext } from '../types/';

@Resolver()
export default class BookingResolver {
    //! Queries
    //* Get a booking
    @Authorized()
    @Query(() => Booking, { nullable: true })
    async booking(@Arg("bookingId") bookingId: string): Promise<Booking | null> {
        return await BookingModel.getOne(bookingId);
    }

    //* Get all bookings
    @Authorized()
    @Query(() => [Booking])
    async bookings(): Promise<Booking[]> {
        return await BookingModel.getAll();
    }

    //! Mutations
    //* Create new booking
    @Authorized()
    @Mutation(() => Booking)
    async bookEvent(
        @Arg("eventId") eventId: string,
        @Ctx() { getUser }: MyContext
    ): Promise<Booking | null> {
        const event = await EventModel.getOne(eventId);
        if(event) {
            const user = await getUser();
            const booking = new BookingModel({
                event: event,
                user: user
            });
            const savedBooking = await booking.save()
            return await BookingModel.getOne(savedBooking.id);
        } else {
            return null;
        }
    }
}