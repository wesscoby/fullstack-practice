

export const event = async (
    parent, 
    { id }, 
    { db: { Event }, isUnauthenticated }
) => {
    try {
        if(isUnauthenticated()) {
            return await Event.getById(id).exec();
        } else {
            return await Event.getOne(id);
        }
    } catch(error) {
        throw error;
    }
}

export const events = async (
    parent, 
    args, 
    { db: { Event }, isUnauthenticated }
) => {
    try {
        if(isUnauthenticated()) {
            return await Event.find({}).exec();
        } else {
            return await Event.getAll();
        }
    } catch(error) {
        throw error;
    }
}