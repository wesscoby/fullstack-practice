import { model as Model } from 'mongoose';
import UserSchema from './schema/user.schema';
import EventSchema from './schema/event.schema';
import BookingSchema from './schema/booking.schema';


export const Event = Model('Event', EventSchema);
export const User = Model('User', UserSchema);
export const Booking = Model('Booking', BookingSchema);