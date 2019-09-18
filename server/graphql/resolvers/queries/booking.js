import { Booking } from '../../../db/model';


export const bookings = async (parent, args, context) => {
    try {
        return await Booking
                    .find({})
                    .populate({
                        path: 'user',
                        populate: [ { path: 'createdEvents' } ]
                    })
                    .populate({
                        path: 'event',
                        populate: [ { path: 'creator' } ]
                    })
                    .exec();
    } catch (error) {
        throw error;
    }
}