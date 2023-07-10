import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: '',
    }
})

const User = mongoose.model('User', UserSchema)

export default User