

export const bookings = async (
    parent, 
    args, 
    { db:  { Booking } }
) => {
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