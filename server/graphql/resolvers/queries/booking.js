

export const bookings = async (
    parent, 
    args, 
    { models:  { Booking }, isUnauthenticated }
) => {
    try {
        if(isUnauthenticated()) throw new Error("Login first to view this resource!");
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