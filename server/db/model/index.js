import { model as Model } from 'mongoose';
import UserSchema from '../schema/user.schema';
import EventSchema from '../schema/event.schema';
import BookingSchema from '../schema/booking.schema';

module.exports = {
    Event: Model('Event', EventSchema),
    User: Model('User', UserSchema),
    Booking: Model('Booking', BookingSchema)
}