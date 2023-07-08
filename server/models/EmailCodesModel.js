import mongoose from 'mongoose'

const EmailCodesModel = mongoose.Schema(
{
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    used: {
        type: Boolean,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
},
{
    timestamps: true,
}
)

const EmailCodes = mongoose.model('EmailCodes', EmailCodesModel)

export default EmailCodes