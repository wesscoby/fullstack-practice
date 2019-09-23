import { Schema } from 'mongoose';

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

EventSchema.statics.getAll = function() {
    return this
                .find({})
                .populate({
                    path: 'creator',
                    populate: [
                        { path: 'createdEvents'}
                    ]
                });
}

EventSchema.statics.getOne = function(id) {
    return this
            .findOne({ _id: id })
            .populate({
                path: 'creator',
                populate: [
                    { path: 'createdEvents'}
                ]
            });
}



export default EventSchema;