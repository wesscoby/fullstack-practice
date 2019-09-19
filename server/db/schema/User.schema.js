import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdEvents: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ]
});

UserSchema.statics.getById = function(id) {
    return this.findOne({ _id: id }).populate({ path: 'createdEvents' });
}

UserSchema.statics.getByEmail = function(email) {
    return this.findOne({ email: email }).populate({ path: 'createdEvents' });
}

UserSchema.methods.isPasswordMatch = function(password) {
    return bcrypt.compare(password, this.password)
}

export default UserSchema;