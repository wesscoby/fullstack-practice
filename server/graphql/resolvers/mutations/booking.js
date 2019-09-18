import { Booking } from '../../../db/model';


export const bookEvent = async (parent, args, context) => {
    try {
        const { eventId } = args;
        // const { Booking, Event } = context.db;

        const booking = new Booking({
            user: "5d7e8b2e87bed31f9d1cb5b0",
            event: eventId
        });
        const savedBooking = await booking.save();
        return await Booking.populate(savedBooking, [{ path: 'user' }, { path: 'event' }]);
    } catch (error) {
        throw error;
    }
}