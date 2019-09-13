import { Schema } from 'mongoose';

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String }
});

export default UserSchema;