import { Event } from '../../../db/model'; 


export const event = async (parent, { id }, context) => {
    try {
        return await Event.getOne(id);
    } catch(error) {
        throw error;
    }
}

export const events = async (parent, args, context) => {
    try {
        return await Event.getAll();
    } catch(error) {
        throw error;
    }
}