import { retrieveAuthorizationToken } from '../../../helpers/auth';

export const createEvent = async (
    parent, 
    { eventInput: { title, description, price, date } },
    { user, db: { Event, User } }
) => {
    try {
        if(!user) throw new Error("You must be Logged In to continue!")
        const { userId } = retrieveAuthorizationToken(user);

        // Add Current User Id to new Event
        const event = new Event({
            title,
            description,
            price: +price,
            date: new Date(date),
            creator: userId
        })

        const createdEvent = await event.save();

        // Add Event id to User's created events
        await User.updateOne({ _id: userId }, { $push: { createdEvents: createdEvent._id } });
        
        return await Event.populate(createdEvent, [{ path: 'creator' }]);
    } catch(error) {
        throw error;
    }
}