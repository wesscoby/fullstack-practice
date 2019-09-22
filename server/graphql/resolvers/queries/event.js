

export const event = async (
    parent, 
    { id }, 
    { models: { Event }, isUnauthenticated }
) => {
    try {
        if(isUnauthenticated()) {
            return await Event.getOne(id);
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
    { models: { Event }, isUnauthenticated }
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