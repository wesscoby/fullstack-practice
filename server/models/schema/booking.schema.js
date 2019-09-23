import { Schema } from 'mongoose';

const BookingSchema = new Schema(
    {
        event: { type: Schema.Types.ObjectId, ref: 'Event' },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

export default BookingSchema;