

export const event = async (
    parent, 
    { id }, 
    { db: { Event } }
) => {
    try {
        return await Event.getOne(id);
    } catch(error) {
        throw error;
    }
}

export const events = async (
    parent, 
    args, 
    { db: { Event } }
) => {
    try {
        return await Event.getAll();
    } catch(error) {
        throw error;
    }
}