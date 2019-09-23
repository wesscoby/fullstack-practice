import { AuthenticationRequiredError } from '../../../helpers/errors';
import { AuthenticationError } from 'apollo-server-express'

export const bookings = async (
    parent, 
    args, 
    { models:  { Booking }, isUnauthenticated }
) => {
    try {
        if(isUnauthenticated()) throw new AuthenticationRequiredError();
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