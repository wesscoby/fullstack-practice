

export const createEvent = async (
    parent, 
    { eventInput: { title, description, price, date, creator } },
    { user, db: { Event } }
) => {
    try {
        if(!user) throw new Error("You must be Logged In to continue!")
        const event = new Event({
            title,
            description,
            price: +price,
            date: new Date(date),
            creator
        })
        const createdEvent = await event.save();
        return await Event.populate(createdEvent, [{ path: 'creator' }]);
    } catch(error) {
        throw error;
    }
}