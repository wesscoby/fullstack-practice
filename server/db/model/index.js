import { model as Model } from 'mongoose';
import UserSchema from '../schema/User.schema'

module.exports = {
    User: Model('User', UserSchema)
}